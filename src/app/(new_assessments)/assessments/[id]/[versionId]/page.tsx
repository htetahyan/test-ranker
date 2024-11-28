import { getAssesssmentRelatedInfo } from '@/service/assessments.service'
import { currentUser, getCurrentPricing } from '@/service/auth.service';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
const Assessment=dynamic(()=>import('@/components/assessments/assessment'))
import React from 'react'
const page = async (props:{params: Promise<{id:string,versionId:string}>}) => {
  const params = await props.params;
  const user=await currentUser()
  if(!user)  redirect('/account')
    const pricing=await getCurrentPricing()
  const data=await getAssesssmentRelatedInfo({versionId:parseInt(params.versionId),assessmentId:parseInt(params.id),userId:user?.id!})

  if(!data)  return <div>404</div>


  return (
    <Assessment isFree={pricing?.priceId} data={data} versionId={parseInt(params.versionId)} />
  )
}

export default page
