import Image from "next/image"
import { Product } from "@/dao/products";
import Link from "next/link";
import AddToCartButton from "@/components/products/add-to-cart-button";


export function ProductGridSection({ products } : { products : Product[] }){
    return (
        <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.imageURL || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">${product.price}</p>
                    <AddToCartButton></AddToCartButton>
                  </div>
                </Link> 
              </div>
            ))}
          </div>
        </div>
      </section>    
    )
}