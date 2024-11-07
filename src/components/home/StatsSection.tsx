import React, { useState, useEffect } from "react";

const StatsSection = () => {
  const [viewCount, setViewCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);

  const animateCount = (start: number, end: number, setCount: (val: any) => void) => {
    let current = start;
    const increment = 10000; // Increase by 10,000 per count
    const step = () => {
      if ((current < end && increment > 0) || (current > end && increment < 0)) {
        current += increment;
        if (current > end) current = end; // Ensure it doesn't exceed the target value
        setCount(current);
        requestAnimationFrame(step);
      }
    };
    step();
  };

  useEffect(() => {
    animateCount(0, 300000, setViewCount); // 3M+
    animateCount(0, 30000, setQuizCount);  // 300K+
    animateCount(0, 100000, setCandidateCount); // 1M
  }, []);

  return (
    <section className="py-16 bg-slate-50 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-black">
          Driving Success for Companies Worldwide:
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white text-black p-10 rounded-lg shadow-md border-t-4 border-black">
          <h3 className="text-5xl font-extrabold">{viewCount.toLocaleString()}+</h3>
          <p className="mt-3 text-lg font-medium">Views Reached</p>
        </div>
        <div className="bg-white text-black p-10 rounded-lg shadow-md border-t-4 border-black">
          <h3 className="text-5xl font-extrabold">{quizCount.toLocaleString()}+</h3>
          <p className="mt-3 text-lg font-medium">Total Quizzes Generated</p>
        </div>
        <div className="bg-white text-black p-10 rounded-lg shadow-md border-t-4 border-black">
          <h3 className="text-5xl font-extrabold">{candidateCount.toLocaleString()}+</h3>
          <p className="mt-3 text-lg font-medium">Total Candidates</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
