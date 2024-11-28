CREATE TABLE IF NOT EXISTS "usuage" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"total_assessment" integer DEFAULT 0 NOT NULL,
	"total_candidates" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"pricing_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usuage" ADD CONSTRAINT "usuage_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usuage" ADD CONSTRAINT "usuage_pricing_id_Pricing_id_fk" FOREIGN KEY ("pricing_id") REFERENCES "public"."Pricing"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
