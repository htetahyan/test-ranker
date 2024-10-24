import  AddTest  from '@/components/assessments/AddTest'
import { main } from '@/service/openai.service'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async(props:{params:Promise<{id:string}>}) => {
 redirect('/dashboard')
  return (
    <div>
     
    </div>
  )
}

export default page
