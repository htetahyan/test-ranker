import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const StepOne = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Language of assessment */}
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
          Position
        </label>
        <Field
          name="position"
          type="text"
          placeholder="Enter position"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="position"
          component="div"
          className="mt-1 text-sm text-red-600"
        />
      </div>

      {/* Add more fields here if needed */}
    </div>
  );
};

export default StepOne;
