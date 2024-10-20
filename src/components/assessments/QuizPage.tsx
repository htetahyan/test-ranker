'use client';
import { useState, useEffect } from 'react';
import Timer from '../candidate/timer';
import { SelectMultipleChoicesQuestions, SelectQuestions, SelectTests } from '@/db/schema/schema';
import Link from 'next/link';
import { MultipleChoiceAndOptions } from '@/service/assessments.service';
import { useAnswerMultipleChoiceMutation } from '@/quries/CandidateQuery';
import { useRouter } from 'next/navigation';
import "chart.js/auto";

import { Bar, Line, Pie, PolarArea } from 'react-chartjs-2'



const QuizPage = ({ questions ,candidate_uniqueId,uniqueId}: { questions: MultipleChoiceAndOptions[], candidate_uniqueId:string,uniqueId:string }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
const [mutate]=useAnswerMultipleChoiceMutation()
  const currentQuestion = questions[currentQuestionIndex];

  // Handle option selection for each question
  const handleOptionClick = (option: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  // Move to the next question or submit the quiz when all questions are done
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuiz();
    }
  };
const router=useRouter()
  // Submit the quiz, count correct answers, and show results
  const submitQuiz = async () => {

    try {
      // Calculate correct answers
      const correctCount = selectedOptions.reduce((count: number, selected, index) => {
        return selected === questions[index].solution ? count + 1 : count;
      }, 0);
  
      setCorrectAnswers(correctCount);
      setShowResult(true);
  
      // Log testId and selectedOptions, await mutate call
      await mutate({ candidateId: candidate_uniqueId, answers: selectedOptions }).unwrap().finally(()=>
        router.push(`/candidate/${uniqueId}/${candidate_uniqueId}/questions/1`)
      );
      
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };
  

  // Auto-submit the quiz when time is up
  useEffect(() => {
    if (isTimeUp) {
      submitQuiz();
    }
  }, [isTimeUp]);

  console.log(questions);

  return (
    <>
      <div className="w-full flex justify-center">
        {/* Pass the total quiz duration and setIsTimeUp callback to the Timer component */}
        <Timer duration={100} setIsTimeUp={setIsTimeUp} />
      </div>

      <div className=" items-center justify-center h-fit relative overflow-hidden w-screen bg-gray-50">
        {!showResult ? (
          <div className="bg-white  p-6 rounded-lg shadow-lg w-full max-w-full  gap-8">
            {/* Left Column - Question */}
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Question {currentQuestionIndex + 1}/{questions.length}
              </h1>
       
            </div>
          <DisplayQuestions question={questions[currentQuestionIndex]!.question}/>
        
            {/* Right Column - Options */}
            <div className="space-y-4">
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleOptionClick(Number(key))}
                  className={`py-3 px-4 border rounded-lg w-full text-left text-base font-semibold transition-all duration-200 ${
                    selectedOptions[currentQuestionIndex] === Number(key)
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Next Button (spanning both columns) */}
            <div className="col-span-2 text-center">
              <button
                onClick={handleNextQuestion}
                className={`mt-8 py-3 px-8 rounded-full text-lg font-bold transition-all duration-200 ${
                  selectedOptions[currentQuestionIndex] !== null
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={selectedOptions[currentQuestionIndex] === null}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold text-gray-800">Test finish!</h2>
            <p className="text-lg text-gray-600">You have finished the Test.</p>
            <p className="text-lg text-gray-600">
              <span className="font-bold">{questions.length}</span>.
              <Link href={`/candidate/${uniqueId}/${candidate_uniqueId}/questions`}>
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
export const DisplayQuestions = ({question}: {question: SelectMultipleChoicesQuestions}) => {

  console.log(question,'question');
  
  
  return (<div className='w-full mb-2 text-black'>
    {question.type==='multiple-choice'  && (
      <div> <h1 className=" text-2xl font-bold mb-4">{question.question}</h1>
        <p>{question.description}</p></div> 
       )
       }
       {question.type==='essay'  && (
         <div> <h1 className="text-gray-700 text-2xl font-bold mb-4">{question.question}</h1>
         <p>{question.description}</p></div>
       )}
    {question.type === 'pie' && (
<div className="w-full"> 
<h1 className="text-gray-700 text-2xl font-bold mb-4">{question.question}</h1>
<p>{question.description}</p>
<div className="w-1/2">
<Pie
data={{
  labels: question.label!,
  datasets: [{ data: question.data, backgroundColor: question.background! }]
}}
/>
</div>
</div>
)}

{question.type === 'bar' && (
<div className="w-full"> 
<h1 className="text-gray-700 text-2xl font-bold mb-4">{question.question}</h1>
<p>{question.description}</p>
<div className="w-1/2">
<Bar
options={{ plugins: { legend: { display: false } } }}
data={{
  labels: question.label!,
  datasets: [{ data: question.data, backgroundColor: question.background! }]
}}
/>
</div>
</div>

)}

{question.type === 'line' && (
<div className="w-full">
<h1 className="text-gray-700 text-2xl font-bold mb-4">{question.question}</h1>
<p>{question.description}</p>
<div className="w-1/2">
<Line
options={{ plugins: { legend: { display: false } } }}
data={{
  labels: question.label!,
  datasets: [{ data: question.data, backgroundColor: question.background! }]
}}
/>
</div>
</div>
)}

{question.type === 'polar' && (
<div className="w-full"> 
<h1 className="text-gray-700 text-2xl font-bold mb-4">{question.question}</h1>
<p>{question.description}</p>
<div className="w-1/2">
<PolarArea
data={{
  labels: question.label!,
  datasets: [{ data: question.data, backgroundColor: question.background! }]
}}
/>
</div>
</div>
)}</div>
  )
}