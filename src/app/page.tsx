import  AddTest  from '@/components/assessments/AddTest'
import { main } from '@/service/openai.service'
import React from 'react'

const page = async() => {
  return (
    <div>
      <AddTest/>
    </div>
  )
}

export default page
