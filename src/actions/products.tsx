"use server"

import * as z from "zod";

import { getFeaturedProduct, getHeroProduct, getProductById, getProducts, Product } from "@/dao/products";
import { GetProductByIdSchema } from "@/schemas/productSchemas";

export async function getProductsServerAction() : Promise<Product[]> {
    return getProducts();
}

export async function getHeroProductServerAction() : Promise<Product> {
    return getHeroProduct();
}

export async function getFeaturedProductServerAction() : Promise<Product> {
    return getFeaturedProduct();  
}


export async function getProductByIdServerAction(values : z.infer<typeof GetProductByIdSchema>)
{
    const validatedParams = GetProductByIdSchema.safeParse(values);

    if (!validatedParams.success){
        return { error: "Invalid fields!" };
    }

    const { id } = validatedParams.data;

    const product = await getProductById(id);
    return {product : product};
}