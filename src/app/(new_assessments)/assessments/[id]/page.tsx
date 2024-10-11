import CandidateList from '@/components/assessments/CandidateList';
import InviteCandidate from '@/components/assessments/InviteCandidate';
import { getAssesssmentRelatedInfo } from '@/service/assessments.service'
import { Button } from '@nextui-org/react'
import React from 'react'
import { FaPen } from 'react-icons/fa';
import { RiEyeCloseFill } from 'react-icons/ri';

const page = async({params}:{params:{id:string}}) => {
    console.log(params.id);
    
const data=await getAssesssmentRelatedInfo({assessmentId:Number(params.id)})
const {assessment,candidates,tests}=data

  return (
    <div className='w-screen min-h-screen bg-gray-100'>
        <div className='flex justify-start w-full p-4 items-center'>
            <div className='flex items-center gap-2 w-full '><Button className='w-fit mx-4  '>Back</Button>
            <div >
                <h1 className='text-5xl font-bold'>{assessment?.name}</h1>
                <p className='text-gray-500'>{assessment?.jobRole}</p>
                <p className='text-gray-500'>{assessment?.jobLocation}</p>
                <p className='text-gray-500'>{assessment?.workArrangement}</p>
            </div>
          
            </div>  <div className='flex justify-end w-full gap-2 '>
               <Button endContent={<RiEyeCloseFill/>} color='secondary' variant='solid'>preview</Button>
               <Button endContent={<FaPen/>} color='secondary' variant='solid' isIconOnly></Button>

            </div>
        </div>
        <InviteCandidate/>

      <CandidateList/>
    </div>
  )
}

export default page
