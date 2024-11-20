'use client';

import { SelectQuestions } from '@/db/schema/schema';
import React, { useEffect, useState } from 'react';
import MyQuillEditor from '../textEditor/Editor';
import { useFormik } from 'formik';
import Timer from './timer';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useAnswerQuestionMutation } from '@/quries/CandidateQuery';
import { useRouter } from 'next/navigation';

const Question = ({ questions, candidateUniqueId, uniqueId }: { questions: SelectQuestions; candidateUniqueId: string; uniqueId: string }) => {
  const [mutate, { isLoading }] = useAnswerQuestionMutation();
  const [isTimeUp, setTimeUp] = useState(false);
  const router = useRouter();

  router.prefetch(`/candidate/${uniqueId}/${candidateUniqueId}/questions/${questions.order + 1}`);

  const formik = useFormik({
    onSubmit: async (values) => {
      try {
        await mutate({
          candidateUniqueId,
          answer: values.answer!,
          questionId: questions.id!,
          file: values.file!,
        }).unwrap();

        router.push(`/candidate/${uniqueId}/${candidateUniqueId}/questions/${questions.order + 1}`);
      } catch (error) {
        console.error('Submission failed:', error);
      }
    },
    initialValues: {
      answer: null,
      file: null,
    },
  });

  useEffect(() => {
    if (isTimeUp) {
      formik.handleSubmit();
    }
  }, [isTimeUp]);

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    formik.setFieldValue('file', file);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-6 space-y-6 md:py-12">
      <Timer duration={questions.duration} setIsTimeUp={setTimeUp} />
      <form onSubmit={formik.handleSubmit} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-6 bg-white shadow-md sm:grid-cols-2 rounded-xl">
          {/* Question Section */}
          <div className="flex flex-col p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">{questions?.question}</h1>
            <div
              className="text-gray-700 prose"
              dangerouslySetInnerHTML={{ __html: questions?.description }}
            ></div>
          </div>

          {/* Answer Section */}
          <div className="flex flex-col p-6 space-y-4 bg-gray-50 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-700">Your Answer</h2>
            {questions.type === 'essay' && <MyQuillEditor formik={formik} name="answer" />}
            {['video', 'audio', 'fileAttachment'].includes(questions.type) && (
              <Input
                placeholder={`Upload ${questions.type}`}
                type="file"
                accept={questions.type === 'video' ? 'video/*' : questions.type === 'audio' ? 'audio/*' : '*'}
                onChange={fileChange}
              />
            )}
            <Button
              type="submit"
              isDisabled={formik.isSubmitting || isLoading}
              className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-black/80 disabled:bg-gray-400"
            >
              {isLoading ? <Spinner  /> : 'Submit Answer'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Question;
