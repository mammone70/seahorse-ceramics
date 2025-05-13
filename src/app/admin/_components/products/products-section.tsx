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

interface ProductsSectionProps {
  initialProducts: TProduct[]
}

export function ProductsSection({ initialProducts }: ProductsSectionProps) {
  const [products, setProducts] = useState<TProduct[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<TProduct | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleEditProduct = (product: TProduct) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleDeleteProduct = (product: TProduct) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveProduct = (updatedProduct: TProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
    setIsEditDialogOpen(false)
  }

  const handleConfirmDelete = () => {
    if (currentProduct) {
      setProducts(products.filter(p => p.id !== currentProduct.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

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
                  setProducts(products.filter(p => !selectedProducts.includes(p.id)))
                  setSelectedProducts([])
                }}
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

export default ProductsSection