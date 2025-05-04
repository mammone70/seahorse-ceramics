ALTER TABLE "products_to_categories" RENAME COLUMN "categories_id" TO "category_id";--> statement-breakpoint
ALTER TABLE "products_to_categories" DROP CONSTRAINT "products_to_categories_categories_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "products_to_categories" DROP CONSTRAINT "products_to_categories_product_id_categories_id_pk";--> statement-breakpoint
ALTER TABLE "products_to_categories" ADD CONSTRAINT "products_to_categories_product_id_category_id_pk" PRIMARY KEY("product_id","category_id");--> statement-breakpoint
ALTER TABLE "products_to_categories" ADD CONSTRAINT "products_to_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;