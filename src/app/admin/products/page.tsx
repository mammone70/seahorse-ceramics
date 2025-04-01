"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, MoreHorizontal, Trash2, Edit, ImagePlus } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample product data
const initialProducts = [
  {
    id: "1",
    name: "Ceramic Vase",
    price: 39.99,
    image: "/placeholder.svg",
    description: "A beautiful handcrafted ceramic vase, perfect for displaying your favorite flowers.",
    category: "Vases",
    stock: 10,
    status: "Active",
    featured: true,
    sku: "VASE-001",
    dimensions: '10" x 5" x 5"',
    weight: "2 lbs",
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Pottery Bowl",
    price: 24.99,
    image: "/placeholder.svg",
    description: "A versatile pottery bowl, great for serving salads or as a decorative piece.",
    category: "Bowls",
    stock: 15,
    status: "Active",
    featured: false,
    sku: "BOWL-001",
    dimensions: '8" x 8" x 3"',
    weight: "1.5 lbs",
    createdAt: "2023-02-20",
  },
  {
    id: "3",
    name: "Ceramic Mug",
    price: 14.99,
    image: "/placeholder.svg",
    description: "A cozy ceramic mug for your morning coffee or evening tea.",
    category: "Mugs",
    stock: 20,
    status: "Active",
    featured: true,
    sku: "MUG-001",
    dimensions: '4" x 3" x 5"',
    weight: "0.8 lbs",
    createdAt: "2023-03-10",
  },
  {
    id: "4",
    name: "Decorative Plate",
    price: 29.99,
    image: "/placeholder.svg",
    description: "An elegant decorative plate to enhance your dining table or wall display.",
    category: "Plates",
    stock: 8,
    status: "Active",
    featured: false,
    sku: "PLATE-001",
    dimensions: '10" diameter x 1" height',
    weight: "1.2 lbs",
    createdAt: "2023-04-05",
  },
  {
    id: "5",
    name: "Ceramic Planter",
    price: 34.99,
    image: "/placeholder.svg",
    description: "A stylish ceramic planter for your indoor plants and herbs.",
    category: "Planters",
    stock: 12,
    status: "Active",
    featured: false,
    sku: "PLANTER-001",
    dimensions: '6" x 6" x 7"',
    weight: "2.2 lbs",
    createdAt: "2023-05-12",
  },
  {
    id: "6",
    name: "Tea Set",
    price: 79.99,
    image: "/placeholder.svg",
    description: "A complete ceramic tea set including teapot and four cups.",
    category: "Sets",
    stock: 5,
    status: "Active",
    featured: true,
    sku: "SET-001",
    dimensions: "Various",
    weight: "3.5 lbs",
    createdAt: "2023-06-18",
  },
  {
    id: "7",
    name: "Ceramic Candle Holder",
    price: 19.99,
    image: "/placeholder.svg",
    description: "A beautiful ceramic candle holder to create a warm ambiance.",
    category: "Home Decor",
    stock: 18,
    status: "Active",
    featured: false,
    sku: "CANDLE-001",
    dimensions: '4" x 4" x 3"',
    weight: "0.9 lbs",
    createdAt: "2023-07-22",
  },
  {
    id: "8",
    name: "Ceramic Soap Dish",
    price: 12.99,
    image: "/placeholder.svg",
    description: "A practical and stylish ceramic soap dish for your bathroom.",
    category: "Bathroom",
    stock: 25,
    status: "Active",
    featured: false,
    sku: "SOAP-001",
    dimensions: '5" x 3.5" x 1"',
    weight: "0.5 lbs",
    createdAt: "2023-08-14",
  },
]

// Product categories
const categories = ["All Categories", "Vases", "Bowls", "Mugs", "Plates", "Planters", "Sets", "Home Decor", "Bathroom"]

type Product = (typeof initialProducts)[0]

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    status: "Active",
    featured: false,
    sku: "",
    dimensions: "",
    weight: "",
    image: "/placeholder.svg",
  })
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)

  // Filter products based on search query and filters
  useEffect(() => {
    let filtered = [...products]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter && categoryFilter !== "All Categories") {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter && statusFilter !== "All") {
      filtered = filtered.filter((product) => product.status === statusFilter)
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, categoryFilter, statusFilter])

  // Handle bulk selection
  useEffect(() => {
    setIsAllSelected(selectedProducts.length === filteredProducts.length && filteredProducts.length > 0)
  }, [selectedProducts, filteredProducts])

  const handleAddProduct = () => {
    const id = (Math.max(...products.map((p) => Number.parseInt(p.id))) + 1).toString()
    const createdAt = new Date().toISOString().split("T")[0]

    const productToAdd = {
      ...newProduct,
      id,
      createdAt,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    } as Product

    setProducts([productToAdd, ...products])
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      category: "",
      stock: 0,
      status: "Active",
      featured: false,
      sku: "",
      dimensions: "",
      weight: "",
      image: "/placeholder.svg",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditProduct = () => {
    if (!currentProduct) return

    const updatedProducts = products.map((product) => (product.id === currentProduct.id ? currentProduct : product))

    setProducts(updatedProducts)
    setCurrentProduct(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteProduct = () => {
    if (!currentProduct) return

    const updatedProducts = products.filter((product) => product.id !== currentProduct.id)
    setProducts(updatedProducts)
    setCurrentProduct(null)
    setIsDeleteDialogOpen(false)
  }

  const handleBulkDelete = () => {
    const updatedProducts = products.filter((product) => !selectedProducts.includes(product.id))
    setProducts(updatedProducts)
    setSelectedProducts([])
  }

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your product inventory, add new products, or update existing ones.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Products ({products.length})</TabsTrigger>
                  <TabsTrigger value="active">
                    Active ({products.filter((p) => p.status === "Active").length})
                  </TabsTrigger>
                  <TabsTrigger value="featured">Featured ({products.filter((p) => p.featured).length})</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  {selectedProducts.length > 0 && (
                    <Button variant="outline" size="sm" onClick={handleBulkDelete} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={isAllSelected}
                            onCheckedChange={toggleSelectAll}
                            aria-label="Select all products"
                          />
                        </TableHead>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No products found. Try adjusting your search or filters.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => toggleSelectProduct(product.id)}
                                aria-label={`Select ${product.name}`}
                              />
                            </TableCell>
                            <TableCell>
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={50}
                                height={50}
                                className="rounded-md object-cover"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.name}
                              {product.featured && (
                                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                                  Featured
                                </Badge>
                              )}
                              <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                              <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                                {product.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setCurrentProduct(product)
                                      setIsEditDialogOpen(true)
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setCurrentProduct(product)
                                      setIsDeleteDialogOpen(true)
                                    }}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="active">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={isAllSelected}
                            onCheckedChange={toggleSelectAll}
                            aria-label="Select all products"
                          />
                        </TableHead>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.filter((p) => p.status === "Active").length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No active products found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProducts
                          .filter((p) => p.status === "Active")
                          .map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedProducts.includes(product.id)}
                                  onCheckedChange={() => toggleSelectProduct(product.id)}
                                  aria-label={`Select ${product.name}`}
                                />
                              </TableCell>
                              <TableCell>
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  width={50}
                                  height={50}
                                  className="rounded-md object-cover"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {product.name}
                                {product.featured && (
                                  <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                                    Featured
                                  </Badge>
                                )}
                                <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                              </TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>${product.price.toFixed(2)}</TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>
                                <Badge variant="default">{product.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCurrentProduct(product)
                                        setIsEditDialogOpen(true)
                                      }}
                                    >
                                      <Edit className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCurrentProduct(product)
                                        setIsDeleteDialogOpen(true)
                                      }}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="featured">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={isAllSelected}
                            onCheckedChange={toggleSelectAll}
                            aria-label="Select all products"
                          />
                        </TableHead>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.filter((p) => p.featured).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No featured products found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProducts
                          .filter((p) => p.featured)
                          .map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedProducts.includes(product.id)}
                                  onCheckedChange={() => toggleSelectProduct(product.id)}
                                  aria-label={`Select ${product.name}`}
                                />
                              </TableCell>
                              <TableCell>
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  width={50}
                                  height={50}
                                  className="rounded-md object-cover"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {product.name}
                                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                                  Featured
                                </Badge>
                                <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                              </TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>${product.price.toFixed(2)}</TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>
                                <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                                  {product.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCurrentProduct(product)
                                        setIsEditDialogOpen(true)
                                      }}
                                    >
                                      <Edit className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCurrentProduct(product)
                                        setIsDeleteDialogOpen(true)
                                      }}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Ceramic Vase"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  placeholder="VASE-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                  placeholder="39.99"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                  placeholder="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger id="category">
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
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newProduct.status}
                  onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}
                >
                  <SelectTrigger id="status">
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
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  value={newProduct.dimensions}
                  onChange={(e) => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                  placeholder="10&quot; x 5&quot; x 5&quot;"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={newProduct.weight}
                  onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
                  placeholder="2 lbs"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="A beautiful handcrafted ceramic vase..."
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={newProduct.featured}
                  onCheckedChange={(checked) => setNewProduct({ ...newProduct, featured: checked as boolean })}
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Product Image</Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Drag and drop an image here, or click to browse</p>
                <p className="text-xs text-muted-foreground">Recommended size: 800x800px. Max file size: 5MB</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Image
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
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
                src={currentProduct.image || "/placeholder.svg"}
                alt={currentProduct.name}
                width={60}
                height={60}
                className="rounded-md object-cover border"
              />
              <div>
                <h3 className="font-medium">{currentProduct.name}</h3>
                <p className="text-sm text-muted-foreground">SKU: {currentProduct.sku}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

