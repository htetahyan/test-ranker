'use client'
import db from '@/db'
import { Assessments, SessionData, versions } from '@/db/schema/schema'
import { generateMultipleChoiceQuestions } from '@/service/assessments.service'
import { currentUser } from '@/service/auth.service'
import { Button } from '@nextui-org/react'

import { Skeleton } from '@nextui-org/react'
import React from 'react'

import {  useParams, useRouter } from 'next/navigation'
import { usePostSessionMutation } from '@/quries/AccoutQuery'
const Page =  () => {
  

    const {sessionId} = useParams<{ sessionId: string }>()
const [mutate,{isLoading}]=usePostSessionMutation()
const router=useRouter()
const submit=async()=>{
  const res=await mutate({sessionId}).unwrap()
  if(res?.redirect) router.push(res?.redirect)
}
  return (
    <div className='flex  flex-col justify-center w-[90vw] items-center h-screen'>
     {isLoading &&  <Skeleton className='w-1/2 h-1/2' />}
      <Button isLoading={isLoading} className='bg-black text-white' onClick={submit}  >Generate your tests</Button>
    </div>
  )
}

export default Page
