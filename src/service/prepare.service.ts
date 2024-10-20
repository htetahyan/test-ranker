import db from "@/db"
import { Answers, Assessments, CandidateInfo, Candidates, File, MultipleChoiceAnswers, MultipleChoicesQuestions, Options, Questions, Resume, Tests, TestsRelations } from "@/db/schema/schema"
import { and, asc, eq, sql } from "drizzle-orm"

export const prepareCandidatePage = async (assessmentId: number, candidateId: number) => {
    const [candidate, assessment, candidateInfo, test, resume] = await Promise.all([
      db.select().from(Candidates).where(eq(Candidates.id, candidateId)).then((data) => data[0]),
      db.select().from(Assessments).where(eq(Assessments.id, assessmentId)).then((data) => data[0]),
      db.select().from(CandidateInfo).where(eq(CandidateInfo.candidateId, candidateId)).then((data) => data[0]),
      db.select().from(Tests).where(eq(Tests.assessmentsId, assessmentId)).then((data) => data[0]),
      db.select().from(Resume).where(eq(Resume.candidateId, candidateId)).then((data) => data[0]),
    ]);
  
    const questions = await db.select().from(Questions).where(eq(Questions.assessmentId, test.assessmentsId));
  
    const answers = await Promise.all(
      questions.map(async (question) =>
        db
          .select()
          .from(Answers)
          .where(and(eq(Answers.candidateId, candidateId), eq(Answers.questionId, question.id)))
          .then((data) => data[0])
      )
    
    );
    const files=await Promise.all(answers.map(async (answer)=>db.select().from(File).where(eq(File.id,answer!.fileId??0)).then((data)=>data[0])))
  
    return { candidate, assessment, candidateInfo, test, questions, resume, answers, files };
  };
  
export const prepareResume= db.select().from(Resume).where(eq(Resume.candidateId,sql.placeholder("candidateId")))
.rightJoin(MultipleChoiceAnswers, eq(MultipleChoiceAnswers.candidateId, Resume.candidateId))
.rightJoin(Answers, eq(Answers.candidateId, Resume.candidateId))

.prepare("resumePrepare")

    export const prepareTest= db.select().from(Tests).where(eq(Tests.assessmentsId,sql.placeholder("assessmentId"))).prepare("testByIdPrepare")
export const prepareMultipleQuestions= db.select().from(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.testId,sql.placeholder("testId"))).orderBy(asc(MultipleChoicesQuestions.order))
.rightJoin(Options, eq(Options.multipleChoicesQuestionId, MultipleChoicesQuestions.id))
.prepare("multipleQuestionsPrepare")
export const prepareOptions= db.select().from(Options).where(eq(Options.multipleChoicesQuestionId,sql.placeholder("multipleChoicesQuestionId"))).prepare("optionsPrepare")