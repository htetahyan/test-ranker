ALTER TABLE "rate_limit" ADD COLUMN "version_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rate_limit" ADD CONSTRAINT "rate_limit_version_id_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
