'use client'

import { useGetMultipleChoiceAndOptionsQuery } from '@/quries/BaseQuery'
import React from 'react'
import MultipleChoice from './MultipleChoice'
import { Button, Skeleton } from '@nextui-org/react'
import GenerateTestWithAi from '../assessments/GenerateTestWithAi'
import AddATest from '../tests/AddATest'

const MultipleChoicesContainer = ({ id, data }: { id: number, data: any }) => {
    const { data: array, isLoading, isSuccess } = useGetMultipleChoiceAndOptionsQuery({ id })
    const sortMultipleChoiceByOrderNumberDesc = array?.data?.multipleChoiceQuestions || []

    console.log(sortMultipleChoiceByOrderNumberDesc);

    if (isLoading) {
        return <Skeleton />
    }

    return (
        <div className="w-full mt-4 grid justify-center gap-10">
{/*           <div className="w-full mt-4 grid justify-end gap-10">  <AddATest id={id} /></div>
 */}           <div> {sortMultipleChoiceByOrderNumberDesc.length > 0 ? (
                sortMultipleChoiceByOrderNumberDesc.map((m: any) => (
                    <MultipleChoice key={m.id} MultipleChoice={m} />
                ))
            ) : (
                <GenerateTestWithAi assessment={data?.assessment?.[0]} />
            )}</div>
            {isLoading &&  <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>}
        </div>
    )
}

export default MultipleChoicesContainer
