import db from '@/db'
import { Assessments, SessionData, versions } from '@/db/schema/schema'
import { generateMultipleChoiceQuestions } from '@/service/assessments.service'
import { currentUser } from '@/service/auth.service'
import { Button } from '@nextui-org/react'
import { eq } from 'drizzle-orm'
import { Skeleton } from '@nextui-org/react'
import React from 'react'
import {v4 as uuidv4} from 'uuid'
import { redirect } from 'next/navigation'
const page = async(props: { params: Promise<{ sessionId: string }> }) => {
    const { sessionId } = await props.params

    const user=await currentUser()
    const sessionData=await db.select().from(SessionData).where(eq(SessionData.sessionId,sessionId))
    if(sessionData.length===0) redirect  ('/dashboard/assessments')
    const generateAssessment=async()=>{
      'use server'
    
      const assessment=await db.insert(Assessments).values({
      name:sessionData[0].assessmentName,
   
      jobRole:sessionData[0].jobRole,
     companyId:user?.id as number,
    
    }) .returning()  
    const version=await db.insert(versions).values({assessmentId:assessment[0].id,name:'default',isPublished:false,uniqueId:uuidv4()}).returning({id:versions.id})

   await generateMultipleChoiceQuestions({assessment:assessment[0],versionId:version[0].id,content:sessionData[0]!.description!,questionsCount:sessionData[0].questionCount,duration:sessionData[0].duration,type:sessionData[0].generateBy,url:sessionData[0].url!})

      await db.delete(SessionData).where(eq(SessionData.sessionId,sessionId))
      redirect(`/assessments/${assessment[0].id}/${version[0].id}/edit/tests`)
      }
    await generateAssessment()
  return (
    <div className='flex justify-center w-screen items-center h-screen'>
      <Skeleton className='w-1/2 h-1/2' />
      <Button isLoading={true}  >generating...</Button>
    </div>
  )
}

export default page
