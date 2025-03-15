import { getFeaturedProductServerAction, getHeroProductServerAction, getProductsServerAction } from "@/actions/products"

import { HeroSection } from "./_sections/hero"
import { FeaturedProductSection } from "./_sections/featured-product"
import { ProductGridSection } from "./_sections/product-grid"

// const productsJSON = [
//   { id: 0, name: "Valentine's Mugs", price: 39.99, image: "/img/products/valentine-mugs.jpg" },
//   { id: 1, name: "Valentine's Mug", price: 24.99, image: "/img/products/valentine-single.jpg" },
//   { id: 2, name: "Bird Mugs", price: 14.99, image: "/img/products/birds.jpg" },
//   { id: 3, name: "Assorted Coastal Mugs", price: 29.99, image: "/img/products/coastal.jpg" },
//   { id: 4, name: "Floral Mug", price: 34.99, image: "/img/products/floral.jpg" },
//   { id: 5, name: "Housing Mugs", price: 79.99, image: "/img/products/houses.jpg" },
//   { id: 6, name: "Assorted Coastal Mugs", price: 29.99, image: "/img/products/coastal.jpg" },
//   { id: 7, name: "Ocean Pattern Mug", price: 34.99, image: "/img/products/ocean.jpg" },
//   { id: 8, name: "Wood Landscapes", price: 34.99, image: "/img/products/woods.jpg" },
// ]

export default async function Home() {

  const products = await getProductsServerAction();
  const heroProduct = await getHeroProductServerAction();
  const featuredProduct = await getFeaturedProductServerAction();


  return (
    <main className="bg-gradient-to-r from-sky-300 to-cyan-100">
      {/* TODO pull specific products for different sections from db */}

      {/* Hero Section */}
      <HeroSection heroProduct={heroProduct}/>

      {/* Featured Product */}
      <FeaturedProductSection featuredProduct={featuredProduct}/>

      {/* Product Grid */}
      <ProductGridSection products={products}/>

    </main>
  )
}