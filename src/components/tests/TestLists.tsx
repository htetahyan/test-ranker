import { SelectAssessments, SelectTests } from '@/db/schema/schema';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const TestCard = ({ test }: { test: SelectTests }) => {
  
  return (
    <div className="h-fit rounded-lg p-4 max-w-sm border-2">
      {/* Test Title and Suggested Badge */}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">{test.title || 'Test Title'}</h2>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Suggested</span>
      </div>

      {/* Test Type and Tags */}
      <div className="flex gap-2 mt-2">
        <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">{test.testType || 'Cognitive ability'}</span>
       
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">Popular</span>
      </div>

      {/* Description */}
      <p className="text-sm mt-3">{test.description || 'This is a description of the test.'}</p>

      {/* Test Info: Time, Questions, Type */}
      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <span>{Math.round(test.duration / 60)} mins</span>
        </div>
        <div className="flex items-center gap-1">

          <span>{test.questionsCount} questions</span>
        </div>
        <div className="flex items-center gap-1">
          
          <span>Multiple choice</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
      <Link href={`/assessments?id=${test.id}`} className="border rounded-full px-4 py-2 hover:bg-gray-100">  <button className="border rounded-full px-4 py-2 hover:bg-gray-100">Preview</button></Link>
        <button className="border rounded-full px-4 py-2 hover:bg-gray-100">Details</button>
       <Link href={`/assessments/${test.assessmentsId}/tests/${test.id}/edit`} className="text-red-500 border border-red-500 rounded-full px-4 py-2 hover:bg-red-50"> <button className="text-red-500 border border-red-500 rounded-full px-4 py-2 hover:bg-red-50">edit</button></Link>
      </div>
    </div>
  );
};

const TestList = ({data}:{data:{tests:SelectTests[],assessment:SelectAssessments[]}}) => {


  return (
    <div className="p-4 w-screen h-fit grid grid-cols-3 gap-4 ">
      {data?.tests?.map((test) => (
        <TestCard key={test.id} test={test} />
      ))}
    </div>
  );
};

export default TestList;
