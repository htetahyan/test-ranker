import IntroForm from '@/components/candidate/IntroForm'
import db from '@/db'
import { Assessments } from '@/db/schema/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

const page = async({params}:{params:{uniqueId:string}}) => {
  const {uniqueId}=params
  const assessment= await db.select().from(Assessments).where(eq(Assessments.uniqueId,uniqueId))
  if(!assessment[0]) return <div>404</div>

    
  return (
    <div>
      <IntroForm assessment={assessment[0]}/>
    </div>
  )
}

export default page
