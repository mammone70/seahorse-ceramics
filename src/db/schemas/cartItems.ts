import { randomUUID } from "crypto";
import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { products } from "./products";
import { carts } from "./carts";
import { relations } from "drizzle-orm";

export const cartItems = pgTable('cartItems', {
    id: text('id')
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),    
    name: text('name').notNull(),
    productId:   text('product_id')
                .references(() => products.id
    ).notNull(),
    cartId: text('cart_id')
                .references(() => carts.id
    ).notNull(),
    quantity : numeric().notNull(),
    price: numeric({
        precision : 100,
        scale: 2,
    }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  });

//cartItems to products, one to one
export const cartItemProductRelations = relations(cartItems, 
    ({ one }) => ({
        products: one(products, {
            fields: [cartItems.productId],
            references: [products.id],
        }),
    }));

//cartItems to carts, many to one
export const cartItemCartRelations = relations(cartItems, 
    ({ one }) => ({
        carts: one(carts, {
            fields: [cartItems.cartId],
            references: [carts.id],
        }),
    }));