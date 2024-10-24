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
	"candidate_id" bigint NOT NULL,
	"content" text,
	"type" text DEFAULT 'text' NOT NULL,
	"file_id" bigint,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Assessments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"unique_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"job_location" text NOT NULL,
	"job_role" text NOT NULL,
	"company_id" integer NOT NULL,
	"link" text,
	"versions_id" integer DEFAULT 1,
	"work_arrangement" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Assessments_unique_id_unique" UNIQUE("unique_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CandidateInfo" (
	"id" serial PRIMARY KEY NOT NULL,
	"highest_education" text NOT NULL,
	"study_field" text NOT NULL,
	"most_relevant_experience" text NOT NULL,
	"year_of_experience" integer NOT NULL,
	"gender" text NOT NULL,
	"birth_date" text NOT NULL,
	"country_of_residence" text NOT NULL,
	"country_of_origin" text NOT NULL,
	"first_language" text NOT NULL,
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
	"current_step" text DEFAULT 'intro' NOT NULL,
	"is_signed" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"assessment_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"generated_url" text,
	"score" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "File    " (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"type" text NOT NULL,
	"size" bigint,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MultipleChoiceAnswers" (
	"id" serial PRIMARY KEY NOT NULL,
	"candidate_id" bigint NOT NULL,
	"multiple_choices_question_id" bigint NOT NULL,
	"option_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_correct" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MultipleChoicesQuestions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"type" text NOT NULL,
	"label" text[],
	"data" text[],
	"background" text[],
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
CREATE TABLE IF NOT EXISTS "resume" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"type" text NOT NULL,
	"size" bigint NOT NULL,
	"name" text NOT NULL,
	"candidate_id" bigint NOT NULL,
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
CREATE TABLE IF NOT EXISTS "versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answers" ADD CONSTRAINT "Answers_question_id_Questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."Questions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answers" ADD CONSTRAINT "Answers_candidate_id_Candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."Candidates"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answers" ADD CONSTRAINT "Answers_file_id_File    _id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."File    "("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MultipleChoiceAnswers" ADD CONSTRAINT "MultipleChoiceAnswers_candidate_id_Candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."Candidates"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MultipleChoiceAnswers" ADD CONSTRAINT "MultipleChoiceAnswers_multiple_choices_question_id_MultipleChoicesQuestions_id_fk" FOREIGN KEY ("multiple_choices_question_id") REFERENCES "public"."MultipleChoicesQuestions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MultipleChoiceAnswers" ADD CONSTRAINT "MultipleChoiceAnswers_option_id_Options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."Options"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MultipleChoicesQuestions" ADD CONSTRAINT "MultipleChoicesQuestions_test_id_Tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."Tests"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Options" ADD CONSTRAINT "Options_question_id_MultipleChoicesQuestions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."MultipleChoicesQuestions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume" ADD CONSTRAINT "resume_candidate_id_Candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."Candidates"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
