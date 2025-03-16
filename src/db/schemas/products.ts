import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { images } from "./images";
import { cartItems } from "./cartItems";

export const products = pgTable('products', {
    id: text('id')
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),    
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: 
        numeric({
            precision : 100,
            scale: 2,
        })
        .default('0.00')
        .notNull(),
    stock : integer().default(0).notNull(),
    imageURL : text('image_url'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  });

//products to images one-to-many relationship
export const productImageRelations = relations(products, 
    ({ many }) => ({
        images: many(images),
    })
);

//products to cartItems one-to-many relationship
export const productCartRelations = relations(products, 
    ({ many }) => ({
        cartItems: many(cartItems),
    })
);