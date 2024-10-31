'use client';

import React from 'react';
import {
  Button,
  ModalContent,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Textarea,
  Checkbox,
} from '@nextui-org/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddNewMultipleChoiceAndOptionsMutation } from '@/quries/adminQuery'; // Corrected import path
import { useRouter } from 'next/navigation';

// Define the form fields
interface FormValues {
  question: string;
  description: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOptions: {
    option1: boolean;
    option2: boolean;
    option3: boolean;
    option4: boolean;
  };
}

// Define the payload format for the API
interface Option {
  content: string;
  isCorrect: boolean;
}

interface Payload {
  question: string;
  description: string;
  testId: number;
  options: Option[];
}

// Validation schema
const validationSchema = Yup.object({
  question: Yup.string().required('Question is required'),
  description: Yup.string().required('Description is required'),
  option1: Yup.string().required('Option 1 is required'),
  option2: Yup.string().required('Option 2 is required'),
  option3: Yup.string().required('Option 3 is required'),
  option4: Yup.string().required('Option 4 is required'),
});

interface AddMultipleChoiceProps {
  testId: number;
}

const AddMultipleChoice: React.FC<AddMultipleChoiceProps> = ({ testId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [mutate, { isLoading }] = useAddNewMultipleChoiceAndOptionsMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      question: '',
      description: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctOptions: { option1: true, option2: false, option3: false, option4: false },
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Build the options array for the payload
        const options = [
          { content: values.option1, isCorrect: values.correctOptions.option1 },
          { content: values.option2, isCorrect: values.correctOptions.option2 },
          { content: values.option3, isCorrect: values.correctOptions.option3 },
          { content: values.option4, isCorrect: values.correctOptions.option4 },
        ];

        // Construct payload
        const res = await mutate({
          question: values.question,
          description: values.description,
          testId,
          options,
        }).unwrap()
        if (res?.message === "success") {
          onClose();
        }
      } catch (error) {
        console.error("An error occurred while submitting the form:", error);
      }
    },
  });

  return (
    <div className="p-4">
      <Button color="primary" onClick={onOpen}>
        Add Custom Test
      </Button>
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isDismissable={false}>
        <ModalContent>
          <ModalHeader>
            <h2 className="text-2xl font-semibold">Add Custom Test</h2>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <Input
                  label="Question"
                  placeholder="Enter the question here"
                  {...formik.getFieldProps('question')}
                  isInvalid={formik.touched.question && !!formik.errors.question}
                />
                {formik.touched.question && formik.errors.question && (
                  <p className="text-red-500">{formik.errors.question}</p>
                )}

                <Textarea
                  label="Description"
                  placeholder="Enter a description for the question"
                  {...formik.getFieldProps('description')}
                  isInvalid={formik.touched.description && !!formik.errors.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500">{formik.errors.description}</p>
                )}
              </div>

              {/* Options with Checkboxes */}
              <div className="flex flex-col gap-4">
                {(['option1', 'option2', 'option3', 'option4'] as const).map((option, index) => (
                  <div key={option} className="flex items-center gap-2">
                    <Input
                      label={`Option ${index + 1}`}
                      placeholder={`Enter option ${index + 1}`}
                      {...formik.getFieldProps(option)}
                      isInvalid={formik.touched[option] && !!formik.errors[option]}
                    />
                    <Checkbox
                      isSelected={formik.values.correctOptions[option]}
                      onChange={(e) =>
                        formik.setFieldValue(`correctOptions.${option}`, e.target.checked)
                      }
                    >
                      Correct
                    </Checkbox>
                    {formik.touched[option] && formik.errors[option] && (
                      <p className="text-red-500">{formik.errors[option]}</p>
                    )}
                  </div>
                ))}
              </div>

              <Button isDisabled={isLoading} type="submit" isLoading={isLoading} color="success">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddMultipleChoice;
