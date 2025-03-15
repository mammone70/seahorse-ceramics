import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { cartItems } from "./cartItems";

export const carts = pgTable('carts', {
    id: text('id')
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),    
    user: text('userId').notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  });

//products to cartItems one-to-many relationship
export const cartCartItemRelations = relations(carts, 
    ({ many }) => ({
        cartItems: many(cartItems),
    })
);