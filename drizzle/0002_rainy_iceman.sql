ALTER TABLE "Candidates" ALTER COLUMN "generated_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Candidates" ADD COLUMN "current_step" text DEFAULT 'intro' NOT NULL;