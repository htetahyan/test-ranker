
'use client'
import { useTogglePublishMutation } from '@/quries/BaseQuery'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const PublishBtn = ({versionId,assessmentId}:{versionId:number,assessmentId:number}) => {
    const [mutate,{isLoading}]  =useTogglePublishMutation()
    const router=   useRouter()
     const handlePublish =async()=>{
         const res=await mutate({versionId:versionId,assessmentId:assessmentId,type:'PUBLISH'}
        ).unwrap()
        if(res.message==="success"){
           router.push(`/assessments/${assessmentId}/${versionId}`)}
        
    }
  return (
    <div>
       <Button isLoading={isLoading} onClick={handlePublish} className='w-fit mx-4 bg-black text-white '>Publish!</Button>
       
    </div>
  )
}

export default PublishBtn
