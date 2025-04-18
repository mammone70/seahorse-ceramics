"use client"

import { useEffect } from "react"
import ProductsSection from "../_components/products/products-section"

// Sample product data
// const initialProducts = [
//   {
//     id: "1",
//     name: "Ceramic Vase",
//     price: 39.99,
//     image: "/placeholder.svg",
//     description: "A beautiful handcrafted ceramic vase, perfect for displaying your favorite flowers.",
//     category: "Vases",
//     stock: 10,
//     status: "Active",
//     featured: true,
//     sku: "VASE-001",
//     dimensions: '10" x 5" x 5"',
//     weight: "2 lbs",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: "2",
//     name: "Pottery Bowl",
//     price: 24.99,
//     image: "/placeholder.svg",
//     description: "A versatile pottery bowl, great for serving salads or as a decorative piece.",
//     category: "Bowls",
//     stock: 15,
//     status: "Active",
//     featured: false,
//     sku: "BOWL-001",
//     dimensions: '8" x 8" x 3"',
//     weight: "1.5 lbs",
//     createdAt: "2023-02-20",
//   },
//   {
//     id: "3",
//     name: "Ceramic Mug",
//     price: 14.99,
//     image: "/placeholder.svg",
//     description: "A cozy ceramic mug for your morning coffee or evening tea.",
//     category: "Mugs",
//     stock: 20,
//     status: "Active",
//     featured: true,
//     sku: "MUG-001",
//     dimensions: '4" x 3" x 5"',
//     weight: "0.8 lbs",
//     createdAt: "2023-03-10",
//   },
//   {
//     id: "4",
//     name: "Decorative Plate",
//     price: 29.99,
//     image: "/placeholder.svg",
//     description: "An elegant decorative plate to enhance your dining table or wall display.",
//     category: "Plates",
//     stock: 8,
//     status: "Active",
//     featured: false,
//     sku: "PLATE-001",
//     dimensions: '10" diameter x 1" height',
//     weight: "1.2 lbs",
//     createdAt: "2023-04-05",
//   },
//   {
//     id: "5",
//     name: "Ceramic Planter",
//     price: 34.99,
//     image: "/placeholder.svg",
//     description: "A stylish ceramic planter for your indoor plants and herbs.",
//     category: "Planters",
//     stock: 12,
//     status: "Active",
//     featured: false,
//     sku: "PLANTER-001",
//     dimensions: '6" x 6" x 7"',
//     weight: "2.2 lbs",
//     createdAt: "2023-05-12",
//   },
//   {
//     id: "6",
//     name: "Tea Set",
//     price: 79.99,
//     image: "/placeholder.svg",
//     description: "A complete ceramic tea set including teapot and four cups.",
//     category: "Sets",
//     stock: 5,
//     status: "Active",
//     featured: true,
//     sku: "SET-001",
//     dimensions: "Various",
//     weight: "3.5 lbs",
//     createdAt: "2023-06-18",
//   },
//   {
//     id: "7",
//     name: "Ceramic Candle Holder",
//     price: 19.99,
//     image: "/placeholder.svg",
//     description: "A beautiful ceramic candle holder to create a warm ambiance.",
//     category: "Home Decor",
//     stock: 18,
//     status: "Active",
//     featured: false,
//     sku: "CANDLE-001",
//     dimensions: '4" x 4" x 3"',
//     weight: "0.9 lbs",
//     createdAt: "2023-07-22",
//   },
//   {
//     id: "8",
//     name: "Ceramic Soap Dish",
//     price: 12.99,
//     image: "/placeholder.svg",
//     description: "A practical and stylish ceramic soap dish for your bathroom.",
//     category: "Bathroom",
//     stock: 25,
//     status: "Active",
//     featured: false,
//     sku: "SOAP-001",
//     dimensions: '5" x 3.5" x 1"',
//     weight: "0.5 lbs",
//     createdAt: "2023-08-14",
//   },
// ]

// type Product = (typeof initialProducts)[0]

export default function AdminProducts() {
  // const [products, setProducts] = useState<Product[]>(initialProducts)
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  // const [searchQuery, setSearchQuery] = useState("")
  // const [categoryFilter, setCategoryFilter] = useState("All Categories")
  // const [statusFilter, setStatusFilter] = useState("All")
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  // const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  // const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  // const [newProduct, setNewProduct] = useState<Partial<Product>>({
  //   name: "",
  //   price: 0,
  //   description: "",
  //   category: "",
  //   stock: 0,
  //   status: "Active",
  //   featured: false,
  //   sku: "",
  //   dimensions: "",
  //   weight: "",
  //   image: "/placeholder.svg",
  // })
  // const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  // const [isAllSelected, setIsAllSelected] = useState(false)

  // Filter products based on search query and filters
  useEffect(() => {
    // let filtered = [...products]

    // Apply search filter
    // if (searchQuery) {
    //   filtered = filtered.filter(
    //     (product) =>
    //       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
    //   )
    // }

    // // Apply category filter
    // if (categoryFilter && categoryFilter !== "All Categories") {
    //   filtered = filtered.filter((product) => product.category === categoryFilter)
    // }

    // // Apply status filter
    // if (statusFilter && statusFilter !== "All") {
    //   filtered = filtered.filter((product) => product.status === statusFilter)
    // }

    // setFilteredProducts(filtered)
  }, [])//[products, searchQuery, categoryFilter, statusFilter])

  // Handle bulk selection
  // useEffect(() => {
  //   setIsAllSelected(selectedProducts.length === filteredProducts.length && filteredProducts.length > 0)
  // }, [selectedProducts, filteredProducts])

  // const handleAddProduct = () => {
  //   const id = (Math.max(...products.map((p) => Number.parseInt(p.id))) + 1).toString()
  //   const createdAt = new Date().toISOString().split("T")[0]

  //   const productToAdd = {
  //     ...newProduct,
  //     id,
  //     createdAt,
  //     price: Number(newProduct.price),
  //     stock: Number(newProduct.stock),
  //   } as Product

  //   setProducts([productToAdd, ...products])
  //   setNewProduct({
  //     name: "",
  //     price: 0,
  //     description: "",
  //     category: "",
  //     stock: 0,
  //     status: "Active",
  //     featured: false,
  //     sku: "",
  //     dimensions: "",
  //     weight: "",
  //     image: "/placeholder.svg",
  //   })
  //   // setIsAddDialogOpen(false)
  // }

  // const handleEditProduct = () => {
  //   if (!currentProduct) return

  //   const updatedProducts = products.map((product) => (product.id === currentProduct.id ? currentProduct : product))

  //   setProducts(updatedProducts)
  //   setCurrentProduct(null)
  //   setIsEditDialogOpen(false)
  // }

  // const handleDeleteProduct = () => {
  //   if (!currentProduct) return

  //   const updatedProducts = products.filter((product) => product.id !== currentProduct.id)
  //   setProducts(updatedProducts)
  //   setCurrentProduct(null)
  //   setIsDeleteDialogOpen(false)
  // }

  // const handleBulkDelete = () => {
  //   const updatedProducts = products.filter((product) => !selectedProducts.includes(product.id))
  //   setProducts(updatedProducts)
  //   setSelectedProducts([])
  // }

  // const toggleSelectAll = () => {
  //   if (isAllSelected) {
  //     setSelectedProducts([])
  //   } else {
  //     setSelectedProducts(filteredProducts.map((product) => product.id))
  //   }
  // }

  // const toggleSelectProduct = (id: string) => {
  //   if (selectedProducts.includes(id)) {
  //     setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
  //   } else {
  //     setSelectedProducts([...selectedProducts, id])
  //   }
  // }

  return (
    <ProductsSection></ProductsSection>
  )
}

