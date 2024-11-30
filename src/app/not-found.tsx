'use client';
import Link from 'next/link';
import Lottie from 'react-lottie';
import * as animationData from '@/utils/404.json';
import { Suspense } from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="max-w-md">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col items-center justify-center w-full min-h-[400px] py-10">
    <Suspense fallback={<div>Loading...</div>}>  <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={300}
        width={300}
      />
      </Suspense>
    </div>
        <div className="flex justify-center">
          <Link href="/" className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Return Home
       
          </Link>
        </div>
      </div>
    </div>
  );
}
