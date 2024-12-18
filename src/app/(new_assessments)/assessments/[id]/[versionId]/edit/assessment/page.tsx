import React from 'react'
import  AddTest  from '@/components/assessments/AddTest'
import db from '@/db'
import { Assessments } from '@/db/schema/schema'
import { eq } from 'drizzle-orm'

const page = async (props:{params: Promise<{id:string}>}) => {
  const params = await props.params;
  const assessment = await db.select().from(Assessments).where(eq(Assessments.id, parseInt(params.id)))
  return (
    <div>
       <AddTest assessments={assessment[0]!}/>
    </div>
  )
}

export default page
