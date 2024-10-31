import CandidateInformation from '@/components/candidate/CandidateInformation';
import db from '@/db';
import { CandidateInfo, MultipleChoiceAnswers, MultipleChoicesQuestions } from '@/db/schema/schema';
import {  prepareResume } from '@/service/prepare.service';
import { Accordion, AccordionItem, Badge, Button, Chip, Progress } from '@nextui-org/react';
import { count, eq } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react';

const Page = async (props:{params: Promise<{id:string,candidateId:string,versionId:string}>}) => {
  const params =await props.params;
  const {id,candidateId,versionId}=params;



 

  // Fetch resume and answers
 
  return (
<CandidateInformation  assessmentId={parseInt(id)} candidateId={parseInt(candidateId)} versionId={parseInt(versionId)} />
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

