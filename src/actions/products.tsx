"use server"

import { getFeaturedProduct, getHeroProduct, getProducts, Product } from "@/dao/products";

export async function getProductsServerAction() : Promise<Product[]> {
    return getProducts();
}

export async function getHeroProductServerAction() : Promise<Product> {
    return getHeroProduct();
}

export async function getFeaturedProductServerAction() : Promise<Product> {
    return getFeaturedProduct();  
}