import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold text-green-600">Success!</h1>
        <p className="mt-4 text-gray-700">Your form has been submitted successfully. Thank you for your time!</p>
        
        <button 
          className="mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-default"
          disabled
        >
          Form Submitted
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
