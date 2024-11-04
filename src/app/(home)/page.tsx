'use client';

import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';

export default function Home() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Head>
        <title>AI Quiz Generator</title>
        <meta name="description" content="Generate AI-powered questions for job descriptions." />
      </Head>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center h-[80vh]">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Generate AI Powered Questions
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Enter your job description URL to create your quiz effortlessly.
        </motion.p>
        <motion.div
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
      </main>

      {/* Features Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-gray-100 py-20">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 }
          }}
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Tool?</h2>
          <p className="text-gray-700 mb-12 max-w-lg">
            Optimize your hiring process with AI-powered, customizable questions designed for speed and accuracy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Automated Questions', desc: 'AI generates questions based on job requirements.' },
              { title: 'Customizable', desc: 'Adjust questions to meet specific hiring needs.' },
              { title: 'Fast & Reliable', desc: 'Receive accurate questions instantly.' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 bg-gray-200 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-white text-black py-20">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 }
          }}
        >
          <h2 className="text-4xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 'Step 1', desc: 'Paste your job description URL.' },
              { step: 'Step 2', desc: 'Our AI analyzes the requirements.' },
              { step: 'Step 3', desc: 'Receive tailored questions in seconds.' }
            ].map((process, index) => (
              <motion.div
                key={index}
                className="p-8 bg-gray-100 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-2">{process.step}</h3>
                <p className="text-gray-600">{process.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-200 text-gray-600 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} AI Quiz Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
