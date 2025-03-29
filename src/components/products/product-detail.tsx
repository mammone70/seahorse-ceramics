"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { Product } from "@/dao/products"
import { useEffect, useState } from "react"
import { useCart } from "@/components/cart/cart-provider"
import { getProductByIdServerAction } from "@/actions/products"

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
                <div className="md:w-1/2">
                <Image
                    src={product?.imageURL || "/placeholder.svg"}
                    alt={product ? product.name : ""}
                    width={500}
                    height={500}
                    className="rounded-lg shadow-lg"
                />
                </div>
                <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
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
                <p className="text-xl font-bold mb-4">${product?.price}</p>
                <p className="text-gray-600 mb-6">{product?.description}</p>
                <div className="flex items-center mb-6">
                    <Button variant="outline" size="icon" onClick={decreaseQuantity}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 text-xl">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={increaseQuantity}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Button className="w-full mb-4" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
                <p className="text-sm text-gray-600">{product?.stock} in stock</p>
                </div>
            </div>
        </div>
    )
}

