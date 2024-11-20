import React from 'react';

const HeroSection = () => {
  return (
    <div className="w-full bg-gray-900 text-white py-16 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Cut Text-to-Speech Costs by Up to <span className="text-indigo-500">90%</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Experience premium text-to-speech quality at a fraction of the price. Up to 10x cheaper than other popular providers.
        </p>
      
      </div>

      <div className="mt-12 bg-gray-800 rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Live Demo</h2>
        <p className="text-gray-300 mb-6">
          Test out our API and experience high-quality, realistic speech generation. Choose a category and try it now!
        </p>

        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-md">Non-Fiction</button>
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-md">Fiction</button>
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-md">News</button>
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-md">Blog</button>
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-md">Conversation</button>
        </div>

        <textarea
          className="w-full bg-gray-700 text-gray-200 p-4 rounded-md"
        
          placeholder="Type or paste text here to generate speech..."
        ></textarea>

        <div className="flex items-center justify-between mt-4">
          <div>
            <label className="text-gray-400 mr-2">Voice:</label>
            <select className="bg-gray-700 text-gray-200 p-2 rounded-md">
              <option>Zoë</option>
              <option>John</option>
              <option>Emma</option>
            </select>
          </div>

          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            Synthesize
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
