import { useScroll, motion } from 'framer-motion';
import React from 'react';
import { FaStar } from 'react-icons/fa';

const CustomerFeedBacks = () => {
  const feedbacks = [
    {
      name: 'Michael Johnson',
      date: 'November 1, 2024',
      rating: 5,
      comment: 'Absolutely fantastic service! The AI-powered questions helped us streamline our hiring process like never before.',
    },
    {
      name: 'Emily Davis',
      date: 'November 2, 2024',
      rating: 4,
      comment: 'Great tool with intuitive design. It made sharing tests with candidates extremely easy and efficient.',
    },
    {
      name: 'Sophia Lee',
      date: 'November 3, 2024',
      rating: 5,
      comment: 'The detailed test results and AI analysis provided invaluable insights into our candidates’ strengths and weaknesses.',
    },
    {
      name: 'Daniel Wilson',
      date: 'November 4, 2024',
      rating: 4,
      comment: 'I highly recommend the AI Quiz Generator. The platform offers a wide range of features and customization options.',
    },
    {
      name: 'Ahmad Leem',
      date: 'November 5, 2024',
      rating: 5,
      comment: 'The AI-powered questions helped us streamline our hiring process like never before.',
    },
  ];
  const { scrollYProgress } = useScroll();

  return (
    <div className='min-h-screen py-20 bg-gradient-to-r z-10 from-slate-50 to-blue-100 relative'>
      <div className='absolute top-1/4 z-0 left-1/5 w-64 h-64 bg-slate-300  rounded-full'></div>
      <div className='max-w-6xl mx-auto px-6'>
        <h1 className='text-5xl font-bold text-center mb-16'>Customer Feedback</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
          {feedbacks.map((feedback, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.1, ease: 'anticipate' }}
              className='bg-blue-200 bg-opacity-10 backdrop-filter backdrop-blur-md text-black rounded-lg cursor-pointer p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 relative'
            >
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-2xl font-semibold'>{feedback.name}</h2>
                <div className='flex items-center'>
                  {[...Array(5)].map((star, i) => (
                    <FaStar key={i} className={i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
              <p className='text-gray-700'>{feedback.comment}</p>
              <p className='text-gray-500 text-sm mt-2'>{feedback.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedBacks;
