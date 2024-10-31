// use client
import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '@/utils/empty_animation.json';

const Empty = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] py-10">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">{text}</h1>
      <Lottie
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
    </div>
  );
};

export default Empty;
