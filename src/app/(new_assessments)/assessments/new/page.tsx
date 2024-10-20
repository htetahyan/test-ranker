import AddTest from '@/components/assessments/AddTest'
import { SelectAssessments } from '@/db/schema/schema'
import React from 'react'

const page = () => {
const assessment:any=null
  return (
    <div>
       <AddTest assessments={assessment} />
      
    </div>
  )
}

export default page
