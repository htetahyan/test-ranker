'use client'

import { useGetMultipleChoiceAndOptionsQuery } from '@/quries/BaseQuery'
import React from 'react'
import MultipleChoice from './MultipleChoice'
import { Button, Skeleton } from '@nextui-org/react'
import GenerateTestWithAi from '../assessments/GenerateTestWithAi'
import AddATest from '../tests/AddATest'
import { FaPlusCircle } from 'react-icons/fa'
import {  Bar, Pie } from "react-chartjs-2";
import { CategoryScale,registerables } from "chart.js";
import Chart from "chart.js/auto";

import Link from 'next/link'
Chart.register(...registerables );

const MultipleChoicesContainer = ({ id, data }: { id: number, data: any }) => {
    const { data: array, isLoading, isSuccess } = useGetMultipleChoiceAndOptionsQuery({ id })
    const sortMultipleChoiceByOrderNumberDesc = array?.data?.multipleChoiceQuestions || []
 
    
    console.log(sortMultipleChoiceByOrderNumberDesc);

    if (isLoading) {
        return <Skeleton />
    }

    return (
        <div className="w-screen relative overflow-x-hidden mt-4 grid justify-center gap-10">
      
{/*           <div className="w-full mt-4 grid justify-end gap-10">  <AddATest id={id} /></div>
 */}           <div className='w-full  '> {sortMultipleChoiceByOrderNumberDesc.length > 0 ? (
                sortMultipleChoiceByOrderNumberDesc.map((m: any) => (
                    <MultipleChoice key={m.id} MultipleChoice={m} />
                ))
            ) : (
                <GenerateTestWithAi id={id} text={"generate test with ai"} />
            )}</div>
            {isLoading &&  <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      
      }<div className='h-[10vh] z-20 bg-white w-full items-center px-2 gap-10 flex justify-around fixed bottom-0'>

      {isSuccess && sortMultipleChoiceByOrderNumberDesc.length>0 &&  <GenerateTestWithAi id={id} text={'generate again'} />}

       <Link href={`/assessments/${id}/edit/questions`}> 

       <Button color='secondary' variant='solid' className='bg-purple-600 text-white' >Next</Button>
       </Link>
      </div>
        </div>
    )
}

export default MultipleChoicesContainer

