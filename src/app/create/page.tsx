import dynamic from 'next/dynamic'
import React from 'react'
import { TbFileArrowLeft, TbFileArrowRight } from 'react-icons/tb'
const MultiStepContainer=dynamic(() => import('@/components/multi-step-form/MultiStepContainer'))
const page =async (props:{searchParams: Promise<{url:string}>}) => {
const {url}=await props.searchParams
  return (<div className='flex justify-center w-screen items-center h-screen'>
<MultiStepContainer /></div>
  )
}

export default page
