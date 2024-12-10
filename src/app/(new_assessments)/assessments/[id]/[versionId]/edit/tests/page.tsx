import { getTestAndQuestions, getTestsFromAssessmentId } from '@/service/assessments.service';
import React from 'react';
import TestList from '@/components/tests/TestLists';
import { MultipleChoicesQuestions, SelectAssessments, SelectTests, versions } from '@/db/schema/schema';
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
import SaveAsDraftBtn from './SaveAsDraftBtn';


const page = async (props: { params: Promise< { id: string,versionId: string }> }) => {
  const { id,versionId } = await props.params;

  if (!id || !versionId) {
    throw new Error("Please provide an id");
  }

  const data = await getTestsFromAssessmentId({ assessmentId: parseInt(id),versionId:parseInt(versionId) }) as { tests: any, assessment: SelectAssessments[] };
  const currentVersion = await db.select().from(versions).where(eq(versions.id, parseInt(versionId))).then((data) => data[0]);
  if(currentVersion?.isPublished) return <div>Cannot be edited!</div>
  if (!data) return <div>404</div>;
  console.log(data,'[[[');
  
const multipleChoiceQuestions= data?.tests?.id ?  await db.select().from(MultipleChoicesQuestions).where(eq(MultipleChoicesQuestions.testId, data?.tests?.id)).orderBy(asc(MultipleChoicesQuestions.order)):[] 
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
        </div>
      <div className='flex items-center gap-4 '> <SaveAsDraftBtn versionId={parseInt(versionId)} assessmentId={parseInt(id)} />

        <TestDragNDrop  data={multipleChoiceQuestions} />
        </div> 
      </div>
      <p className='text-sm text-red-500'>
    Sometimes    You might need to refresh for fully loaded all tests after generated!
      </p>
      <CircularSteps currentStep={2} />
    
      <MultipleChoicesContainer  id={parseInt(id)} versionId={parseInt(versionId)}  />

    </div>
  );
}

export default page;
