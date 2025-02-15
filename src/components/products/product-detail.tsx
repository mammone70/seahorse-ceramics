import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Star, Minus, Plus } from "lucide-react"

// This would typically come from a database or API
const products = [
  {
    id: "1",
    name: "Ceramic Vase",
    price: 39.99,
    image: "/placeholder.svg",
    description: "A beautiful handcrafted ceramic vase, perfect for displaying your favorite flowers.",
    rating: 4.5,
    stock: 10,
  },
  {
    id: "2",
    name: "Pottery Bowl",
    price: 24.99,
    image: "/placeholder.svg",
    description: "A versatile pottery bowl, great for serving salads or as a decorative piece.",
    rating: 4.2,
    stock: 15,
  },
  {
    id: "3",
    name: "Ceramic Mug",
    price: 14.99,
    image: "/placeholder.svg",
    description: "A cozy ceramic mug for your morning coffee or evening tea.",
    rating: 4.8,
    stock: 20,
  },
]

export default function ProductDetail({ id }: { id: string }) {
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
              />
            ))}
            <span className="ml-2 text-gray-600">({product.rating})</span>
          </div>
          <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex items-center mb-6">
            <Button variant="outline" size="icon">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4 text-xl">1</span>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="w-full mb-4">Add to Cart</Button>
          <p className="text-sm text-gray-600">{product.stock} in stock</p>
        </div>
      </div>
    </div>
  )
}

