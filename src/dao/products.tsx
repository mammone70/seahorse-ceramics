import { db } from "@/db"
import { products } from "@/db/schemas/products"

export interface Product {
    id : number,
    name : string,
    price : string | null,
    imageURL : string | null,
}

export async function getProducts() : Promise<Product[]> {
    const prods = await db.select().from(products);
    return prods;
}