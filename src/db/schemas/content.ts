import { randomUUID } from "crypto";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { products } from "./products";

export const content = pgTable('content', {
    id: 
        text('id')
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()), 
    
    /** Hero Section Content Properties */
    heroProduct :   
        text('hero_product_id')
        .references(() => products.id),
    heroHeader: text('hero_header'),
    heroText: text('hero_text'),

    /**Featured Product Section Content Properties */
    featuredProduct :   
        text('featured_product_id')
        .references(() => products.id),
        
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});