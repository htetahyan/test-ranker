'use client';

import React, { useEffect, useState } from 'react';
import QuizPage from '../assessments/QuizPage';
import { SelectTests } from '@/db/schema/schema';

const Test = ({ response, test, candidate_uniqueId, uniqueId, order }: { test: SelectTests, order: number, response: any, candidate_uniqueId: string, uniqueId: string }) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {showTest ? (
        <QuizPage questions={response} order={order} uniqueId={uniqueId} candidate_uniqueId={candidate_uniqueId} />
      ) : (
        <div className="flex flex-col items-center p-8 rounded-xl shadow-lg bg-white w-full max-w-md mx-auto text-center transform transition-all duration-500 ease-out animate-fade-in scale-105">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 truncate">{test?.title}</h1>
          <h1 className="text-lg text-gray-700">{test.questionsCount} Questions</h1>
          <p className="text-sm text-gray-600 mb-6 line-clamp-3">{test?.description}</p>
          
          <h2 className="text-lg font-medium text-gray-800 mb-3">Test #{order}</h2>
          <p className="text-gray-500 mb-2">Starting in:</p>
          
          <div className="relative flex items-center justify-center w-24 h-24 mb-6">
            <svg className="absolute w-full h-full text-gray-300">
              <circle
                cx="50%"
                cy="50%"
                r="36"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
              />
            </svg>
            <svg className="absolute w-full h-full text-blue-500 transition-all duration-1000 ease-linear" style={{ strokeDasharray: 226, strokeDashoffset: (countdown / 10) * 226 }}>
              <circle
                cx="50%"
                cy="50%"
                r="36"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-3xl font-semibold text-blue-500">{countdown}</span>
          </div>
          
          <p className="text-sm text-gray-600">Get ready to begin!</p>
        </div>
      )}
    </div>
  );
};

export default Test;
