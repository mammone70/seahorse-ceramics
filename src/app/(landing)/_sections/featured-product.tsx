"use client"

import Image from "next/image"
import { Product } from "@/dao/products";
import Link from "next/link";
import AddToCartButton from "@/components/products/add-to-cart-button";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation";


export function FeaturedProductSection({ featuredProduct } : { featuredProduct : Product }){
    return (
        <motion.section
            className="py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
        >
            <Link href={`/products/${featuredProduct.id}`}>
                <div className="container mx-auto px-4">
                    <motion.h2 className="text-3xl font-bold mb-8 text-center">
                        Featured Product
                    </motion.h2>
                    <motion.div 
                        className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden"
                        variants={fadeIn}
                    >
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <Image
                                    src={featuredProduct.imageURL || ""}
                                    alt={featuredProduct.name}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </motion.div>
                        </div>
                        <div className="md:w-1/2 p-8">
                            <motion.h3 
                                className="text-2xl font-semibold mb-4"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                    {featuredProduct.name}
                            </motion.h3>
                            <motion.p 
                                className="text-gray-600 mb-4"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                {featuredProduct.description} 
                            </motion.p>
                            <motion.p 
                                className="text-2xl font-bold mb-4"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {featuredProduct.price}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <AddToCartButton></AddToCartButton>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Link>
        </motion.section>    
    )
}