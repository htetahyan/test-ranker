import QuizPage from '@/components/assessments/QuizPage';
import Test from '@/components/candidate/test';
import db from '@/db';
import { Assessments, Candidates, Tests, VersionAndTest, versions } from '@/db/schema/schema';
import { getAllMultipleChoiceAndOptions } from '@/service/assessments.service';
import { getCandidateFromCandidateUniqueIdAndUniqueId, redirectByCandidateStep } from '@/service/candidate.service';
import { main } from '@/service/openai.service'
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'
import { CategoryScale,registerables,ArcElement } from "chart.js";
import "chart.js/auto";

import Chart from "chart.js/auto";
Chart.register(...registerables,CategoryScale,ArcElement );

const page = async (props:{params: Promise<{uniqueId:string,candidate_uniqueId:string,order:string}>}) => {
  const params = await props.params;

const version=await db.select().from(versions).where(eq(versions.uniqueId,params.uniqueId)).then((data) => data[0])
const versionAndTest=await db.select().from(VersionAndTest).where(and(eq(VersionAndTest.assessmentId,version?.assessmentId),eq(VersionAndTest.versionId,version?.id),eq(VersionAndTest.order,parseInt(params.order)))).then((data) => data[0])
if(!versionAndTest) redirect('/candidate/'+params.uniqueId+'/'+params.candidate_uniqueId+'/questions/1')

const candidate = await getCandidateFromCandidateUniqueIdAndUniqueId(params.candidate_uniqueId, params.uniqueId)
  const response=await getAllMultipleChoiceAndOptions({id:versionAndTest?.testId})
 const test= await db.select().from(Tests).where(eq(Tests.id,versionAndTest?.testId)).then((data) => data[0])
  const {redirect: routing, url} =  redirectByCandidateStep({ candidate, uniqueId: params.uniqueId, currentPage: 'test' });
  /*   if (routing) redirect(url!); */

  return (
    <div>
      
     <Test order={parseInt(params.order)} test={test} response={response} uniqueId={params.uniqueId}  candidate_uniqueId={params.candidate_uniqueId}/>
    </div>
  )
}

export default page
