import Question from '@/components/candidate/question'
import db from '@/db'
import { Candidates, Questions, versions } from '@/db/schema/schema'
import { getCandidateFromCandidateUniqueIdAndUniqueId, redirectByCandidateStep } from '@/service/candidate.service'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async (
  props:{params: Promise<{questionId:string,uniqueId:string,candidate_uniqueId:string}>}
) => {
  const params = await props.params;
  const questionId=Number(params.questionId)
  
const version=await db.select().from(versions).where(eq(versions.uniqueId,params.uniqueId)).then((data) => data[0])
  const question=await db.select().from(Questions).where(and(eq(Questions.versionId,version?.id),eq(Questions.order, questionId))).then((data) => data[0])
  if(!question) redirect(`/candidate/${params.uniqueId}/${params.candidate_uniqueId}/info`)
  if(!question || !params.candidate_uniqueId) redirect(`/candidate/${params.uniqueId}/${params.candidate_uniqueId}/info`)

  const candidate = await getCandidateFromCandidateUniqueIdAndUniqueId(params.candidate_uniqueId, params.uniqueId)
  const {redirect: routing, url} =  redirectByCandidateStep({ candidate, uniqueId: params.uniqueId, currentPage: 'questions' });
  /*   if (routing) redirect(url!); */
  return (
    <div>
      <Question questions={question} candidateUniqueId={params.candidate_uniqueId} uniqueId={params.uniqueId} />
    </div>
  )
}

export default page
