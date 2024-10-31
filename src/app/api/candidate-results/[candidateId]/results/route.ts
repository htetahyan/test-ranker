import db from "@/db";
import { Answers, CandidateInfo, Candidates, MultipleChoiceAnswers, MultipleChoicesQuestions, Questions, Tests, VersionAndTest } from "@/db/schema/schema";
import { main } from "@/service/openai.service";
import { and, count, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, props: { params: Promise<{ candidateId: string}>}) => {
  try {
    const { candidateId } = await props.params;
    const versionId=req.nextUrl.searchParams.get('versionId') as string
    console.log(versionId);
    
    if (!candidateId) return NextResponse.json({ message: "Invalid request " + candidateId }, { status: 400 });
const versionAndTest=await db.select().from(VersionAndTest).where(and(eq(VersionAndTest.versionId,parseInt(versionId)),eq(VersionAndTest.type,'GENERATED'))).then((data) => data[0])
    // Check if the candidate already has a score
  


    const test=await db.select().from(Tests).where(eq(Tests.id,versionAndTest?.testId))
    const desc=test[0].description

    const existingScore = await db
      .select()
      .from(Candidates)
      .where(eq(Candidates.id, parseInt(candidateId)))
      .limit(1);

    // Fetch total multiple-choice answers and calculate correct answers
    const totalMultipleChoiceAnswers = await db
      .select()
      .from(MultipleChoiceAnswers)
      .where(eq(MultipleChoiceAnswers.candidateId, parseInt(candidateId)))
      .fullJoin(MultipleChoicesQuestions, eq(MultipleChoicesQuestions.id, MultipleChoiceAnswers.multipleChoicesQuestionId));

    const totalCorrectMultipleChoiceAnswers = totalMultipleChoiceAnswers.filter(
      (answer) => answer.MultipleChoiceAnswers?.isCorrect
    );

    // Calculate the correct percentage
    const totalQuestions = totalMultipleChoiceAnswers.length; // assuming all answers are for one question each
    const correctPercentage = (totalCorrectMultipleChoiceAnswers.length / totalQuestions) * 100;
const candidateInfo=await db.select().from(CandidateInfo).where(eq(CandidateInfo.candidateId,parseInt(candidateId)))

    let scoreData;

    // Skip score generation if it already exists
    if (existingScore[0]?.score !== null) {
      scoreData = { score: existingScore[0].score };
    } else {
      // Generate new score if it doesn't exist
      const prompt = `Analyze this description: ${desc} and candidate information: ${JSON.stringify(candidateInfo[0])}.
    Compare them  and return the compatibility score of the candidate in this format:
      [{"score":90}]. Please only return the score format. Score must not be decimal and must be between 0 and 100.`;

      const data = await main(prompt);
      scoreData = data[0];

      // Update the candidate's score in the database
      await db
        .update(Candidates)
        .set({ score: scoreData.score })
        .where(eq(Candidates.id, parseInt(candidateId)));
    }

    return NextResponse.json({
    
      data: {
        totalMultipleChoiceQuestions: totalQuestions,
        score: scoreData.score,
        correctPercentage: correctPercentage.toFixed(2) // Rounded to two decimal places for readability
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
};
