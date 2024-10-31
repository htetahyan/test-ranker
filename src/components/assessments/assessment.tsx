import React from 'react';
import CandidateList from '@/components/assessments/CandidateList';
import InviteCandidate from '@/components/assessments/InviteCandidate';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaPen } from 'react-icons/fa';

const Assessment = ({ data }:any) => {
  console.log(data?.version,'////')
  return (
    <div className="w-screen min-h-screen bg-gray-50 text-gray-800">
      <div className="flex justify-between items-center p-6 bg-white shadow-sm">
        <Link href="/dashboard">
          <Button 
            startContent={<IoMdArrowRoundBack />} 
            className="bg-black text-white hover:bg-gray-800"
          >
            Back
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900">{data?.assessment?.name}</h1>
          <div className="text-gray-600">
            <p>{data?.assessment?.jobRole}</p>
            <p>{data?.assessment?.jobLocation}</p>
            <p>{data?.assessment?.workArrangement}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            endContent={
              <div className={`w-3 h-3 rounded-full ${data?.version.isPublished ? 'bg-green-500' : 'bg-red-500'}`} />
            }
            variant="solid"
          >
            {!data?.version.isPublished ? 'Published' : 'Draft'}
          </Button>
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
