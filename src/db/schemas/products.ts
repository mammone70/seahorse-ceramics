import { numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: numeric({
        precision : 100,
        scale: 2,
    }),
    imageURL : text('image_url'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  });