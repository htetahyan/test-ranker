import db from '@/db'
import { Assessments, Candidates } from '@/db/schema/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

const page = async({params}:{params:{uniqueId:string,candidate_uniqueId:string}}) => {
   
  return (
    <div>
      
    </div>
  )
}

export default page
