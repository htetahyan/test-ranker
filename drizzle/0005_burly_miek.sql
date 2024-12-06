CREATE TABLE IF NOT EXISTS "rate_limit" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"last_called_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"pricing_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rate_limit" ADD CONSTRAINT "rate_limit_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rate_limit" ADD CONSTRAINT "rate_limit_pricing_id_Pricing_id_fk" FOREIGN KEY ("pricing_id") REFERENCES "public"."Pricing"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
