"use client"

import Image from "next/image"
import { TProduct } from "@/dao/products";
import Link from "next/link";
import AddToCartButton from "@/components/products/add-to-cart-button";
import { motion } from "framer-motion";
import { productCardAnimation, staggerContainer } from "@/lib/animation";


export function ProductGridSection({ products } : { products : TProduct[] }){
    return (
        <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}  
          >
              Our Products
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
              {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                variants={productCardAnimation}
                custom={index}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>    
    )
}