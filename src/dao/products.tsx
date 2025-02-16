import { db } from "@/db"
import { products } from "@/db/schemas/products"
import { eq } from "drizzle-orm";

export interface Product {
    id : number,
    name : string,
    description : string,
    price : string | null,
    imageURL : string | null,
}

export async function getProducts() : Promise<Product[]> {
    const prods = await db.select().from(products);
    return prods;
}

export async function getProductById(id : number) : Promise<Product>{
    const prods = await 
                        db
                        .select()
                        .from(products)
                        .where(eq(products.id, id));
    
    return prods[0];
}