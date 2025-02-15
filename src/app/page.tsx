import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const products = [
  { id: 0, name: "Valentine's Mugs", price: 39.99, image: "/img/products/valentine-mugs.jpg" },
  { id: 1, name: "Valentine's Mug", price: 24.99, image: "/img/products/valentine-single.jpg" },
  { id: 2, name: "Bird Mugs", price: 14.99, image: "/img/products/birds.jpg" },
  { id: 3, name: "Assorted Coastal Mugs", price: 29.99, image: "/img/products/coastal.jpg" },
  { id: 4, name: "Floral Mug", price: 34.99, image: "/img/products/floral.jpg" },
  { id: 5, name: "Housing Mugs", price: 79.99, image: "/img/products/houses.jpg" },
  { id: 6, name: "Assorted Coastal Mugs", price: 29.99, image: "/img/products/coastal.jpg" },
  { id: 7, name: "Ocean Pattern Mug", price: 34.99, image: "/img/products/ocean.jpg" },
  { id: 8, name: "Wood Landscapes", price: 34.99, image: "/img/products/woods.jpg" },
]

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-sky-300 to-cyan-100">
      {/* Hero Section */}
      <section className=" py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Handcrafted Ceramics for Your Home</h1>
              <p className="text-xl mb-6">Discover our collection of beautiful, artisanal pottery from Coastal California.</p>
              <Button asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <Link href="/products/1">
                <Image
                  src={products[0].image}
                  alt={products[0].name}
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg mx-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Product</h2>
          <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:w-1/2">
              <Image
                src={products[1].image}
                alt={products[1].name}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-semibold mb-4">Exclusive Ceramic Dining Set</h3>
              <p className="text-gray-600 mb-4">
                Surprise your Valentine this year with our handcrafted mug in a beautiful pink glaze.
              </p>
              <p className="text-2xl font-bold mb-4">{products[1].price}</p>
              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                  <Button variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}