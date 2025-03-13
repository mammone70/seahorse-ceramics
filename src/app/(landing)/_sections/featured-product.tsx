import Image from "next/image"
import { Product } from "@/dao/products";
import Link from "next/link";
import AddToCartButton from "@/components/products/add-to-cart-button";


export function FeaturedProductSection({ featuredProduct } : { featuredProduct : Product }){
    return (
        <section className="py-16">
            <Link href={`/products/${featuredProduct.id}`}>
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Product</h2>
                    <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="md:w-1/2">
                        <Image
                            src={featuredProduct.imageURL || ""}
                            alt={featuredProduct.name}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full"
                        />
                        </div>
                        <div className="md:w-1/2 p-8">
                        <h3 className="text-2xl font-semibold mb-4">{featuredProduct.name}</h3>
                        <p className="text-gray-600 mb-4">
                            {featuredProduct.description}
                        </p>
                        <p className="text-2xl font-bold mb-4">{featuredProduct.price}</p>
                        <AddToCartButton></AddToCartButton>
                        </div>
                    </div>
                </div>
            </Link>
        </section>    
    )
}