import CandidateInformation from '@/components/candidate/CandidateInformation';
import db from '@/db';
import { CandidateInfo, MultipleChoiceAnswers, MultipleChoicesQuestions } from '@/db/schema/schema';
import { prepareCandidatePage, prepareResume } from '@/service/prepare.service';
import { Accordion, AccordionItem, Badge, Button, Chip, Progress } from '@nextui-org/react';
import { count, eq } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react';

const Page = async ({ params }: { params: { id: string; candidateId: string } }) => {
  const { id, candidateId } = params;

  // Fetch candidate details
  const {candidate,assessment,candidateInfo,test,questions,resume,answers,files} = await prepareCandidatePage(parseInt(id), parseInt(candidateId));
  console.log(candidate,id,candidateId);
  if (!candidate ) {
    return <CandidateNotFoundModernPage id={id} />;
  }


  // Fetch resume and answers
 
  // Fetch and filter multiple-choice answers
  const multipleChoiceAnswers = await db
    .select()
    .from(MultipleChoiceAnswers)
    .where(eq(MultipleChoiceAnswers.candidateId, candidate?.id!))
  const correctedAnswers = multipleChoiceAnswers?.filter((answer: any) => answer.isCorrect);
  // Calculate score and percentage
  const c= await db.select({count:count()}).from(MultipleChoiceAnswers).where(eq(MultipleChoiceAnswers.candidateId, candidate?.id!))
  console.log(c[0].count,'sss');
  
  const totalQuestions = c?.[0].count || 0;
  const correctAnswers = correctedAnswers?.length || 0;
  const correctPercentage = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return (
<CandidateInformation files={files} answers={answers} resume={resume} candidateInfo={ candidateInfo} totalQuestions={totalQuestions} assessment={assessment} candidate={candidate} questions={questions} correctAnswers={correctAnswers} correctPercentage={correctPercentage} />
  );
};

export default Page;

// Helper Component for Not Found Page
const CandidateNotFoundModernPage = ({ id }: { id: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">Candidate Not Found</h1>
      <p className="text-lg text-gray-600">
        The candidate you are looking for does not exist or has been removed.
      </p>
      <Link href={`/assessments/${id}`}>
        <Button>Back to Assessments</Button>
      </Link>

    </div>
  );
};

// Helper function to get Chip color based on the step

