import { getTestsFromAssessmentId } from '@/service/assessments.service';
import React from 'react';
import TestList from '@/components/tests/TestLists';
import { SelectAssessments, SelectTests } from '@/db/schema/schema';
import GenerateTestWithAi from '@/components/assessments/GenerateTestWithAi';
import { Button, Skeleton, Spinner } from '@nextui-org/react';
import CircularSteps from '@/components/assessments/CircularSteps';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import MultipleChoicesContainer from '@/components/multipleChoice/MultipleChoicesContainer';


const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    throw new Error("Please provide an id");
  }

  const data = await getTestsFromAssessmentId({ assessmentId: parseInt(params.id) }) as { tests: SelectTests, assessment: SelectAssessments[] };
  if (!data) return <div>404</div>;

  console.log(data);

  const array = `[
    {
               "question": "<body class='flex flex-col items-center justify-center w-screen h-screen px-10 py-20 text-gray-700 bg-gray-100'>\\n    <div class='flex flex-col items-center w-full max-w-screen-md p-6 pb-6 mt-10 bg-white rounded-lg shadow-xl sm:p-8'>\\n        <h2 class='text-xl font-bold'>Monthly Revenue</h2>\\n        <span class='text-sm font-semibold text-gray-500'>2020</span>\\n        <div class='flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3'>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$37,500</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-8 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-6 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-16 bg-indigo-400'></div>\\t\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Jan</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$45,000</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-10 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-6 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-20 bg-indigo-400'></div>\\t\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Feb</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$47,500</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-10 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-8 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-20 bg-indigo-400'></div>\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Mar</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$50,000</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-10 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-6 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-24 bg-indigo-400'></div>\\t\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Apr</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$47,500</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-10 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-8 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-20 bg-indigo-400'></div>\\t\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>May</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$55,000</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-12 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-8 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-24 bg-indigo-400'></div>\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Jun</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$60,000</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-12 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-16 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-20 bg-indigo-400'></div>\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Jul</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$57,500</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-12 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-10 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-24 bg-indigo-400'></div>\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Aug</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$67,500</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-12 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-10 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-32 bg-indigo-400'></div>\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Sep</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$65,000</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-12 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-12 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow bg-indigo-400 h-28'></div>\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Oct</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$70,000</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-8 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-8 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-40 bg-indigo-400'></div>\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Nov</span>\\n            </div>\\n            <div class='relative flex flex-col items-center flex-grow pb-5 group'>\\n                <span class='absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block'>$75,000</span>\\n                <div class='flex items-end w-full'>\\n                    <div class='relative flex justify-center flex-grow h-8 bg-indigo-200'></div>\\n                    <div class='relative flex justify-center flex-grow h-8 bg-indigo-300'></div>\\n                    <div class='relative flex justify-center flex-grow h-48 bg-indigo-400'></div>\\n                </div>\\n                <span class='absolute bottom-0 text-xs font-bold'>Dec</span>\\n            </div>\\n        </div>\\n    </div>\\n</body>"
,
        "options": {
            "1": "Option A: Use a vibrant color palette with different shades of green to represent financial growth.",
            "2": "Option B: Stick to a monochromatic color scheme for a clean and minimalistic design.",
            "3": "Option C: Incorporate graphs and charts for a visual representation of the user's financial status.",
            "4": "Option D: Use a sleek and modern layout with sans-serif fonts for a professional look."
        },
        "solution": 3
    }
  ]`;

  const parsedArray = JSON.parse(array);

  return (
    <div className='w-screen p-4 flex flex-col items-center relative'>
      <div className='flex justify-start w-full'>
      </div>
      <div className='flex items-center justify-between gap-2 p-4 w-full'>
        <div>
          <h1 className='text-5xl font-bold'>{data?.assessment?.[0]?.name}</h1>
          <p className='text-gray-500'>{data?.assessment?.[0]?.jobRole}</p>
          <p className='text-gray-500'>{data?.assessment?.[0]?.jobLocation}</p>
        </div>
      </div>
      <CircularSteps currentStep={2} />
    
      <MultipleChoicesContainer id={parseInt(params!.id)} data={data} />
      <div className='h-[10vh] w-4/5 items-center px-2 flex justify-end fixed bottom-0'>
       <Link href={`/assessments/${params?.id}/questions/edit`}> 
       <Button color='secondary' variant='solid' className='bg-purple-600 text-white' >Next</Button>
       </Link>
      </div>
    </div>
  );
}

export default page;
