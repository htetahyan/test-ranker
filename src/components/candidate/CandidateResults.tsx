import { useGetCandidateResultsQuery } from '@/quries/CandidateResultQuery';
import { Progress, Skeleton } from "@nextui-org/react";
import React from 'react';

interface CandidateResultsProps {
  candidateId: number;
  versionId: number;
}

const CandidateResults: React.FC<CandidateResultsProps> = ({ candidateId, versionId }) => {
  const { data, isLoading } = useGetCandidateResultsQuery({ candidateId, versionId });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <div className="p-6 w-full text-center text-red-500 text-xl">No results found.</div>;
  }

  const { totalMultipleChoiceQuestions, score, correctPercentage } = data?.data || {};

  return (
    <div className="p-8 w-full bg-gradient-to-r text-white from-gray-700 to-black rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Candidate Results</h2>

      <div className="mb-8 bg-gray-100 p-6 rounded-lg">
        <p className="text-lg text-gray-600 mb-2">AI Generated Candidate Compatibility Score</p>
        <Progress
          label="AI Compatibility"
          value={parseFloat(score)}
          maxValue={100}
          color="primary"
          size="sm"
          showValueLabel={true}
          classNames={{
            base: "w-full",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-blue-500 to-purple-600",
            label: "tracking-wider font-medium text-gray-600",
            value: "text-blue-600 font-bold",
          }}
        />
      </div>

      <div className="mb-8 bg-gray-100 p-6 rounded-lg">
        <p className="text-lg text-gray-600 mb-2">Total Multiple Choice Questions</p>
        <p className="text-2xl font-semibold text-gray-900">{totalMultipleChoiceQuestions}</p>
      </div>

      <div className="mb-8 bg-gray-100 p-6 rounded-lg">
        <p className="text-lg text-gray-600 mb-2">Correct Percentage</p>
        <Progress
          label="Correct Percentage"
          value={parseFloat(correctPercentage)}
          maxValue={100}
          color="success"
          size="sm"
          showValueLabel={true}
          classNames={{
            base: "w-full",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-green-500 to-blue-500",
            label: "tracking-wider font-medium text-gray-600",
            value: "text-green-600 font-bold",
          }}
        />
      </div>
    </div>
  );
};

export default CandidateResults;

const Loading = () => {
  return (
    <div className="p-8 w-full bg-gradient-to-r from-gray-700 to-black rounded-lg shadow-xl">
        <Skeleton className="h-6 w-1/2 mx-auto" />
     

      <div className="mb-8 bg-gray-100 p-6 rounded-lg">
        <p className="text-lg text-gray-600 mb-2">
          <Skeleton className="h-4 w-3/4" />
        </p>
        <Skeleton className="h-8 w-full" />
      </div>

      <div className="mb-8 bg-gray-100 p-6 rounded-lg">
        <p className="text-lg text-gray-600 mb-2">
          <Skeleton className="h-4 w-3/4" />
        </p>
        <Skeleton className="h-8 w-full" />
      </div>

      <div className="mb-8 bg-gray-100 p-6 rounded-lg">
        <p className="text-lg text-gray-600 mb-2">
          <Skeleton className="h-4 w-3/4" />
        </p>
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};
