import Assessment from '@/components/assessments/assessment';
import CandidateList from '@/components/assessments/CandidateList';
import InviteCandidate from '@/components/assessments/InviteCandidate';
import MultipleChoice from '@/components/multipleChoice/MultipleChoice';
import db from '@/db';
import { getAssesssmentRelatedInfo } from '@/service/assessments.service'
import { currentUser } from '@/service/auth.service';
import { Button } from '@nextui-org/react'
import { count, eq } from 'drizzle-orm';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { FaBackspace, FaPen } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiEyeCloseFill } from 'react-icons/ri';

const page = async (props:{params: Promise<{id:string,versionId:string}>}) => {
  const params = await props.params;
  

  const user=await currentUser()
  if(!user)  redirect('/account')
  const data=await getAssesssmentRelatedInfo({versionId:parseInt(params.versionId),assessmentId:parseInt(params.id),userId:user?.id!})

  if(!data)  return <div>404</div>


  return (
    <Assessment data={data} versionId={parseInt(params.versionId)} />
  )
}

export default page
