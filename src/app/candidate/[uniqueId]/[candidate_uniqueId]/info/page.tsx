import CandidateInfoForm from '@/components/candidate/InfoForm'
import IntroForm from '@/components/candidate/IntroForm'
import db from '@/db'
import { Assessments, Candidates } from '@/db/schema/schema'
import { getCandidateFromCandidateUniqueIdAndUniqueId, redirectByCandidateStep } from '@/service/candidate.service'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { parse } from 'path'
import React from 'react'

export default async function page({params}:{params:{uniqueId:string,candidate_uniqueId:string}}) {
  const assessment=await db.select().from(Assessments).where(eq(Assessments.uniqueId, params.uniqueId))
  const candidate = await getCandidateFromCandidateUniqueIdAndUniqueId(params.candidate_uniqueId, params.uniqueId);
console.log(candidate);

  const {redirect: routing, url} =  redirectByCandidateStep({ candidate: candidate, uniqueId: params.uniqueId, currentPage: 'info' });
 if (routing) redirect(url!);
  return (
    <div>
      <CandidateInfoForm assessment={assessment[0]} candidate={candidate}/>
    </div>
  )
}
