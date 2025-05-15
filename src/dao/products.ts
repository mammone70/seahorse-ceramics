import { db } from "@/db"
import { content } from "@/db/schemas/content";
import { products } from "@/db/schemas/products"
import { eq, sql } from "drizzle-orm";

export type TProduct = {
    id : string,
    name : string,
    description : string,
    price : string,
    stock : number,
    imageURL : string | null,
    images : (string | null)[]
}

export type TInsertProduct = Omit<TProduct, "id">;

export async function getProducts() : Promise<TProduct[]> {
    const prods = await db.select({
        id : products.id,
        name : products.name,
        description : products.description,
        price : products.price,
        stock : products.stock,
        imageURL : products.imageURL,

    }).from(products);
    return prods;
}

export async function getProductById(id : string) : Promise<TProduct>{
    const prods = 
        await 
            db
            .select()
            .from(products)
            .where(eq(products.id, id));
    
    return prods[0];
}

export async function getHeroProduct() : Promise<TProduct> {
    return getDynamicProduct(process.env.HERO_PRODUCT_COLUMN_NAME!);
}

export async function getFeaturedProduct() : Promise<TProduct> {
    return getDynamicProduct(process.env.FEATURED_PRODUCT_COLUMN_NAME!);
}

export async function getDynamicProduct(productColName : string) : Promise<TProduct> {
    
    const whereClause = `products.id = content.${productColName}`;

    const results = 
        await 
            db
            .select()
            .from(products)
            .leftJoin(content, sql`${whereClause}`);
    return results[0].products
}

export async function addProduct(newProduct : TInsertProduct) : Promise<void> {
    await db
        .insert(products)
        .values(newProduct)
}