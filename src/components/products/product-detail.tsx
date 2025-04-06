"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { Product } from "@/dao/products"
import { useEffect, useState } from "react"
import { useCart } from "@/components/cart/cart-provider"
import { getProductByIdServerAction } from "@/actions/products"
import { motion } from "framer-motion"

export default function ProductDetail({ id } : { id : string } ) {

    // const product = await getProductById(id);

    const [quantity, setQuantity] = useState(1);
    const { addItem, setIsOpen } = useCart();
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const getProduct = async () => {
            getProductByIdServerAction({id})
                .then((data) => {
                    console.log(data);
                    if(data?.error){
                        //TODO
                        return;
                    }
                    if(data?.product){
                        setProduct(data.product);    
                    }
                });
        };

        getProduct();
    }, [id]);
    
    // if (!product) {
    //     notFound()
    // }

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1))
    }

    const increaseQuantity = () => {
        setQuantity((prev) => Math.min(product ? product.stock : 0, prev + 1))
    }

    const handleAddToCart = () => {
        if (product){
            addItem({
                productId : product.id,
                name : product.name,
                price : parseFloat(product.price),
                imageUrl : product.imageURL,
            })

            // Open the cart sidebar
            setIsOpen(true)
        }
    }   
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <motion.div
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={product?.imageURL || "/placeholder.svg"}
                        alt={product ? product.name : ""}
                        width={500}
                        height={500}
                        className="rounded-lg shadow-lg"
                    />
                </motion.div>
                <motion.div className="md:w-1/2">
                    <motion.h1 className="text-3xl font-bold mb-4">
                        {product?.name}
                    </motion.h1>
                    {/* <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                        />
                        ))}
                        <span className="ml-2 text-gray-600">({product.rating})</span>
                    </div> */}
                    <motion.p
                        className="text-xl font-bold mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                    >
                        ${product?.price}
                    </motion.p>
                    <motion.p
                        className="text-gray-600 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                    >
                        {product?.description}
                    </motion.p>
                    <motion.div
                        className="flex items-center mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                    >    
                        <Button variant="outline" size="icon" onClick={decreaseQuantity}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-4 text-xl">{quantity}</span>
                        <Button variant="outline" size="icon" onClick={increaseQuantity}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Button
                            className="w-full mb-4"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                        <p className="text-sm text-gray-600">{product?.stock} in stock</p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

