import Sign from '@/components/candidate/Sign';
import db from '@/db';
import { Candidates, SelectCandidates } from '@/db/schema/schema';
import { getCandidateFromCandidateUniqueIdAndUniqueId, redirectByCandidateStep } from '@/service/candidate.service';
import { Input } from '@nextui-org/react';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import React from 'react';


const HonestyAgreementPage = async (props:{params: Promise<{uniqueId:string,candidate_uniqueId:string}>}) => {
  const params = await props.params;
  const candidate = await getCandidateFromCandidateUniqueIdAndUniqueId(params.candidate_uniqueId, params.uniqueId);
  console.log(candidate);

  if(!candidate) <>wrong link</>
  const {redirect: routing, url} =  redirectByCandidateStep({ candidate, uniqueId: params.uniqueId, currentPage: 'sign' });
  console.log(routing,url);

  if (routing) redirect(url!);



  return (
    <div className="container mx-auto px-4 py-8">
   <Sign candidate={candidate} uniqueId={params.uniqueId}/>
    </div>
  );
};

export default HonestyAgreementPage;

