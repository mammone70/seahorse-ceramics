CREATE TABLE "content" (
	"id" text PRIMARY KEY NOT NULL,
	"hero_product_id" text,
	"hero_header" text,
	"hero_text" text,
	"featured_product_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products_table" RENAME TO "products";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "content" ADD CONSTRAINT "content_hero_product_id_products_id_fk" FOREIGN KEY ("hero_product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content" ADD CONSTRAINT "content_featured_product_id_products_id_fk" FOREIGN KEY ("featured_product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;