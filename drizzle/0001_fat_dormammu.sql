ALTER TABLE "Candidates" DROP CONSTRAINT "Candidates_generated_url_unique";--> statement-breakpoint
ALTER TABLE "Assessments" ALTER COLUMN "unique_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "Assessments" ALTER COLUMN "unique_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Candidates" ALTER COLUMN "generated_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "Candidates" ALTER COLUMN "generated_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_unique_id_unique" UNIQUE("unique_id");