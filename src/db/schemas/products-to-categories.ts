import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { products } from "./products";
import { categories } from "./categories";
import { relations } from "drizzle-orm";

export const productsToCategories = pgTable(
    'products_to_categories',
    {
      productId: text('product_id')
        .notNull()
        .references(() => products.id),
      categoryId: text('category_id')
        .notNull()
        .references(() => categories.id),
    },
    (t) => [
          primaryKey({ columns: [t.productId, t.categoryId] })
      ],
  );
  
  export const productsToCategoriesRelations = relations(productsToCategories, 
    ({ one }) => ({
        categories: one(categories, {
        fields: [productsToCategories.categoryId],
        references: [categories.id],
    }),
        products: one(products, {
        fields: [productsToCategories.productId],
        references: [products.id],
    }),  
}));
  
  