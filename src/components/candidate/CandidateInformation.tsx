'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import CandidateInfoHead from './CandidateInfoHead'
import CandidateInfoMid from './CandidateInfoMid'
import CandidateInfoFoot from './CandidateInfoFoot'
import CandidateResults from './CandidateResults'

const CandidateInformation = ({candidateId,versionId,assessmentId}:{candidateId:number,versionId:number,assessmentId:number}) => {
  const router=useRouter()
  
  return (
    <div className='p-4 flex flex-col gap-2'>
      <Button onClick={() => router.back()} className='bg-black text-white hover:bg-gray-800 w-fit' >Back</Button>
      <CandidateResults candidateId={candidateId} versionId={versionId}/>
      <CandidateInfoHead candidateId={candidateId}/>
      <CandidateInfoMid candidateId={candidateId}/>
      <CandidateInfoFoot candidateId={candidateId}/>
    </div>
  )
}

export default CandidateInformation
