import IntroForm from '@/components/candidate/IntroForm'
import db from '@/db'
import { Assessments, versions } from '@/db/schema/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

const page = async (props:{params: Promise<{uniqueId:string}>}) => {
  const params = await props.params;
  const {uniqueId}=params
const version=await db.select().from(versions).where(eq(versions.uniqueId,uniqueId)).then((data) => data[0]) 

  const assessment=await db.select().from(Assessments).where(eq(Assessments.id,version?.assessmentId)).then((data) => data[0])
  if(!assessment) return<div>Assessment not found</div>
if(!version.isPublished) return <div>This Assessment is not published or no longer accept new candidates</div>

  return (
    <div>
      <IntroForm assessment={assessment} version={version}/>
    </div>
  )
}

export default page
