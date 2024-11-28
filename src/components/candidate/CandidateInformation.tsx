'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import CandidateInfoHead from './CandidateInfoHead'
import CandidateInfoMid from './CandidateInfoMid'
import CandidateInfoFoot from './CandidateInfoFoot'
import CandidateResults from './CandidateResults'
import { useDeleteCandidateAndResultsMutation } from '@/quries/CandidateResultQuery'
import { FaTrash } from 'react-icons/fa'

const CandidateInformation = ({candidateId,versionId,assessmentId}:{candidateId:number,versionId:number,assessmentId:number}) => {
  const router=useRouter()
  const [deleteCandidate,{isLoading}]=useDeleteCandidateAndResultsMutation()
  const handleDelete=async()=>{
    await deleteCandidate(candidateId).unwrap().then(()=> router.push(`/assessments/${assessmentId}/${versionId}`))
  }
  return (
    <div className='p-4 flex flex-col gap-2'>
     <div className='flex justify-between items-center w-full'> <Button onClick={() => router.back()} className='bg-black text-white hover:bg-gray-800 w-fit' >Back</Button>
     <Button onClick={handleDelete} isLoading={isLoading}  color='danger' startContent={<FaTrash />} className=' text-white hover:bg-red-800 w-fit' >Delete</Button>
     </div>
      <CandidateResults candidateId={candidateId} versionId={versionId}/>
      <CandidateInfoHead candidateId={candidateId}/>
      <CandidateInfoMid candidateId={candidateId}/>
      <CandidateInfoFoot candidateId={candidateId}/>
    </div>
  )
}

export default CandidateInformation
