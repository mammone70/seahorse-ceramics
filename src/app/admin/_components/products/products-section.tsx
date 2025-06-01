"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TProduct } from "@/dao/products"
import { ProductsHeader } from "./products-header"
import { ProductsToolbar } from "./products-toolbar"
import { EditProductDialog } from "./edit-product-dialog"
import { DeleteProductDialog } from "./delete-product-dialog"
import AdminProductsTable from "./products-table"
import { deleteFile } from "@/lib/file-storage"
import { useToast } from "@/hooks/use-toast"
import { useProducts } from "@/hooks/use-products"

export default function ProductsSection({products}: {products: TProduct[]}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<TProduct | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const { toast } = useToast()
  const { 
    // products, 
    isLoading, 
    deleteProduct,
    updateProduct,
    // isAddingProduct,
    // isDeletingProduct 
  } = useProducts()
  
  const handleEditProduct = (product: TProduct) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleDeleteProduct = (product: TProduct) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveProduct = async (updatedProduct: TProduct) => {
    try {
      await updateProduct(updatedProduct)
      setCurrentProduct(updatedProduct)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "Failed to update the product",
        variant: "destructive"
      })
    }
  }

  const handleConfirmDelete = async () => {
    if (currentProduct) {
      try {
        // Delete images
        const deletePromises = currentProduct.images?.map(async (image) => {
          if(image) {
            await deleteFile(image.imageURL)
          }
        })

        if(deletePromises) {
          await Promise.all(deletePromises)
        }

        await deleteProduct(currentProduct.id)
        
        setIsDeleteDialogOpen(false)
        toast({
          title: "Product deleted",
          description: "The product has been deleted successfully",
          variant: "default"
        })
      } catch (error) {
        console.error(error)
        toast({
          title: "Error",
          description: "Failed to delete the product",
          variant: "destructive"
        })
      }
    }
  }

  // const handleProductAdded = (newProduct: TProduct) => {
  //   addProduct(newProduct)
  // }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your product inventory, add new products, or update existing ones.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-6">
              <ProductsHeader 
                totalProducts={products.length}
                hasSelectedProducts={selectedProducts.length > 0}
                onDeleteSelected={() => {
                  // TODO: Implement bulk delete
                  setSelectedProducts([])
                }}
                // onProductAdded={handleProductAdded}
              />

              <ProductsToolbar
                onSearchChange={setSearchQuery}
                onCategoryChange={() => {}}
                onStatusChange={() => {}}
              />

              <TabsContent value="all">
                <div className="rounded-md border">
                  <AdminProductsTable 
                    products={filteredProducts}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    selectedProducts={selectedProducts}
                    onSelectionChange={setSelectedProducts}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <EditProductDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        product={currentProduct}
        onSave={handleSaveProduct}
      />

      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        product={currentProduct}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}