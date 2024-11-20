'use client';
import { useState, useEffect } from 'react';
import Timer from '../candidate/timer';
import { SelectMultipleChoicesQuestions, SelectQuestions, SelectTests } from '@/db/schema/schema';
import Link from 'next/link';
import { MultipleChoiceAndOptions } from '@/service/assessments.service';
import { useAnswerMultipleChoiceMutation } from '@/quries/CandidateQuery';
import { useRouter } from 'next/navigation';
import "chart.js/auto";

import { Bar, Line, Pie, PolarArea } from 'react-chartjs-2';
import { Button } from '@nextui-org/react';

const QuizPage = ({
  questions,
  candidate_uniqueId,
  uniqueId,
  order,
}: {
  order: number;
  questions: MultipleChoiceAndOptions[];
  candidate_uniqueId: string;
  uniqueId: string;
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [mutate] = useAnswerMultipleChoiceMutation();
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    try {
      const correctCount = selectedOptions.reduce((count, selected, index) => {
        return selected === questions[index].solution ? count! + 1 : count;
      }, 0);

      setCorrectAnswers(correctCount!);
      setShowResult(true);

      await mutate({ candidateId: candidate_uniqueId, answers: selectedOptions })
        .unwrap()
        .finally(() => router.push(`/candidate/${uniqueId}/${candidate_uniqueId}/tests/${order + 1}`));
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  useEffect(() => {
    if (isTimeUp) {
      submitQuiz();
    }
  }, [isTimeUp]);

  return (
    <>
      <div className="w-full flex justify-center p-4 bg-gray-100">
        <Timer duration={questions[currentQuestionIndex]?.test?.duration ?? 300} setIsTimeUp={setIsTimeUp} />
      </div>

      <div className="items-center justify-center min-h-screen w-full px-4 bg-gray-50 flex flex-col">
        {!showResult ? (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl gap-8 flex flex-col">
            <h1 className="text-xl font-bold text-gray-800 mb-6">
              Question {currentQuestionIndex + 1}/{questions.length}
            </h1>

            <DisplayQuestions question={questions?.[currentQuestionIndex]?.question} />

            <div className="space-y-4">
              {Object?.entries(currentQuestion?.options).map(([key, value]) => (
            <Button
            key={key}
            onClick={() => handleOptionClick(Number(key))}
            className={`py-3 px-4 border rounded-lg w-full text-sm md:text-lg text-left h-fit font-semibold transition-all duration-200
              whitespace-normal break-words word-wrap overflow-hidden
              ${selectedOptions[currentQuestionIndex] === Number(key)
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
              }`}
          >
            {value}
          </Button>
          
             
              ))}
            </div>

            <Button
              onClick={handleNextQuestion}
              className={`mt-8 py-3 px-8 rounded-full text-lg font-bold transition-all duration-200 ${
                selectedOptions[currentQuestionIndex] !== null
                  ? 'bg-black text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={selectedOptions[currentQuestionIndex] === null}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold text-gray-800">Test Completed!</h2>
            <p className="text-lg text-gray-600">You have finished the test.</p>
          </div>
        )}
      </div>
    </>
  );
};

export const DisplayQuestions = ({ question }: { question: SelectMultipleChoicesQuestions }) => {
  const ChartComponent = ({ type, data, options }: any) => {
    const ChartMap = { pie: Pie, bar: Bar, line: Line, polar: PolarArea };
    const ChartType = ChartMap[type as keyof typeof ChartMap];

    return (
      <div className="w-full max-w-md mx-auto overflow-hidden">
        <ChartType data={data} options={options} />
      </div>
    );
  };

  const chartOptions = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: true, // Automatically resize
    responsive: true,
  };
  
  return (
    <div className="w-full mb-4">
      <h1 className="text-gray-700 text-2xl font-bold mb-4">{question.question}</h1>
      <p className="text-gray-600">{question.description}</p>

      {['pie', 'bar', 'line', 'polar'].includes(question.type) && (
        <ChartComponent
          type={question.type}
          data={{
            labels: question.label!,
            datasets: [{ data: question.data, backgroundColor: question.background! }],
          }}
          options={chartOptions}
        />
      )}
    </div>
  );
};

export default QuizPage;
