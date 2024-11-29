import { MyUser } from '@/service/auth.service'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'
import React from 'react'
import { TbFileArrowLeft, TbFileArrowRight } from 'react-icons/tb'
const MultiStepContainer=dynamic(() => import('@/components/multi-step-form/MultiStepContainer'))
const page =async (props:{searchParams: Promise<{url:string}>}) => {
const {url}=await props.searchParams
const user=await MyUser()
if(user) redirect('/dashboard')
  return (<div className='flex justify-center w-screen items-center h-screen'>
<MultiStepContainer /></div>
  )
}

export default page
