import CircularSteps from '@/components/assessments/CircularSteps'
import TestList from '@/components/tests/TestLists'
import db from '@/db'
import { Assessments } from '@/db/schema/schema'
import { getCustomTests } from '@/service/test.service'
import { eq } from 'drizzle-orm'
import React from 'react'
import Link from "next/link";
import {Button} from "@nextui-org/react";

const page = async(props:{params:{id:string,versionId:string}}) => {
    const {id,versionId}=await props.params
    const customTests=await getCustomTests()
   
    const assessments=await db.select().from(Assessments).where(eq(Assessments.id,parseInt(id))).then(res=>res[0])
  return (
    <div className='w-screen p-4 flex flex-col items-center relative overflow-x-hidden'>
    {/*  <div className='flex justify-start w-full'>
       <BackButton id={parseInt(params!.id)}/>
     </div> */}
     <div className='flex items-center justify-between gap-2 p-4 w-full'>

       <div>
         <h1 className='text-5xl font-bold'>{assessments.name}</h1>
         <p className='text-gray-500'>{assessments?.jobRole}</p>
       </div>

{/*         <TestDragNDrop data={multipleChoiceQuestions} />
*/}
     </div>
     <CircularSteps currentStep={2} />
     <TestList isAdmin={false} versionId={parseInt(versionId)} assessmentId={parseInt(id)} tests={customTests} />

        <div className={'h-[10vh] fixed bottom-0 items-center flex justify-end w-full bg-gray-200 px-4'}><Link href={`/assessments/${id}/${versionId}/edit/questions`}><Button
   className={'bg-black text-white'}
   >next</Button></Link>
    </div>
    </div>
  )
}

export default page
