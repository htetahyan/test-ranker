'use client'
import Link from 'next/link'
import React from 'react'
import { Accordion, AccordionItem, Badge, Button, Chip, Progress } from '@nextui-org/react';
import { FaArrowLeft, FaDownload, FaShareAlt, FaQuestionCircle } from 'react-icons/fa';
import { SelectAnswers, SelectCandidatesInfo, SelectFile, SelectQuestions, SelectResume } from '@/db/schema/schema';

const CandidateInformation = ({assessment,candidate,questions,totalQuestions,correctAnswers,correctPercentage,candidateInfo,resume,answers,files}: {assessment:any,candidate:any,questions:SelectQuestions[],correctAnswers:any,correctPercentage:any,totalQuestions:any,candidateInfo:SelectCandidatesInfo,resume:SelectResume,answers:SelectAnswers[],files:SelectFile[]}) => {
 console.log(answers,questions)
    return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
    {/* Navigation and Back Button */}
    <div className="flex items-center space-x-4">
      <Link href={`/assessments/${assessment?.id}`}>
        <Button className="w-fit" startContent={<FaArrowLeft />}>Back</Button>
      </Link>
    </div>

    {/* Candidate Details Section */}
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex justify-between items-start">
        {/* Left Section: Assessment Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Assessment: {assessment?.name} - {assessment?.jobRole} - {assessment?.jobLocation}
          </h2>
          
          <div className="text-sm space-y-1">
            <p className="text-gray-500">
              <strong>Invited:</strong> {new Date(candidate?.createdAt!).toLocaleString()}
            </p>
            <p className="text-gray-500">
              <strong>Last update:</strong> {new Date(candidate?.updatedAt!).toLocaleString()}
            </p>
            
          </div>
          <Chip color={getStepChipColor(candidate?.currentStep)}>{candidate?.currentStep}</Chip>
        </div>

        {/* Right Section: Score Summary */}
        <div className="text-right space-y-2">
          <h1 className="text-xl font-bold">Score</h1>
          <p className="text-sm"><strong>Total Multiple Choice Questions:</strong> {totalQuestions}</p>
          <p className="text-sm"><strong>Correct  Answers:</strong> {correctAnswers}</p>
          <p className="text-lg font-semibold text-blue-600">Tests Correct Percentage: {correctPercentage}%</p>
          <Progress value={correctPercentage} color="primary" />
        </div>
      </div>
<div className='mt-6'>
<h1 className="text-xl font-bold">Questions</h1>
<div className='space-y-2'>
  <Accordion>
  {questions?.map((question) => {
  const answer = answers?.find((ans) => ans.questionId === question.id);

  return (
    <AccordionItem 
      key={question.id} 
      aria-label={question.question} 
      title={`${question.question} - [${question.type}]`}
    >
      {/* Question Description */}
      <div className="text-sm" dangerouslySetInnerHTML={{ __html: question!.description! }} />
      
      {/* Display Answer */}
      <div className="mt-2">
        {answer ? (
          <>
            <strong>Answer:</strong>
            {answer.type === 'question' && answer.content!=="null" ? (
              <div dangerouslySetInnerHTML={{ __html: answer?.content! }} />
            ) : (
              <div>
               <Link href={`${process.env.AZURE_BLOB_URL}/${files?.find((file) => file?.id === answer.fileId)?.name}`} target="_blank" rel="noopener noreferrer">
                <Button endContent={<FaDownload />} variant='ghost'>Download</Button></Link>
              </div> // Render as plain text for non-essay types
            )}
          </>
        ) : (
          <div>No answer provided</div>
        )}
      </div>
    </AccordionItem>
  );
})}



  </Accordion>
  </div>

</div>
      {/* No Test Results Message */}
     {/*  <div className="mt-6 border-t pt-4 text-center text-gray-500">
        No tests from the library were included in this assessment. <br />
        Therefore, there are no test results to show.
      </div> */}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <Button color="default" startContent={<FaQuestionCircle />}>Help</Button>
      {resume && <Link href={`${process.env.AZURE_BLOB_URL}/${resume?.name}`} target="_blank" rel="noopener noreferrer"><Button color="primary" startContent={<FaDownload />}>Download Resume</Button></Link>}  
        <Button color="primary" startContent={<FaShareAlt />}>Share</Button>
      </div>
    </div>
  </div>
  )
}

export default CandidateInformation
const getStepChipColor = (step: string | undefined) => {
    switch (step) {
      case 'intro':
        return 'primary';
      case 'sign':
        return 'secondary';
      case 'tests':
        return 'warning';
      case 'finished':
        return 'success';
      default:
        return 'default';
    }
  };