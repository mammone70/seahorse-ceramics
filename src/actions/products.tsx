"use server"

import * as z from "zod";

import { addProduct, deleteProduct, getFeaturedProduct, getHeroProduct, getProductById, getProducts, TInsertProduct, TProduct, updateProduct } from "@/dao/products";
import { GetProductByIdSchema } from "@/schemas/productSchemas";

export async function getProductsServerAction() : Promise<TProduct[]> {
    return getProducts();
}

export async function getHeroProductServerAction() : Promise<TProduct> {
    return getHeroProduct();
}

export async function getFeaturedProductServerAction() : Promise<TProduct> {
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

export async function addProductServerAction(
    insertProduct : TInsertProduct ) : Promise<void> {

    await addProduct(insertProduct);
    
}  

export async function deleteProductServerAction(id : string) : Promise<void> {
    await deleteProduct(id);
}

export async function updateProductServerAction(updatedProduct: TProduct): Promise<void> {
    await updateProduct(updatedProduct);
}