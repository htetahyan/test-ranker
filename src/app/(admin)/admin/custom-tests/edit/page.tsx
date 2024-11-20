// page.tsx
import { getAllMultipleChoiceAndOptions } from '@/service/assessments.service';
import React from 'react';
import AddMultipleChoice from '@/components/admin/AddMultipleChoice';
import {Checkbox} from '@nextui-org/react'; // Import your Checkbox component

const page = async (props: { searchParams: Promise<{ id: string }> }) => {
  const { id } = await props.searchParams;
  const data = await getAllMultipleChoiceAndOptions({ id: parseInt(id) });
console.log(data)
  return (
    <div className="grid gap-4 p-4">
      {/* Map through the data array to display each question */}
      {data.map((item) => (
        <div key={item.question.id} className="bg-gray-100 p-4 rounded shadow-md">
          <h3 className="text-lg font-bold">{item.question.question}</h3>
          <p className="text-sm text-gray-600">{item.question.description}</p>
          
          <div className="mt-4">
            {Object.entries(item.options).map(([key, value]) => (
              <div key={key} className="flex items-center mb-2">
                {/* Checkbox to indicate if the current option is the solution */}
                <Checkbox isSelected={Number(key) === item.solution} />
                <label htmlFor={`option-${key}`} className="ml-2">{value}</label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add button below the question display */}
      <div className="mt-4">
        <AddMultipleChoice testId={parseInt(id)} />
      </div>
    </div>
  );
};

export default page;
