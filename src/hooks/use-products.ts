import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TInsertProduct, TProduct } from "@/dao/products"
import { addProductServerAction, deleteProductServerAction, getProductsServerAction, updateProductServerAction } from "@/actions/products"

export function useProducts(initialData?: TProduct[]) {
    const queryClient = useQueryClient()

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: getProductsServerAction,
        initialData,
    })

    const addProductMutation = useMutation({
        mutationFn: (newProduct: TInsertProduct) => addProductServerAction(newProduct),
        onMutate: async (newProduct) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["products"] })

            // Snapshot the previous value
            const previousProducts = queryClient.getQueryData<TProduct[]>(["products"])

            // Optimistically update to the new value
            queryClient.setQueryData<TProduct[]>(["products"], (old) => {
                const optimisticProduct = { ...newProduct, id: "temp-" + Date.now() } as TProduct
                return old ? [...old, optimisticProduct] : [optimisticProduct]
            })

            return { previousProducts }
        },
        onError: (err, newProduct, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousProducts) {
                queryClient.setQueryData(["products"], context.previousProducts)
            }
        },
        onSettled: () => {
            // Always refetch after error or success to ensure data is in sync
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
    })

    const updateProductMutation = useMutation({
        mutationFn: (updatedProduct: TProduct) => updateProductServerAction(updatedProduct),
        onMutate: async (updatedProduct) => {
            await queryClient.cancelQueries({ queryKey: ["products"] })

            const previousProducts = queryClient.getQueryData<TProduct[]>(["products"])

            queryClient.setQueryData<TProduct[]>(["products"], (old) => {
                return old?.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                ) ?? []
            })

            return { previousProducts }
        },
        onError: (err, updatedProduct, context) => {
            if (context?.previousProducts) {
                queryClient.setQueryData(["products"], context.previousProducts)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
    })

    const deleteProductMutation = useMutation({
        mutationFn: (productId: string) => deleteProductServerAction(productId),
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: ["products"] })

            const previousProducts = queryClient.getQueryData<TProduct[]>(["products"])

            queryClient.setQueryData<TProduct[]>(["products"], (old) => {
                return old?.filter(product => product.id !== productId) ?? []
            })

            return { previousProducts }
        },
        onError: (err, productId, context) => {
            if (context?.previousProducts) {
                queryClient.setQueryData(["products"], context.previousProducts)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
    })

    return {
        products: productsQuery.data ?? [],
        isLoading: productsQuery.isLoading,
        isError: productsQuery.isError,
        addProduct: addProductMutation.mutate,
        isAddingProduct: addProductMutation.isPending,
        updateProduct: updateProductMutation.mutate,
        isUpdatingProduct: updateProductMutation.isPending,
        deleteProduct: deleteProductMutation.mutate,
        isDeletingProduct: deleteProductMutation.isPending,
        addProductVariables: addProductMutation.variables,
        isPending: addProductMutation.isPending || updateProductMutation.isPending || deleteProductMutation.isPending,
    }
} 