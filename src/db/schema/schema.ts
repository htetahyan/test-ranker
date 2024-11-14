// schema.ts 
import { combineReducers } from "@reduxjs/toolkit";
import { is, relations } from "drizzle-orm";
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
import { version } from "os";
import { sizeInBytes } from "pdf-lib";

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
    provider: text("provider").notNull().default("email"),
    emailVerifToken: text("email_verif_token"),
    emailVerified: boolean("email_verified").notNull().default(false),
    emailTokenSentAt: timestamp("email_token_sent_at"),
picture: text("picture").notNull().default("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"),
    password: text("password").notNull(),
    verificationStatus: text("verification_status").notNull().default("unverified"),
    role: UserRole("role").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
   
});
export const Pricing= pgTable("Pricing", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    priceId: text("price_id").notNull(),
    customerId: text("customer_id"),
    subscriptionId: text("subscription_id"),
    email: text("email"),
    status: text("status").notNull().default("active"),
    startDate: timestamp("start_date").notNull(),
    isCancled: boolean("is_canceled").notNull().default(false),
    totalAssessments: integer("total_assessment").notNull().default(1),
    totalCandidates: integer("total_candidates").notNull().default(1),
    endDate: timestamp("end_date").notNull(),
    nextBillDate: timestamp("next_bill_date").notNull(),
    amount: text("amount"),
    paymentMethod: text("payment_method").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),

})
export const pricingRelations = relations(Pricing, ({ one }) => ({
    Users: one(Users, {
        fields: [Pricing.userId],
        references: [Users.id],
    }),
}));

export const usersRelations = relations(Users, ({ many }) => ({
    Assessments: many(Assessments),
    Pricing: many(Pricing),
  }));
export const Assessments = pgTable("Assessments", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    jobRole: text("job_role").notNull(),
    companyId: integer("company_id").notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const AssessmentsRelations = relations(Assessments, ({ one, many }) => ({
    
    Users: one(Users, {
        fields: [Assessments.companyId],
        references: [Users.id],
    }),
    versions: many(versions),
 
}));
export const versions = pgTable("versions", {
    id: serial("id").primaryKey(),
    assessmentId: integer("assessment_id").default(1).notNull(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    uniqueId: text("unique_id").unique(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const versionsRelations = relations(versions, ({ many ,one }) => ({
 
    Questions: many(Questions),
    assessment: one(Assessments, {
        fields: [versions.assessmentId],
        references: [Assessments.id],
    })

}))
export const Tests= pgTable("Tests", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    duration: bigint("duration",{mode:"number"}).default(600).notNull(),
    questionsCount: integer("questions_count").notNull(),
    generator: text("generator").notNull().default("ai").notNull(),
    
testType: text("test_type").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const VersionAndTest= pgTable("VersionAndTest", {
    id: serial("id").primaryKey(),
    testId: integer("test_id").notNull().references(() => Tests.id, { onDelete: "cascade", onUpdate: "cascade" }),
    versionId: integer("version_id").notNull().references(() => versions.id, { onDelete: "cascade", onUpdate: "cascade" }),
    type:text("type").default("GENERATED").notNull(),
    assessmentId: integer("assessment_id").notNull().references(() => Assessments.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    order: integer("order").notNull().default(1),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const TestsRelations = relations(Tests, ({ one,many }) => ({

   MultipleChoicesQuestions: many(MultipleChoicesQuestions),

  
  
 
  

   

  }));



export const CandidateInfo= pgTable("CandidateInfo", {
    id: serial("id").primaryKey(),
    highestEducation: text("highest_education").notNull(),
    studyField: text("study_field").notNull(),
    mostRelevantExperience: text("most_relevant_experience").notNull(),
    yearOfExperience: integer("year_of_experience").notNull(),
    gender: text('gender').notNull(),
    birthDate: text("birth_date").notNull(),
    countryOfResidence: text("country_of_residence").notNull(),
    countryOfOrigin: text("country_of_origin").notNull(),
    versionId: integer("version_id").default(1).notNull(),
    ip: text("ip"),
    browser: text("browser"),
    location: text("location"),
    device: text("device"),
    os: text("os"),
    cpu: text("cpu"),
    firstLanguage: text("first_language").notNull(),
    candidateId: integer("candidate_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    
})


export const Candidates= pgTable("Candidates", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    fullName: text("full_name").notNull(),
    currentStep: text("current_step").notNull().default("intro"),
    isSigned: boolean("is_signed").notNull().default(false).notNull(),
    status: text("status").notNull().default("pending"),
    companyId: integer("company_id"),

   
versionId: integer("version_id").default(1).notNull(),
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
    versionId: integer("version_id").default(1).notNull(),
    order: integer("order").notNull().default(1),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const QuestionsRelations = relations(Questions, ({ one }) => ({
 version: one(versions, {
        fields: [Questions.versionId],
        references: [versions.id],
    })
    
}))
export const MultipleChoicesQuestions = pgTable("MultipleChoicesQuestions", {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    description: text("description").notNull().default(""),
    type: text("type").notNull(),
    label: text("label").array(),
    data: text("data").array(),
    background: text("background").array(),
    order: integer("order").notNull().default(1),
    testId: bigint("test_id", { mode: "number" }).notNull(),
    testType: text("test_type").notNull(),  // Specify if it's "Tests" or "customTests"
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const MultipleChoicesQuestionsRelations = relations(MultipleChoicesQuestions, ({ one }) => ({
    Tests: one(Tests, {
        fields: [MultipleChoicesQuestions.testId],
        relationName: "MultipleChoicesAndTests",
        references: [Tests.id],
    }),

}));


export const CandidatesRelations = relations(Candidates, ({ one }) => ({
   
  version: one(versions, {
    fields: [Candidates.versionId],
    references: [versions.id],
  })  ,company:one(Users,{fields:[Candidates.companyId],references:[Users.id]})
}));

export const Options= pgTable("Options", {
    id: serial("id").primaryKey(),
    option: text("option").notNull(),
    order: integer("order").notNull().default(1),
    isCorrect: boolean("is_correct").notNull().default(false).notNull(),
    content: text("content").notNull(),
    multipleChoicesQuestionId: bigint("question_id",{mode:"number"}).notNull().references(() => MultipleChoicesQuestions.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const Answers= pgTable("Answers", {
    id: serial("id").primaryKey(),
    questionId: bigint("question_id",{mode:"number"}).notNull().references(() => Questions.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    candidateId: bigint("candidate_id",{mode:"number"}).notNull().references(() => Candidates.id, { onDelete: "cascade", onUpdate: "cascade" }),
    content: text("content"),
    type: text("type").default("text").notNull(),
    fileId: bigint("file_id",{mode:"number"}).references(() => File.id, { onDelete: "cascade", onUpdate: "cascade" }),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});
export const File= pgTable("File    ", {
    id: serial("id").primaryKey(),
    url: text("url").notNull(),
    type: text("type").notNull(),
    size: bigint("size",{mode:"number"}),
    
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
export const Resume= pgTable("resume", {
    id: serial("id").primaryKey(),
    url: text("url").notNull(),
    type: text("type").notNull(),
    size: bigint("size",{mode:"number"}).notNull(),
    name: text("name").notNull(),
    candidateId: bigint("candidate_id",{mode:"number"}).notNull().references(() => Candidates.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
export const MultipleChoiceAnswers= pgTable("MultipleChoiceAnswers", {
    id: serial("id").primaryKey(),
    candidateId: bigint("candidate_id",{mode:"number"}).notNull().references(() => Candidates.id, { onDelete: "cascade", onUpdate: "cascade" }),
    multipleChoicesQuestionId: bigint("multiple_choices_question_id",{mode:"number"}).notNull().references(() => MultipleChoicesQuestions.id, { onDelete: "cascade", onUpdate: "cascade" }),
    optionId: bigint("option_id",{mode:"number"}).notNull().references(() => Options.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    isCorrect: boolean("is_correct").notNull().default(false).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const SessionData= pgTable("SessionData", {
    id: serial("id").primaryKey(),
    assessmentName: text("assessment_name").notNull(),
    jobRole: text("job_role").notNull(),
    url: text("url"),
    generateBy:text('generateBy').notNull(),
    description: text("description"),
    questionCount: integer("question_count").notNull(),
    sessionId: text("session_id").notNull(),
    duration: integer("duration").notNull(),
})
export type SelectAssessments=typeof Assessments.$inferSelect
export type SelectTests=typeof Tests.$inferSelect
export type SelectCandidates=typeof Candidates.$inferSelect
export type SelectCandidatesInfo=typeof CandidateInfo.$inferSelect
export type SelectFile=typeof File.$inferSelect
export type SelectResume=typeof Resume.$inferSelect
export type SelectQuestions=typeof Questions.$inferSelect
export type SelectMultipleChoicesQuestions=typeof MultipleChoicesQuestions.$inferSelect
export type SelectOptions=typeof Options.$inferSelect
export type SelectAnswers=typeof Answers.$inferSelect
export type SelectUsers=typeof Users.$inferSelect
export type SelectVersions=typeof versions.$inferSelect
export type SelectMultipleChoiceAnswers=typeof MultipleChoiceAnswers.$inferSelect
export type SelectSessionData=typeof SessionData.$inferSelect
export type SelectPricing=typeof Pricing.$inferSelect