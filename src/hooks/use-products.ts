import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TInsertProduct, TProduct } from "@/dao/products"
import { addProductServerAction, deleteProductServerAction, getProductsServerAction, updateProductServerAction } from "@/actions/products"

export function useProducts() {
    const queryClient = useQueryClient()

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: getProductsServerAction,
    })

    const addProductMutation = useMutation({
        mutationFn: (newProduct: TInsertProduct) => addProductServerAction(newProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
    })

    const updateProductMutation = useMutation({
        mutationFn: (updatedProduct: TProduct) => updateProductServerAction(updatedProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
    })

    const deleteProductMutation = useMutation({
        mutationFn: (productId: string) => deleteProductServerAction(productId),
        onSuccess: () => {
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