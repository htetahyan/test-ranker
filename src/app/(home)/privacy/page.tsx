'use client'
import SkeletonLoading from '@/components/home/SkeletonLoading';
import React from 'react';
import {Suspense} from "react";

const PrivacyPolicy = () => {
  return (
    <Suspense fallback={<SkeletonLoading/>}>
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10 text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6">
          Last Updated: September 4th, 2024
        </p>
        
        <p className="text-base text-gray-700 mb-6">
          Welcome to TrySkillTest! This Privacy Policy describes how TrySkillTest (referred to as “we,” “our,” or “us”) collects, uses, and protects your information when you use our platform at{' '}
          <a href="https://tryskilltest.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-500 transition duration-200">
            tryskilltest.vercel.app
          </a>.
          This policy applies to all users who engage with our services.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          Definitions
        </h2>
        <p className="text-base text-gray-700 mb-4">
          To better understand what information is most relevant to you, here are some definitions:
        </p>
        <ul className="space-y-4">
          <li>
            <strong className="font-semibold">Client:</strong> You have an account with us to access services on TrySkillTest.
          </li>
          <li>
            <strong className="font-semibold">Website Visitor:</strong> You are visiting our website without creating an account.
          </li>
          <li>
            <strong className="font-semibold">User:</strong> Anyone who uses our platform for taking or creating tests, quizzes, or other services.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          1. Information We Collect
        </h2>
        <p className="text-base text-gray-700 mb-4">
          We collect the following types of information to provide and improve our services:
        </p>
        <ul className="space-y-3 list-disc list-inside text-gray-600">
          <li><strong>Personal Information:</strong> such as name, email address, and account preferences.</li>
          <li><strong>Usage Data:</strong> to analyze how you interact with our site.</li>
          <li><strong>Payment Information:</strong> securely collected by our trusted payment providers. We do not store full payment card information.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-base text-gray-700 mb-4">
          We use the collected information to:
        </p>
        <ul className="space-y-3 list-disc list-inside text-gray-600">
          <li>Provide and maintain our platform services.</li>
          <li>Analyze trends to improve user experience.</li>
          <li>Communicate updates and promotions.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          3. Payment Processing
        </h2>
        <p className="text-base text-gray-700 mb-4">
          All payments are processed by third-party providers with secure protocols. We may receive confirmation of successful payments but do not store full payment information.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          4. Data Security
        </h2>
        <p className="text-base text-gray-700 mb-4">
          We take reasonable measures to protect your information, but no online storage method is entirely secure.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          5. Contact Us
        </h2>
        <p className="text-base text-gray-700 mb-4">
          For questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@tryskilltest.com" className="text-blue-600 underline hover:text-blue-500 transition duration-200">
            tryskilltest.vercel.com
          </a>.
        </p>
      </div>
    </div>
    </Suspense>
  );
};

export default PrivacyPolicy;
