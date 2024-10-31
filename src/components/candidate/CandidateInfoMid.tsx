import { SelectOptions } from '@/db/schema/schema'; 
import { useGetCandidateTestsAndAnswersQuery } from '@/quries/CandidateResultQuery';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { RiCloseCircleLine } from 'react-icons/ri';
import { DisplayQuestions } from '../assessments/QuizPage';

interface CandidateTest {
  id: number;
  title: string;
  duration: number; // in seconds
  questionsCount: number;
  multipleChoiceQuestions?: Array<MultipleChoiceQuestion>;
}

interface MultipleChoiceQuestion {
  order: number;
  id: number;
  question: string;
  description?: string;
  options: SelectOptions[];
  multipleChoiceAnswers?: MultipleChoiceAnswer; // Changed to a single object
}

interface MultipleChoiceAnswer {
  id: number;
  answerText: string;
  isCorrect: boolean;
}

const CandidateInfoMid = ({ candidateId }: { candidateId: number }) => {
  const { data, isLoading } = useGetCandidateTestsAndAnswersQuery(candidateId);

  if (isLoading) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  if (!data || data.message !== "success") {
    return <div className='text-center p-4 text-red-500'>No data available for test results.</div>;
  }

  return (
    <div className='p-6 w-full bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Candidate Tests</h1>
      {data.data?.map((test: CandidateTest) => (
        <div key={test.id} className='bg-white shadow-md rounded-lg p-6 mb-6 '>
          <h2 className='text-3xl font-bold text-gray-800'>{test.title} </h2>
          <p className='text-gray-600 mt-2'>Duration: <span className='font-semibold'>{(test.duration / 60).toFixed(0)} minutes</span></p>
          <p className='text-gray-600'>Questions Count: <span className='font-semibold'>{test.questionsCount}</span></p>
          
          <h3 className='text-lg font-medium mt-6 text-gray-700'>Multiple Choice Questions:</h3>
          {test.multipleChoiceQuestions?.map((question: MultipleChoiceQuestion) => (
            <div key={question.id} className='border-b border-gray-300 pb-4 mb-4'>
              <h3 className='text-lg font-medium '>Question {question.order}:</h3>
              <DisplayQuestions question={question as any} />
              
              <h3 className='text-lg font-medium mt-4 text-gray-700'>Candidate Answers:</h3>
              <ul className='list-disc list-inside ml-5 mt-2'>
                {question?.options.map((option) => (
                  <li key={option.id} className='text-gray-700 flex items-center text-lg italic font-bold'>
                    <span>Candidate answer: {option.content}</span>
                    {question?.multipleChoiceAnswers?.isCorrect ? (
                      <FaCheckCircle className='ml-2 h-5 w-5 text-green-500' />
                    ) : (
                      <RiCloseCircleLine className='ml-2 h-5 w-5 text-red-500' />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CandidateInfoMid;
