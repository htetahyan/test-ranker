// components/test.tsx
'use client'; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import QuizPage from '../assessments/QuizPage';

const Test = ({ response ,candidate_uniqueId,uniqueId}: { response: any ,candidate_uniqueId:string,uniqueId:string}) => {
  const [countdown, setCountdown] = useState(10);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Clear interval on cleanup
    } else {
      setShowQuiz(true); // Show quiz when countdown reaches 0
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">
      {showQuiz ? (
        <QuizPage questions={response}  uniqueId={uniqueId}  candidate_uniqueId={candidate_uniqueId} />
      ) : (
        <div className="flex flex-col items-center bg-white text-black p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Get Ready!</h1>
          <p className="text-xl mb-2">Starting Quiz in:</p>
          <div className="text-6xl font-extrabold mb-4">{countdown}</div>
          <p className="text-lg">Stay focused and good luck!</p>
          <div className="flex space-x-4 mt-4">
            <span className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200">
              Countdown
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
