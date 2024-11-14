import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';

const StatsSection = () => {
  const [viewCount, setViewCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);

  const animateCount = (start: number, end: number, setCount:any) => {
    let current = start;
    const increment = Math.ceil((end - start) / 100); // Smooth increment
    const step = () => {
      if (current < end) {
        current += increment;
        if (current > end) current = end;
        setCount(current);
        requestAnimationFrame(step);
      }
    };
    step();
  };

  useEffect(() => {
    animateCount(0, 300000, setViewCount); // 3M+
    animateCount(0, 300000, setQuizCount);  // 300K+
    animateCount(0, 1000000, setCandidateCount); // 1M
  }, []);

  return (
    <section className="py-16 bg-gray-800 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text  text-white">
          Driving Success for Companies Worldwide
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="bg-white text-black p-10 rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-6xl font-extrabold">
            {viewCount.toLocaleString()}+
          </h3>
          <p className="mt-3 text-xl font-medium">Views Reached</p>
        </motion.div>
        <motion.div
          className="bg-white text-black p-10 rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-6xl font-extrabold">
            {quizCount.toLocaleString()}+
          </h3>
          <p className="mt-3 text-xl font-medium">Total Quizzes Generated</p>
        </motion.div>
        <motion.div
          className="bg-white text-black p-10 rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-6xl font-extrabold">
            {candidateCount.toLocaleString()}+
          </h3>
          <p className="mt-3 text-xl font-medium">Total Candidates</p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
