import { randomUUID } from "crypto";
import { pgTable, text } from "drizzle-orm/pg-core";
import { products } from "./products";
import { relations } from "drizzle-orm";

export const categories = pgTable('categories', {
    id: text('id')
            .primaryKey()
            .notNull()
            .$defaultFn(() => randomUUID()),    
    name: text('name').notNull(),
    description: text('description').notNull(),
});

//categories to products many-to-many relationship
export const categoriesToProducts = relations(categories,
    ({ many }) => ({
        products: many(products),
    })
)