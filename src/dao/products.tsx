import { db } from "@/db"
import { content } from "@/db/schemas/content";
import { products } from "@/db/schemas/products"
import { eq, sql } from "drizzle-orm";

export interface Product {
    id : string,
    name : string,
    description : string,
    price : string | null,
    imageURL : string | null,
}

export async function getProducts() : Promise<Product[]> {
    const prods = await db.select().from(products);
    return prods;
}

export async function getProductById(id : string) : Promise<Product>{
    const prods = 
        await 
            db
            .select()
            .from(products)
            .where(eq(products.id, id));
    
    return prods[0];
}

export async function getHeroProduct() : Promise<Product> {
    return getDynamicProduct(process.env.HERO_PRODUCT_COLUMN_NAME!);
}

export async function getFeaturedProduct() : Promise<Product> {
    return getDynamicProduct(process.env.FEATURED_PRODUCT_COLUMN_NAME!);
}

export async function getDynamicProduct(productColName : string) : Promise<Product> {
    
    const whereClause = `products.id = content.${productColName}`;

    const results = 
        await 
            db
            .select()
            .from(products)
            .leftJoin(content, sql`${whereClause}`);
    return results[0].products
}