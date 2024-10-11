import MultipleChoice from '@/components/multipleChoice/MultipleChoice'
import { getTestAndQuestions } from '@/service/assessments.service'
import { Button } from '@nextui-org/react'
import React from 'react'

const page = async({ params }: { params: { id: string, testId: string } }) => {
  const array = await getTestAndQuestions({ id: Number(params.testId) });
console.log(array);
const sortMultipleChoiceByOrderNumberDesc =array && array?.multipleChoiceQuestions?.sort((a: any, b: any) => b.order - a.order) 
 return (
    <div className='w-screen min-h-screen bg-gray-100'>
      {/* Header */}
      <div className='min-h-10 p-4 w-screen flex items-center justify-between bg-white shadow-md'>
        <Button variant='solid' className='bg-gray-300 text-black'>Back</Button>
        <h1 className='text-3xl font-bold text-center'>{array?.test?.title}</h1>
        <Button color='secondary' variant='solid' className='bg-purple-600 text-white'>Next</Button>
      </div>

      {/* Questions Section */}
      <div className='p-4 w-screen grid justify-center'>
        {sortMultipleChoiceByOrderNumberDesc.map((m: any) => (
            <MultipleChoice key={m.id} MultipleChoice={m} />
        ))}
      </div>
      
    </div>
  );
}

export default page;
