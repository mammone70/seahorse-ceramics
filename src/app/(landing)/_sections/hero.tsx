import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image"
import { Product } from "@/dao/products";


export function HeroSection({ heroProduct } : { heroProduct : Product }){
    return (
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
                <Link href={`/products/${heroProduct.id}`}>
                    <Image
                    src={heroProduct.imageURL || ""}
                    alt={heroProduct.name}
                    width={500}
                    height={500}
                    className="rounded-lg shadow-lg mx-auto"
                    />
                </Link>
                </div>
            </div>
            </div>
        </section>
    )
}