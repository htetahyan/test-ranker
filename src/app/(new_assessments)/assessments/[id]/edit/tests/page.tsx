import { getTestAndQuestions, getTestsFromAssessmentId } from '@/service/assessments.service';
import React from 'react';
import TestList from '@/components/tests/TestLists';
import { MultipleChoicesQuestions, SelectAssessments, SelectTests } from '@/db/schema/schema';
import GenerateTestWithAi from '@/components/assessments/GenerateTestWithAi';
import { Button, Skeleton, Spinner } from '@nextui-org/react';
import CircularSteps from '@/components/assessments/CircularSteps';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import MultipleChoicesContainer from '@/components/multipleChoice/MultipleChoicesContainer';
import { FaPlusCircle } from 'react-icons/fa';
import BackButton from '@/components/assessments/BackButton';
import TestDragNDrop from '@/components/assessments/TestDragNDrop';
import { asc, eq } from 'drizzle-orm';
import db from '@/db';


const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    throw new Error("Please provide an id");
  }

  const data = await getTestsFromAssessmentId({ assessmentId: parseInt(params.id) }) as { tests: SelectTests, assessment: SelectAssessments[] };

  
  if (!data) return <div>404</div>;
  console.log(data,'[[[');
  
const multipleChoiceQuestions=  await db.select().from(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.testId, data?.tests?.id)).orderBy(asc(MultipleChoicesQuestions.order)) 
console.log(multipleChoiceQuestions,'multipleChoiceQuestions');

  return (
    <div className='w-screen p-4 flex flex-col items-center relative overflow-x-hidden'>
     {/*  <div className='flex justify-start w-full'>
        <BackButton id={parseInt(params!.id)}/>
      </div> */}
      <div className='flex items-center justify-between gap-2 p-4 w-full'>

        <div>
          <h1 className='text-5xl font-bold'>{data?.assessment?.[0]?.name}</h1>
          <p className='text-gray-500'>{data?.assessment?.[0]?.jobRole}</p>
          <p className='text-gray-500'>{data?.assessment?.[0]?.jobLocation}</p>
        </div>

        <TestDragNDrop data={multipleChoiceQuestions} />

      </div>
      <CircularSteps currentStep={2} />
    
      <MultipleChoicesContainer  id={parseInt(params!.id)}  />
      
    </div>
  );
}

export default page;
