"use server"

import { getProducts, Product } from "@/dao/products";

export async function getProductsServerAction() : Promise<Product[]> {
    return getProducts();
}