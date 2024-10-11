import QuizPage from '@/components/assessments/QuizPage';
import Test from '@/components/candidate/test';
import db from '@/db';
import { Assessments, Tests } from '@/db/schema/schema';
import { getAllMultipleChoiceAndOptions } from '@/service/assessments.service';
import { main } from '@/service/openai.service'
import { eq } from 'drizzle-orm';
import React from 'react'

const page = async({params}:{params:{uniqueId:string,candidate_uniqueId:string}}) => {
  
const assessment = await db.select().from(Assessments).where(eq(Assessments.uniqueId, params.uniqueId))
const test=await db.select().from(Tests).where(eq(Tests.assessmentsId, assessment[0].id))
    const response=await getAllMultipleChoiceAndOptions({id:test[0].id})
console.log(response);

  return (
    <div>
      
     <Test response={response} uniqueId={params.uniqueId}  candidate_uniqueId={params.candidate_uniqueId}/>
    </div>
  )
}

export default page
