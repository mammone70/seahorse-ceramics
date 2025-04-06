"use client"

import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image"
import { Product } from "@/dao/products";
import { fadeIn, heroImageAnimation, staggerContainer } from "@/lib/animation";
import { motion } from "framer-motion";


export function HeroSection({ heroProduct } : { heroProduct : Product }){
    return (
        <section className=" py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-stretch">
                    {/* <div className="md:w-1/2 mb-8 md:mb-0"> */}
                    <motion.div
                        className="md:w-1/2 mb-8 md:mb-0"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.h1 
                            className="text-4xl md:text-5xl font-bold mb-4"
                            variants={fadeIn}
                        >
                            Handcrafted Ceramics for Your Home
                        </motion.h1>
                        <motion.p 
                            className="text-xl mb-6"
                            variants={fadeIn}
                        >
                            Discover our collection of beautiful, artisanal pottery from Coastal California.
                        </motion.p>
                        <motion.div variants={fadeIn}>
                            <Button asChild>
                                <Link href="/products">Shop Now</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        className="md:w-1/2"
                        initial="hidden"
                        animate="visible"
                        variants={heroImageAnimation}
                    >
                        <Link href={`/products/${heroProduct.id}`}>
                            <Image
                            src={heroProduct.imageURL || ""}
                            alt={heroProduct.name}
                            width={500}
                            height={500}
                            className="rounded-lg shadow-lg mx-auto"
                            />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}