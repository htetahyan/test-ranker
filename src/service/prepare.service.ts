import db from "@/db"
import { MultipleChoicesQuestions, Options, Tests } from "@/db/schema/schema"
import { asc, eq, sql } from "drizzle-orm"


    export const prepareTest= db.select().from(Tests).where(eq(Tests.assessmentsId,sql.placeholder("assessmentId"))).prepare("testByIdPrepare")
export const prepareMultipleQuestions= db.select().from(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.testId,sql.placeholder("testId"))).orderBy(asc(MultipleChoicesQuestions.order))
.rightJoin(Options, eq(Options.multipleChoicesQuestionId, MultipleChoicesQuestions.id))
.prepare("multipleQuestionsPrepare")
export const prepareOptions= db.select().from(Options).where(eq(Options.multipleChoicesQuestionId,sql.placeholder("multipleChoicesQuestionId"))).prepare("optionsPrepare")