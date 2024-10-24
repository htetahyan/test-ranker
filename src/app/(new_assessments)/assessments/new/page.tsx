'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const AddTest=dynamic(()=>import('@/components/assessments/AddTest'),{ssr:false})

const page = () => {

  return (
    <div>
       <AddTest assessments={null} />
      
    </div>
  )
}

export default page
