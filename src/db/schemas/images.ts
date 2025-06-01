import { randomUUID } from "crypto";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { products } from "./products";
import { relations } from "drizzle-orm";


export const images = pgTable('images',
    {
        id: text('id')
            .primaryKey()
            .notNull()
            .$defaultFn(() => randomUUID()),
        productId:   text('product_id')
                        .references(() => products.id, {
                            onDelete : 'cascade'
                        })
                        .notNull(),
        imageURL : text('image_url'),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at')
            .notNull()
            .$onUpdate(() => new Date()),
});

//images to products, many to one
export const imageRelations = relations(images, 
    ({ one }) => ({
        product: one(products, {
            fields: [images.productId],
            references: [products.id],
        }),
    })
);