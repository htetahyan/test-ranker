import React from 'react';

const BillingPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-xl shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Billing Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plan Info */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Current Plan</h2>
          <p className="text-gray-500 text-lg">Premium Plan</p>
          <p className="text-sm text-gray-400 mt-4">You are on a Premium plan that offers unlimited access to all features.</p>
        </div>

        {/* Next Billing Date */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Next Billing Date</h2>
          <p className="text-gray-500 text-lg">November 25, 2024</p>
          <p className="text-sm text-gray-400 mt-4">Your next billing date is automatically scheduled based on your billing cycle.</p>
        </div>

        {/* Billing Cycle */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Billing Cycle</h2>
          <p className="text-gray-500 text-lg">Monthly</p>
          <p className="text-sm text-gray-400 mt-4">Your plan is billed every month on the same day.</p>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Payment Method</h2>
          <p className="text-gray-500 text-lg">Stripe</p>
          <p className="text-sm text-gray-400 mt-4">Change or update your payment method anytime.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-12">
        {/* Update Payment Method */}
        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          Update Payment Method
        </button>

        {/* Cancel Plan */}
        <button className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
          Cancel Plan
        </button>
      </div>
    </div>
  );
};

export default BillingPage;
