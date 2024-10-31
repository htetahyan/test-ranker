import CandidateInfoForm from '@/components/candidate/InfoForm'
import IntroForm from '@/components/candidate/IntroForm'
import db from '@/db'
import { Assessments, Candidates, VersionAndTest, versions } from '@/db/schema/schema'
import { getCandidateFromCandidateUniqueIdAndUniqueId, redirectByCandidateStep } from '@/service/candidate.service'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { parse } from 'path'
import React from 'react'

export default async function page(props:{params: Promise<{uniqueId:string,candidate_uniqueId:string}>}) {
  const params = await props.params;
  const version=await db.select().from(versions).where(eq(versions.uniqueId,params.uniqueId)).then((data) => data[0])
  const candidate = await getCandidateFromCandidateUniqueIdAndUniqueId(params.candidate_uniqueId, params.uniqueId);
  console.log(candidate);

  const {redirect: routing, url} =  redirectByCandidateStep({ candidate: candidate, uniqueId: params.uniqueId, currentPage: 'info' });
  if (routing) redirect(url!);
  return (
    <div>
      <CandidateInfoForm versionId={version?.id}  candidate={candidate}/>
    </div>
  )
}
