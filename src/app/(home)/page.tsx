'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SkeletonLoading from '@/components/home/SkeletonLoading';

const StatsSection = dynamic(() => import('@/components/home/StatsSection'), { ssr: false });
const SectionsLayout = dynamic(() => import('@/components/home/HomeSections'), { ssr: false });
const CustomerFeedBacks = dynamic(() => import('@/components/home/CustomerFeedBacks'), { ssr: false });

const Page = () => {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <motion.div  className="bg-blue-100 text-black min-h-screen relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-500 rounded-full opacity-20 blur-xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] ,}}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 -right-20 w-80 h-80 bg-gradient-to-r from-pink-300 to-yellow-500 rounded-full opacity-20 blur-xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Hero Section */}
        <main className="flex min-h-screen h-fit flex-col bg-gradient-to-r from-slate-50 to-blue-100 items-center justify-center text-center z-10 relative py-20 px-4">
          <motion.h1
            className="text-5xl md:text-8xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI-Powered Quiz Generation
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-gray-800 mb-6 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Easily generate skill quizzes from any job description and gain deeper insights into candidates’ abilities with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">TrySkillsTest</span>.
          </motion.p>
          <motion.div
            className="flex space-x-4 mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/create">
              <Button variant='bordered' className="bg-black text-white">
                Generate Questions
              </Button>
            </Link>
            <Link href="/learn-more">
              <Button className="bg-white text-black border border-blue-500 hover:bg-gray-100">
                Learn More
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-6 bg-blue-200 bg-opacity-10 backdrop-filter backdrop-blur shadow-lg rounded-lg transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-2">Quick and Easy</h3>
              <p className="text-gray-600">Create skill assessments effortlessly using advanced AI technology.</p>
            </div>
            <div className="p-6 bg-blue-200 bg-opacity-10 backdrop-filter backdrop-blur shadow-lg rounded-lg transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-2">Detailed Analysis</h3>
              <p className="text-gray-600">Gain comprehensive insights into candidate strengths and weaknesses.</p>
            </div>
            <div className="p-6 bg-blue-200 bg-opacity-10 backdrop-filter backdrop-blur shadow-lg rounded-lg transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-2">Customizable</h3>
              <p className="text-gray-600">Tailor each quiz to meet the unique needs of any role or industry.</p>
            </div>
          </motion.div>
        </main>
        
        <StatsSection />
        <SectionsLayout />
        <CustomerFeedBacks />
      </motion.div>
    </Suspense>
  );
};

export default Page;
