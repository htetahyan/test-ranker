'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { RiDraftLine } from 'react-icons/ri'

const SaveAsDraftBtn = ({versionId,assessmentId}:{versionId:number,assessmentId:number}) => {
  const router=useRouter()
  const saveAsDraft=()=>{
    router.push(`/assessments/${assessmentId}/${versionId}`)
  }
  return (
    <div>
      <Button onClick={saveAsDraft}  className='bg-black text-white' startContent={<RiDraftLine />}>Save as draft</Button>
    </div>
  )
}

export default SaveAsDraftBtn
