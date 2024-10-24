import CircularSteps from '@/components/assessments/CircularSteps'
import { Button } from '@nextui-org/react'
import React from 'react'
import MyQuestions from '@/components/questions/MyQuestions'
import EditQuestions from '@/components/questions/EditQuestions'
import Link from 'next/link'

const page = async({params}:{params:{id:string}}) => {
  return (
    <div className='w-screen min-h-screen bg-gray-100'>
            <div className='flex justify-start w-full '><Button className='w-fit mx-4  '>Back</Button></div>
<CircularSteps currentStep={3}/>
   <EditQuestions assessmentId={Number(await params.id)}/>
  <div className='flex justify-end w-full '>
    <Link href={`/assessments/${await params.id}`}><Button className='w-fit mx-4  '>next</Button>
    </Link>
    </div>
    </div>
  )
}

export default page
