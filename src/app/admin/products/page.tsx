// import { useEffect } from "react"
import ProductsSection from "../_components/products/products-section"
import { getProductsServerAction } from "@/actions/products";


export default async function AdminProducts() {
  
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
  
  // // Filter products based on search query and filters
  // useEffect(() => {
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

  //   // // Apply category filter
  //   // if (categoryFilter && categoryFilter !== "All Categories") {
  //   //   filtered = filtered.filter((product) => product.category === categoryFilter)
  //   // }

  //   // // Apply status filter
  //   // if (statusFilter && statusFilter !== "All") {
  //   //   filtered = filtered.filter((product) => product.status === statusFilter)
  //   // }

  //   // setFilteredProducts(filtered)
  // }, [])//[products, searchQuery, categoryFilter, statusFilter])

  // // Handle bulk selection
  // // useEffect(() => {
  // //   setIsAllSelected(selectedProducts.length === filteredProducts.length && filteredProducts.length > 0)
  // // }, [selectedProducts, filteredProducts])

  // // const handleAddProduct = () => {
  // //   const id = (Math.max(...products.map((p) => Number.parseInt(p.id))) + 1).toString()
  // //   const createdAt = new Date().toISOString().split("T")[0]

  // //   const productToAdd = {
  // //     ...newProduct,
  // //     id,
  // //     createdAt,
  // //     price: Number(newProduct.price),
  // //     stock: Number(newProduct.stock),
  // //   } as Product

  // //   setProducts([productToAdd, ...products])
  // //   setNewProduct({
  // //     name: "",
  // //     price: 0,
  // //     description: "",
  // //     category: "",
  // //     stock: 0,
  // //     status: "Active",
  // //     featured: false,
  // //     sku: "",
  // //     dimensions: "",
  // //     weight: "",
  // //     image: "/placeholder.svg",
  // //   })
  // //   // setIsAddDialogOpen(false)
  // // }

  // // const handleEditProduct = () => {
  // //   if (!currentProduct) return

  // //   const updatedProducts = products.map((product) => (product.id === currentProduct.id ? currentProduct : product))

  // //   setProducts(updatedProducts)
  // //   setCurrentProduct(null)
  // //   setIsEditDialogOpen(false)
  // // }

  // // const handleDeleteProduct = () => {
  // //   if (!currentProduct) return

  // //   const updatedProducts = products.filter((product) => product.id !== currentProduct.id)
  // //   setProducts(updatedProducts)
  // //   setCurrentProduct(null)
  // //   setIsDeleteDialogOpen(false)
  // // }

  // // const handleBulkDelete = () => {
  // //   const updatedProducts = products.filter((product) => !selectedProducts.includes(product.id))
  // //   setProducts(updatedProducts)
  // //   setSelectedProducts([])
  // // }

  // // const toggleSelectAll = () => {
  // //   if (isAllSelected) {
  // //     setSelectedProducts([])
  // //   } else {
  // //     setSelectedProducts(filteredProducts.map((product) => product.id))
  // //   }
  // // }

  // // const toggleSelectProduct = (id: string) => {
  // //   if (selectedProducts.includes(id)) {
  // //     setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
  // //   } else {
  // //     setSelectedProducts([...selectedProducts, id])
  // //   }
  // }


  //get initial products
  const initialProducts = await getProductsServerAction();

  return (
    <ProductsSection initialProducts={initialProducts} />
    // <ProductsSection />
  )
}

