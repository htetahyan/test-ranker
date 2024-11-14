'use client'
import React from 'react';
import CandidateList from '@/components/assessments/CandidateList';
import InviteCandidate from '@/components/assessments/InviteCandidate';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import BackButton from './BackButton';
import PublishDraftBtn from './PublishDraftBtn';

const Assessment = ({ data, versionId }:any) => {
const currentVersion=data?.version.find((v:any)=>v.id===versionId)
  return (
    <div className="w-screen min-h-screen bg-gray-50 text-gray-800">
      <div className="flex justify-between items-center p-6 bg-white shadow-sm">
      <BackButton  />
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900">{data?.assessment?.name}</h1>
          <div className="text-gray-600">
            <p>{data?.assessment?.jobRole}</p>
            <p>{data?.assessment?.jobLocation}</p>
            <p>{data?.assessment?.workArrangement}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
        <PublishDraftBtn currentVersion={currentVersion}  />
          <Link href={`/assessments/${data?.assessment?.id}/${data?.versionId}/edit/assessment`}>
            <Button isIconOnly className="bg-gray-200 text-gray-700 hover:bg-gray-300" endContent={<FaPen />} />
          </Link>
        </div>
      </div>

      <div className="p-6">
        <InviteCandidate versionId={data?.versionId} version={data?.version} assessment={data?.assessment}/>
        <CandidateList assessmentId={data?.assessment?.id} candidates={data?.candidates} />
      </div>
    </div>
  );
}

export default Assessment;
