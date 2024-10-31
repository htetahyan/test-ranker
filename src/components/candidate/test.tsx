// components/test.tsx
'use client';

import React, { useEffect, useState } from 'react';
import QuizPage from '../assessments/QuizPage';

const Test = ({ response, candidate_uniqueId, uniqueId, order }: { order: number, response: any, candidate_uniqueId: string, uniqueId: string }) => {
  const [countdown, setCountdown] = useState(10);
  const [showTest, setShowTest] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setShowTest(true);
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      {showTest ? (
        <QuizPage questions={response} order={order} uniqueId={uniqueId} candidate_uniqueId={candidate_uniqueId} />
      ) : (
        <div className="flex flex-col items-center bg-gray-100 text-gray-900 p-10 rounded-lg shadow-lg max-w-lg">
          <h1 className="text-xl font-medium text-gray-600">Test Number {order}</h1>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Prepare Yourself</h1>
          <p className="text-lg mb-2 text-gray-700">The test will begin in:</p>
          <div className="text-6xl font-bold text-red-600 mb-4">{countdown}</div>
          <p className="text-base text-gray-600">Focus and be prepared to begin.</p>
          <div className="mt-6">
            <span className="inline-block px-5 py-2 bg-gray-800 text-white font-semibold rounded-md shadow transition duration-200 transform hover:bg-gray-700">
              Countdown
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
