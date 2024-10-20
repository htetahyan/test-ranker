'use client';

import { SelectQuestions } from '@/db/schema/schema';
import React, { useEffect, useState } from 'react';
import MyQuillEditor from '../textEditor/Editor';
import { useFormik } from 'formik';
import Timer from './timer';
import { Input } from '@nextui-org/react';
import { useAnswerQuestionMutation } from '@/quries/CandidateQuery';
import { useRouter } from 'next/navigation';

const Question = ({ questions, candidateUniqueId,uniqueId }: { questions: SelectQuestions; candidateUniqueId: string,uniqueId:string }) => {
  const [mutate] = useAnswerQuestionMutation();

  const [isTimeUp, setTimeUp] = useState(false);
const router=useRouter()
router.prefetch(`/candidate/${uniqueId}/${candidateUniqueId}/questions/${questions.order + 1}`);
  const formik = useFormik({
    onSubmit: async (values) => {

      const res = await mutate({
        candidateUniqueId: candidateUniqueId,
        answer: values.answer!,
        questionId: questions!.id!,
        file: values!.file!
      }).unwrap().finally(() => {
        router.push(`/candidate/${uniqueId}/${candidateUniqueId}/questions/${questions.order + 1}`);

      })

     
     
    },
    initialValues: {
      answer: null,
      file: null,
    }
  });

 

  useEffect(() => {
    if (isTimeUp) {
formik.handleSubmit();    }
  }, [isTimeUp]);
const fileChange = (e: any) => {
  const file = e.target.files[0];
  formik.setFieldValue('file', file);
}
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Timer duration={10} setIsTimeUp={setTimeUp} />
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center justify-center w-full h-fit bg-gray-100">
          <div className="grid w-full  grid-cols-1 gap-8 p-8 bg-white shadow-2xl sm:grid-cols-2 rounded-xl">
            <div className="flex flex-col p-6 space-y-6">
              <h1 className="text-4xl font-extrabold text-center text-gray-800">{questions?.question}</h1>
              <div className="prose prose-lg text-gray-700" dangerouslySetInnerHTML={{ __html: questions?.description }}></div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 space-y-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">Your Answer</h2>
              {questions.type === 'essay' ? (
                <MyQuillEditor formik={formik} name="answer" />
              ) : questions.type === 'video' ? (
                <Input placeholder="Upload video" accept="video/*" type="file" name="answer" onChange={fileChange} />
              ) : questions.type === 'audio' ? (
                <Input placeholder="Upload audio" accept="audio/*" type="file" name="answer" onChange={fileChange} />
              ) : questions.type === 'fileAttachment' ? (
                <Input placeholder="Upload file" accept="*" type="file" name="answer" onChange={fileChange} />
              ) : null}
              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Question;
