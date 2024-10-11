// schema.ts 
import { relations } from "drizzle-orm";
import {
    pgTable,
    serial,
    text,
    varchar,
    timestamp,
    integer,
    boolean,
    numeric,
    foreignKey,
    uniqueIndex,
    pgEnum,
    bigint,
    uuid,
} from "drizzle-orm/pg-core";

// --------------------
// 12. Enumerations
// --------------------

// Enum for user roles to enhance data integrity
export const UserRole = pgEnum("user_role", ["Admin", "Company", "Candidate"]);

export const TestLevel = pgEnum("test_level", ["beginner", "intermediate", "advanced"]);
export const Gender= pgEnum("gender", ["male", "female", "other"]);
export const CandidateStatus= pgEnum("candidate_status", ["pending", "accepted", "rejected"]);

// --------------------
// 1. Users Table
// --------------------
export const Users = pgTable("Users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),

    password: text("password").notNull(),
    role: UserRole("role").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
   
});

export const usersRelations = relations(Users, ({ many }) => ({
    Assessments: many(Assessments),
  }));
export const Assessments = pgTable("Assessments", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    uniqueId: text("unique_id").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    jobLocation: text("job_location").notNull(),
    jobRole: text("job_role").notNull(),
    companyId: integer("company_id").notNull(),
    link: text("link"),

    workArrangement: text("work_arrangement").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const AssessmentsRelations = relations(Assessments, ({ one, many }) => ({
    
    Users: one(Users, {
        fields: [Assessments.companyId],
        references: [Users.id],
    }),
    questions: many(Questions),
    Candidates: many(Candidates),
    CandidatesInfo: many(CandidateInfo),
}));

export const Tests= pgTable("Tests", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    duration: bigint("duration",{mode:"number"}).default(600).notNull(),
    questionsCount: integer("questions_count").notNull(),
    generator: text("generator").notNull().default("ai").notNull(),
testType: text("test_type").notNull(),
language: text("language").notNull(),
isFree: boolean("is_free").notNull().default(false).notNull(),
    description: text("description").notNull(),
    assessmentsId: integer("assessments_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const TestsRelations = relations(Tests, ({ one,many }) => ({
    Assessments: one(Assessments, {
        fields: [Tests.assessmentsId],
        references: [Assessments.id],
    }),
   MultipleChoicesQuestions: many(MultipleChoicesQuestions),

  }));



export const CandidateInfo= pgTable("CandidateInfo", {
    id: bigint("id",{mode:"number"}).primaryKey(),
    highestEducation: text("highest_education").notNull(),
    studyField: text("study_field").notNull(),
    mostRelevantExperience: text("most_relevant_experience").notNull(),
    yearOfExperience: integer("year_of_experience").notNull(),
    gender: Gender("gender").default("male").notNull(),
    birthDate: timestamp("birth_date").notNull(),
    countryOfResidence: text("country_of_residence").notNull(),
    countryOfOrigin: text("country_of_origin").notNull(),
    firstLanguage: text("first_language").notNull(),
    levelOfAssessmentLanguage: text("level_of_assessment_language"),
    status: CandidateStatus("status").notNull(),
    assessmentId: integer("assessment_id").notNull(),
    candidateId: integer("candidate_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),


})
export const CandidateInfoRelations = relations(CandidateInfo, ({ one }) => ({
    Assessments: one(Assessments, {
        fields: [CandidateInfo.assessmentId],
        references: [Assessments.id],
    }),
   
  }));

export const Candidates= pgTable("Candidates", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    fullName: text("full_name").notNull(),
    currentStep: text("current_step").notNull().default("intro"),
    isSigned: boolean("is_signed").notNull().default(false).notNull(),

   
assessmentId:integer("assessment_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    generatedUrl: text("generated_url"),
    score: integer("score"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const Questions= pgTable("Questions", {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    type: text("type").notNull(),
    description: text("description").notNull(),
    duration: bigint("duration",{mode:"number"}).default(300).notNull(),
    order: integer("order").notNull().default(1),
    assessmentId: integer("assessment_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const QuestionsRelations = relations(Questions, ({ one }) => ({
    Assessments: one(Assessments, {
        fields: [Questions.assessmentId],
        references: [Assessments.id],
    }),
    
}))
export const MultipleChoicesQuestions= pgTable("MultipleChoicesQuestions", {
    id: serial("id").primaryKey(),
   question: text("question").notNull(),
   order: integer("order").notNull().default(1),
    
    testId: bigint("test_id",{mode:"number"}).notNull()
,
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const MultipleChoicesQuestionsRelations = relations(MultipleChoicesQuestions, ({ one }) => ({
    tests: one(Tests, {
        fields: [MultipleChoicesQuestions.testId],
        references: [Tests.id],
    })
}))
export const CandidatesRelations = relations(Candidates, ({ one }) => ({
    Assessments: one(Assessments, {
        fields: [Candidates.assessmentId],
        references: [Assessments.id],
    })
    
}));

export const Options= pgTable("Options", {
    id: serial("id").primaryKey(),
    option: text("option").notNull(),
    order: integer("order").notNull().default(1),
    isCorrect: boolean("is_correct").notNull().default(false).notNull(),
    content: text("content").notNull(),
    multipleChoicesQuestionId: bigint("question_id",{mode:"number"}).notNull().references(() => MultipleChoicesQuestions.id, { onDelete: "no action", onUpdate: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const Answers= pgTable("Answers", {
    id: serial("id").primaryKey(),
    questionId: bigint("question_id",{mode:"number"}).notNull().references(() => Questions.id, { onDelete: "no action", onUpdate: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    content: text("content").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export type SelectAssessments=typeof Assessments.$inferSelect
export type SelectTests=typeof Tests.$inferSelect
export type SelectCandidates=typeof Candidates.$inferSelect
export type SelectQuestions=typeof Questions.$inferSelect
export type SelectMultipleChoicesQuestions=typeof MultipleChoicesQuestions.$inferSelect
export type SelectOptions=typeof Options.$inferSelect
export type SelectAnswers=typeof Answers.$inferSelect
export type SelectUsers=typeof Users.$inferSelect
