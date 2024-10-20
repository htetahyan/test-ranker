import QuizPage from '@/components/assessments/QuizPage';
import Test from '@/components/candidate/test';
import db from '@/db';
import { Assessments, Candidates, Tests } from '@/db/schema/schema';
import { getAllMultipleChoiceAndOptions } from '@/service/assessments.service';
import { getCandidateFromCandidateUniqueIdAndUniqueId, redirectByCandidateStep } from '@/service/candidate.service';
import { main } from '@/service/openai.service'
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'
import { CategoryScale,registerables } from "chart.js";
import "chart.js/auto";

import Chart from "chart.js/auto";
Chart.register(...registerables,CategoryScale );

const page = async({params}:{params:{uniqueId:string,candidate_uniqueId:string}}) => {
  
const assessment = await db.select().from(Assessments).where(eq(Assessments.uniqueId, params.uniqueId))
const test=await db.select().from(Tests).where(eq(Tests.assessmentsId, assessment[0].id))

const candidate = await getCandidateFromCandidateUniqueIdAndUniqueId(params.candidate_uniqueId, params.uniqueId)
    const response=await getAllMultipleChoiceAndOptions({id:test[0].id})
    console.log(response);
    
    const {redirect: routing, url} =  redirectByCandidateStep({ candidate, uniqueId: params.uniqueId, currentPage: 'test' });
  /*   if (routing) redirect(url!); */

  return (
    <div>
      
     <Test response={response} uniqueId={params.uniqueId}  candidate_uniqueId={params.candidate_uniqueId}/>
    </div>
  )
}

export default page
