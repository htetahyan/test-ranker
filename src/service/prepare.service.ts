import db from "@/db"
import { Answers, Assessments, CandidateInfo, Candidates, File, MultipleChoiceAnswers, MultipleChoicesQuestions, Options, Questions, Resume, Tests, TestsRelations, VersionAndTest } from "@/db/schema/schema"
import { and, asc, eq, sql } from "drizzle-orm"


  
export const prepareResume= db.select().from(Resume).where(eq(Resume.candidateId,sql.placeholder("candidateId")))
.rightJoin(MultipleChoiceAnswers, eq(MultipleChoiceAnswers.candidateId, Resume.candidateId))
.rightJoin(Answers, eq(Answers.candidateId, Resume.candidateId))

.prepare("resumePrepare")

export const prepareMultipleQuestions= db.select().from(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.testId,sql.placeholder("testId"))).orderBy(asc(MultipleChoicesQuestions.order))
.rightJoin(Options, eq(Options.multipleChoicesQuestionId, MultipleChoicesQuestions.id))
.prepare("multipleQuestionsPrepare")
export const prepareOptions= db.select().from(Options).where(eq(Options.multipleChoicesQuestionId,sql.placeholder("multipleChoicesQuestionId"))).prepare("optionsPrepare")