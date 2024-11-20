import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const [viewCount, setViewCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);

  const animateCount = (start: number, end: number, setCount: any) => {
    let current = start;
    const increment = Math.ceil((end - start) / 100);
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
    animateCount(0, 300000, setViewCount);
    animateCount(0, 300000, setQuizCount);
    animateCount(0, 1000000, setCandidateCount);
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600">
          Driving Success for Companies Worldwide
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[
          { count: viewCount, label: "Views Reached" },
          { count: quizCount, label: "Total Quizzes Generated" },
          { count: candidateCount, label: "Total Candidates" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white text-black p-8 md:p-10 rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + index * 0.2 }}
          >
            <h3 className="text-5xl sm:text-6xl font-extrabold">
              {stat.count.toLocaleString()}+
            </h3>
            <p className="mt-3 text-lg sm:text-xl font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
