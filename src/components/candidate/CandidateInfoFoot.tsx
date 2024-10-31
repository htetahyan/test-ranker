import { useGetCandidateQuestionsAndAnswersQuery } from '@/quries/CandidateResultQuery';
import { Accordion, AccordionItem } from '@nextui-org/react';
import React from 'react';

interface CandidateInfoFootProps {
  candidateId: number;
}

const CandidateInfoFoot: React.FC<CandidateInfoFootProps> = ({ candidateId }) => {
  const { data, isLoading } = useGetCandidateQuestionsAndAnswersQuery({ candidateId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.message !== 'success') {
    return <div>No data available for this Q&A.</div>;
  }

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">Candidate Q&A</h2>
      <Accordion>
        {data.data.map((item: any, index: number) => (
          <AccordionItem
            key={item.Questions.id}
            aria-label={`Question ${index + 1}`}
            title={`Question ${index + 1}: ${item.Questions.question}`}
          >
            <div className="mb-2">
              <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: item.Questions.description }} />
            </div>
            <div>
              <p className="font-semibold">Answer:</p>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: item.Answers.content }} />
            </div>
            <p className="text-sm text-gray-500 mt-2">Answered on: {new Date(item.Answers.createdAt).toLocaleDateString()}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CandidateInfoFoot;
