'use client';

import { SelectMultipleChoicesQuestions, SelectOptions } from '@/db/schema/schema';
import { Button, Input, Checkbox } from '@nextui-org/react';
import React, { useState } from 'react';
import { MdEdit, MdClose, MdCheck, MdPlusOne } from 'react-icons/md';
import { useFormik } from 'formik';
import { useEditMultipleChoiceQuestionMutation } from '@/quries/BaseQuery';
import MyQuillEditor from '../textEditor/Editor';
import { Bar, Pie, Line, PolarArea } from 'react-chartjs-2';

const MultipleChoice = ({ MultipleChoice }: { MultipleChoice: { question: SelectMultipleChoicesQuestions, options: SelectOptions[] } }) => {
  const orderedOptions = MultipleChoice?.options && [...MultipleChoice?.options].sort((a, b) => {
    return (a?.order ?? 0) - (b?.order ?? 0);
  });

  const [mutate, { isLoading }] = useEditMultipleChoiceQuestionMutation();
  const [isEditing, setIsEditing] = useState({
    question: false,
    options: [false, false, false, false], // This tracks the edit state for each option
  });

  // Handle editing state for the question
  const handleEditQuestion = () => {
    setIsEditing((prev) => ({ ...prev, question: !prev.question }));
  };

  // Handle editing state for options
  const handleEditOption = (index: number) => {
    setIsEditing((prev) => {
      const newOptions = [...prev.options];
      newOptions[index] = !newOptions[index];
      return { ...prev, options: newOptions };
    });
  };

  // Validation function to ensure at least one option is correct and not all are correct
  const validateOptions = (values: any) => {
    const errors: any = {};
    const correctOptions = values.options.filter((option: any) => option.isCorrect);

    if (correctOptions.length === 0) {
      errors.options = 'At least one option must be marked as correct.';
    } else if (correctOptions.length === 4) {
      errors.options = 'All options cannot be correct. Please deselect one or more.';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      question: MultipleChoice?.question?.question,
      options: orderedOptions?.map(option => ({
        option: option.content,
        isCorrect: option.isCorrect,
        id: option.id,
      })),
    },
    validate: validateOptions,
    onSubmit: async (values) => {
      mutate({ ...values, id: MultipleChoice.question.id }).unwrap();
    },
  });

  return (
    <div className="mt-4 w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-6 overflow-hidden">
          <div className='flex items-center justify-between'>
            <h1 className="text-gray-700 text-2xl font-bold mb-4">{MultipleChoice.question.order}</h1>
            <Button color='danger' isIconOnly endContent={<MdClose />}></Button>
          </div>
          <div className="flex gap-2">
            {isEditing.question ? (
              <>
                <MyQuillEditor formik={formik} name="question" />
                <Button isIconOnly={true} endContent={<MdCheck />} onPress={handleEditQuestion}></Button>
                <Button isIconOnly={true} endContent={<MdClose />} onPress={handleEditQuestion}></Button>
              </>
            ) : (
              <>
                {MultipleChoice.question.type === 'multiple-choice' && (
                  <div>
                    <h1 className="text-gray-700 text-2xl font-bold mb-4">{formik.values.question}</h1>
                    <p>{MultipleChoice.question.description}</p>
                  </div>
                )}
                {MultipleChoice.question.type === 'essay' && (
                  <div>
                    <h1 className="text-gray-700 text-2xl font-bold mb-4">{formik.values.question}</h1>
                    <p>{MultipleChoice.question.description}</p>
                  </div>
                )}

                {MultipleChoice.question.type === 'pie' && (
                  <div className="w-full">
                    <h1 className="text-gray-700 text-2xl font-bold mb-4">{formik.values.question}</h1>
                    <p>{MultipleChoice.question.description}</p>
                    <div className="w-1/2">
                      <Pie
                        data={{
                          labels: [...(MultipleChoice.question.label || [])],
                          datasets: [
                            { data: [...(MultipleChoice.question.data || [])], backgroundColor: [...(MultipleChoice.question.background || [])] }
                          ]
                        }}
                      />
                    </div>
                  </div>
                )}

                {MultipleChoice.question.type === 'bar' && (
                  <div className="w-full">
                    <h1 className="text-gray-700 text-2xl font-bold mb-4">{formik.values.question}</h1>
                    <p>{MultipleChoice.question.description}</p>
                    <div className="w-1/2">
                      <Bar
                        options={{ plugins: { legend: { display: false } } }}
                        data={{
                          labels: [...(MultipleChoice.question.label || [])],
                          datasets: [
                            { data: [...(MultipleChoice.question.data || [])], backgroundColor: [...(MultipleChoice.question.background || [])] }
                          ]
                        }}
                      />
                    </div>
                  </div>
                )}

                {MultipleChoice.question.type === 'line' && (
                  <div className="w-full">
                    <h1 className="text-gray-700 text-2xl font-bold mb-4">{formik.values.question}</h1>
                    <p>{MultipleChoice.question.description}</p>
                    <div className="w-1/2">
                      <Line
                        options={{ plugins: { legend: { display: false } } }}
                        data={{
                          labels: [...(MultipleChoice.question.label || [])],
                          datasets: [
                            { data: [...(MultipleChoice.question.data || [])], backgroundColor: [...(MultipleChoice.question.background || [])] }
                          ]
                        }}
                      />
                    </div>
                  </div>
                )}

                {MultipleChoice.question.type === 'polar' && (
                  <div className="w-full">
                    <h1 className="text-gray-700 text-2xl font-bold mb-4">{formik.values.question}</h1>
                    <p>{MultipleChoice.question.description}</p>
                    <div className="w-1/2">
                      <PolarArea
                        data={{
                          labels: [...(MultipleChoice.question.label || [])],
                          datasets: [
                            { data: [...(MultipleChoice.question.data || [])], backgroundColor: [...(MultipleChoice.question.background || [])] }
                          ]
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col mt-4 gap-2 items-center">
            {orderedOptions.map((option, i) => (
              <div key={i} className="flex gap-2 w-full items-center">
                <p className="text-gray-500">{option.order}</p>
                <Input
                  name={`options[${i}].option`}
                  value={formik.values.options[i].option}
                  onChange={formik.handleChange}
                  disabled={!isEditing.options[i]} // Disable based on individual option edit state
                  variant={isEditing.question ? 'underlined' : 'flat'}
                  label="Option"
                  size="lg"
                />
                <Checkbox
                  isSelected={formik.values.options[i].isCorrect}
                  onChange={(e) => {
                    formik.setFieldValue(`options[${i}].isCorrect`, e.target.checked);
                  }}
                  disabled={!isEditing.options[i]} // Disable based on edit state
                >
                  Correct
                </Checkbox>
                {isEditing.options[i] ? (
                  <>
                    <Button isIconOnly={true} endContent={<MdCheck />} onPress={() => handleEditOption(i)}></Button>
                    <Button isIconOnly={true} endContent={<MdClose />} onPress={() => handleEditOption(i)}></Button>
                  </>
                ) : (
                  <Button isIconOnly={true} endContent={<MdEdit />} onPress={() => handleEditOption(i)}></Button>
                )}
              </div>
            ))}
          </div>
          {/* Display validation error for options */}
          {formik.errors.options && <div className="text-red-500 mt-2">{formik.errors.options as string}</div>}

          {/* Submit button for the entire form */}
          <Button isDisabled={isLoading} isLoading={isLoading} type="submit">
            Submit All
          </Button>
        </div>
        <div className="w-full flex items-center justify-center">
        </div>
      </form>
    </div>
  );
};

export default MultipleChoice;
