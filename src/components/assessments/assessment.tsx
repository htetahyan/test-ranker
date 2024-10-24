import React from 'react'
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
import { FaBackspace, FaPen } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiEyeCloseFill } from 'react-icons/ri';
import { SelectAssessments } from '@/db/schema/schema';

const Assessment = ({data}:{data:any}) => {
  return (
    <div className='w-screen min-h-screen bg-gray-100'>
        <div className='flex justify-start w-full p-4 items-center'>
            <div className='flex items-center gap-2 w-full '>
              <Link href={'/dashboard'}><Button startContent={<IoMdArrowRoundBack />} className='w-fit mx-4  '>Back</Button>
              </Link>
            <div >
                <h1 className='text-5xl font-bold'>{data?.assessment?.name}</h1>
                <p className='text-gray-500'>{data?.assessment?.jobRole}</p>
                <p className='text-gray-500'>{data?.assessment?.jobLocation}</p>
                <p className='text-gray-500'>{data?.assessment?.workArrangement}</p>
            </div>
          
            </div>  <div className='flex justify-end w-full gap-2 '>
{/*                <Button endContent={<RiEyeCloseFill/>}  variant='ghost'>preview</Button>
 */}             <Link href={`/assessments/${data?.assessment?.id}/edit/assessment`}><Button endContent={<FaPen/>} isIconOnly variant='flat'></Button></Link>

            </div>
        </div>
        <InviteCandidate assessment={data?.assessment}/>

      <CandidateList candidates={data?.candidates }/>
    </div>
  )
}

export default Assessment
