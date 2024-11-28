import CircularSteps from '@/components/assessments/CircularSteps'
import { Button } from '@nextui-org/react'
import React from 'react'
import MyQuestions from '@/components/questions/MyQuestions'
import EditQuestions from '@/components/questions/EditQuestions'
import Link from 'next/link'
import PublishBtn from './PublishBtn'
import { versions } from '@/db/schema/schema'
import db from '@/db'
import { eq } from 'drizzle-orm'

const page = async (props:{params: Promise<{id:string,versionId:string}>}) => {
  const params = await props.params;
  const currentVersion = await db.select().from(versions).where(eq(versions.id, parseInt(params.versionId))).then((data) => data[0]);
  if(currentVersion?.isPublished) return <div>Cannot be edited!</div>
  return (
    <div className='w-screen min-h-screen bg-gray-100'>
            <div className='flex justify-start w-full '><Link href={`/assessments/${params.id}/${params.versionId}/edit/tests`} ><Button className='w-fit mx-4  '>Back</Button></Link></div>
<CircularSteps currentStep={3}/>
   <EditQuestions  versionId={parseInt(params.versionId)} assessmentId={Number(params.id)}/>
  <div className='flex justify-end w-full '>
  <PublishBtn versionId={Number(params.versionId)} assessmentId={Number(params.id)} />
    </div>
    </div>
  )
}

export default page
