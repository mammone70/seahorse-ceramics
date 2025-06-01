import { db } from "@/db"
import { products } from "@/db/schemas/products"
import { eq, sql } from "drizzle-orm";
import { images } from "@/db/schemas/images"

export type TProduct = {
    id: string,
    name: string,
    description: string,
    price: string,
    stock: number,
    imageURL: string | null,
    active: boolean,
    createdAt: Date,
    updatedAt: Date,
    images: {
        id: string,
        imageURL: string,
        productId: string,
        createdAt: Date,
        updatedAt: Date
    }[] | {imageURL: string}[]
}

export type TInsertProduct = Omit<TProduct, "id" | "createdAt" | "updatedAt" | "active">;

export async function getProducts(): Promise<TProduct[]> {
    const prods = await db.query.products.findMany({
        with: {
            images: true
        }
    });

    return prods as TProduct[];
}

export async function getProductById(id: string): Promise<TProduct> {
    const prod = await db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            images: true
        }
    });

    if (!prod) {
        throw new Error(`Product with id ${id} not found`);
    }

    return prod as TProduct;
}

export async function getHeroProduct(): Promise<TProduct> {
    return getDynamicProduct(process.env.HERO_PRODUCT_COLUMN_NAME!);
}

export async function getFeaturedProduct(): Promise<TProduct> {
    return getDynamicProduct(process.env.FEATURED_PRODUCT_COLUMN_NAME!);
}

export async function getDynamicProduct(productColName: string): Promise<TProduct> {
    const result = await db.query.products.findFirst({
        where: eq(products.id, 
            sql`(SELECT ${sql.raw(`${productColName}`)} FROM content LIMIT 1)`
        ),
        with: {
            images: true
        }
    });

    if (!result) {
        throw new Error(`Dynamic product with column ${productColName} not found`);
    }

    return result as TProduct;
}

export async function addProduct(newProduct: TInsertProduct): Promise<void> {
    // First insert the product
    const [insertedProduct] = await db
        .insert(products)
        .values({
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            stock: newProduct.stock,
            imageURL: newProduct.imageURL
        })
        .returning();

    // If there are images, insert them into the images table
    if (newProduct.images && newProduct.images.length > 0) {
        const imageRecords = newProduct.images
            .filter((image): image is { id: string, imageURL: string, productId: string, createdAt: Date, updatedAt: Date } => image.imageURL !== null)
            .map(image => ({
                productId: insertedProduct.id,
                imageURL: image.imageURL
            }));

        if (imageRecords.length > 0) {
            await db
                .insert(images)
                .values(imageRecords);
        }
    }
}

export async function deleteProduct(id: string): Promise<void> {
    await db
        .delete(products)
        .where(eq(products.id, id));
}

export async function updateProduct(updatedProduct: TProduct): Promise<void> {
    // Update the product
    await db
        .update(products)
        .set({
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            stock: updatedProduct.stock,
            imageURL: updatedProduct.imageURL,
            updatedAt: new Date()
        })
        .where(eq(products.id, updatedProduct.id));

    // Get existing images
    const existingImages = await db
        .select()
        .from(images)
        .where(eq(images.productId, updatedProduct.id));

    // Find images to delete (images that exist in the database but not in the updated product)
    const imagesToDelete = existingImages.filter(existingImage =>
        !updatedProduct.images?.some(updatedImage =>
            updatedImage.imageURL === existingImage.imageURL
        )
    );

    // Delete removed images
    if (imagesToDelete.length > 0) {
        await db
            .delete(images)
            .where(
                sql`${images.id} IN (${sql.join(imagesToDelete.map(img => img.id))})`
            );
    }

    // Find new images to add (images that don't exist in the database)
    const newImages = updatedProduct.images?.filter(updatedImage =>
        !existingImages.some(existingImage =>
            existingImage.imageURL === updatedImage.imageURL
        )
    ) || [];

    // Insert new images if any
    if (newImages.length > 0) {
        const imageRecords = newImages
            .filter((image): image is { id: string, imageURL: string, productId: string, createdAt: Date, updatedAt: Date } => image.imageURL !== null)
            .map(image => ({
                productId: updatedProduct.id,
                imageURL: image.imageURL
            }));

        if (imageRecords.length > 0) {
            await db
                .insert(images)
                .values(imageRecords);
        }
    }
}