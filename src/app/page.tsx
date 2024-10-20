import  AddTest  from '@/components/assessments/AddTest'
import { main } from '@/service/openai.service'
import React from 'react'

const page = async({params}:{params:{id:string}}) => {
  
  return (
    <div>
      <AddTest/>
    </div>
  )
}

export default page
