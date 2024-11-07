'use client';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Divider } from '@nextui-org/react';
import StatsSection from '@/components/home/StatsSection';
import SectionsLayout from '@/components/home/HomeSections';
import CustomerFeedBacks from '@/components/home/CustomerFeedBacks';

export default function Home() {
  return (
    <div className="bg-white text-black min-h-screen relative">
      <Head>
        <title>AI Quiz Generator</title>
        <meta name="description" content="Generate AI-powered questions for job descriptions." />
      </Head>

      {/* Hero Section */}
      <main className="flex min-h-screen h-fit backdrop:blur-2xl flex-col bg-gradient-to-r from-slate-50 to-blue-100 items-center justify-center text-center z-10 relative py-20">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Generate AI Powered Questions
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Enter your job description URL to create your quiz effortlessly.
        </motion.p>
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/create">
            <Button className='bg-black text-white'>
              Generate Questions
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-4">
            <h3 className="text-2xl font-bold mb-2">Quick and Easy</h3>
            <p className="text-gray-600">Create Skill Tests with just a few clicks using AI technology.</p>
          </div>
         

          <div className="p-4">
            <h3 className="text-2xl font-bold mb-2">Detailed Analysis</h3>
            <p className="text-gray-600">Get in-depth insights into candidate performance.</p>
          </div>
        </motion.div>
      </main>
      <StatsSection />
      <SectionsLayout />
      <CustomerFeedBacks />
      {/* How It Works Section */}
    </div>
  );
}
