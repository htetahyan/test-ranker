DO $$ BEGIN
 CREATE TYPE "public"."candidate_status" AS ENUM('pending', 'accepted', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."test_level" AS ENUM('beginner', 'intermediate', 'advanced');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('Admin', 'Company', 'Candidate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"content" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Assessments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"unique_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"job_location" text NOT NULL,
	"job_role" text NOT NULL,
	"company_id" integer NOT NULL,
	"link" text,
	"work_arrangement" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CandidateInfo" (
	"id" bigint PRIMARY KEY NOT NULL,
	"highest_education" text NOT NULL,
	"study_field" text NOT NULL,
	"most_relevant_experience" text NOT NULL,
	"year_of_experience" integer NOT NULL,
	"gender" "gender" DEFAULT 'male' NOT NULL,
	"birth_date" timestamp NOT NULL,
	"country_of_residence" text NOT NULL,
	"country_of_origin" text NOT NULL,
	"first_language" text NOT NULL,
	"level_of_assessment_language" text,
	"status" "candidate_status" NOT NULL,
	"assessment_id" integer NOT NULL,
	"candidate_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Candidates" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"assessment_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"generated_url" uuid,
	"score" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Candidates_generated_url_unique" UNIQUE("generated_url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MultipleChoicesQuestions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"order" integer DEFAULT 1 NOT NULL,
	"test_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Options" (
	"id" serial PRIMARY KEY NOT NULL,
	"option" text NOT NULL,
	"order" integer DEFAULT 1 NOT NULL,
	"is_correct" boolean DEFAULT false NOT NULL,
	"content" text NOT NULL,
	"question_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"type" text NOT NULL,
	"description" text NOT NULL,
	"duration" bigint DEFAULT 300 NOT NULL,
	"order" integer DEFAULT 1 NOT NULL,
	"assessment_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"duration" bigint DEFAULT 600 NOT NULL,
	"questions_count" integer NOT NULL,
	"generator" text DEFAULT 'ai' NOT NULL,
	"test_type" text NOT NULL,
	"test_level" "test_level" NOT NULL,
	"language" text NOT NULL,
	"is_free" boolean DEFAULT false NOT NULL,
	"description" text NOT NULL,
	"assessments_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answers" ADD CONSTRAINT "Answers_question_id_Questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."Questions"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Options" ADD CONSTRAINT "Options_question_id_MultipleChoicesQuestions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."MultipleChoicesQuestions"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
