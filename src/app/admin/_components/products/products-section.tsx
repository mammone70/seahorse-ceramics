import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TProduct } from "@/dao/products"
import AdminProductsTable from "./products-table"
import AddProductDialog from "./add-product-dialog"
// import { useQueryClient } from "@tanstack/react-query";
// import { useState } from "react"

function ProductsSection({initialProducts} : {initialProducts : TProduct[]}) {

  //const queryClient = useQueryClient();

  // const [products] = useState<TProduct[]>(initialProducts)
  // const [filteredProducts] = useState<TProduct[]>(initialProducts)
  // const [searchQuery, setSearchQuery] = useState("")
  // const [categoryFilter, setCategoryFilter] = useState("All Categories")
  // const [statusFilter, setStatusFilter] = useState("All")
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  // const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  // const [currentProduct, setCurrentProduct] = useState<TProduct | null>(null)
  // const [selectedProducts] = useState<string[]>([])
  // const [isAllSelected] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* <ProductsHeader/> */}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your product inventory, add new products, or update existing ones.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Products ({initialProducts.length})</TabsTrigger>
                  {/* <TabsTrigger value="active">
                    Active ({products.filter((p) => p.status === "Active").length})
                  </TabsTrigger>
                  <TabsTrigger value="featured">Featured ({products.filter((p) => p.featured).length})</TabsTrigger> */}
                </TabsList>
                <div className="flex items-center gap-2">
                  <AddProductDialog/>
                  {/* {selectedProducts.length > 0 && ( */}
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
                    </Button>
                  {/* )} */}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8"
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  {/* <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent> */}
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="all">
                <div className="rounded-md border">
                    <AdminProductsTable products={initialProducts}/>
                </div>
              </TabsContent>

              
            </Tabs>
          </CardContent>
        </Card>
      </main> 
      
      {/* Edit Product Dialog */}
      {/* <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the details of your product.</DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Product Name</Label>
                  <Input
                    id="edit-name"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-sku">SKU</Label>
                  <Input
                    id="edit-sku"
                    value={currentProduct.sku}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, stock: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={currentProduct.category}
                    onValueChange={(value) => setCurrentProduct({ ...currentProduct, category: value })}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((c) => c !== "All Categories")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentProduct.status}
                    onValueChange={(value) => setCurrentProduct({ ...currentProduct, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-dimensions">Dimensions</Label>
                  <Input
                    id="edit-dimensions"
                    value={currentProduct.dimensions}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, dimensions: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-weight">Weight</Label>
                  <Input
                    id="edit-weight"
                    value={currentProduct.weight}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, weight: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-featured"
                    checked={currentProduct.featured}
                    onCheckedChange={(checked) =>
                      setCurrentProduct({ ...currentProduct, featured: checked as boolean })
                    }
                  />
                  <Label htmlFor="edit-featured">Featured Product</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="flex items-center gap-4">
                  <Image
                    src={currentProduct.image || "/placeholder.svg"}
                    alt={currentProduct.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover border"
                  />
                  <div className="flex-1 border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Upload a new image</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Delete Product Dialog */}
      {/* <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="flex items-center gap-4 py-4">
              <Image
                src={currentProduct.imageURL || "/placeholder.svg"}
                alt={currentProduct.name}
                width={60}
                height={60}
                className="rounded-md object-cover border"
              />
              <div>
                <h3 className="font-medium">{currentProduct.name}</h3>
                <p className="text-sm text-muted-foreground">SKU: 12345</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive">
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  )
}

export default ProductsSection