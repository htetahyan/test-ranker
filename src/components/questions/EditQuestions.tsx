'use client'

import React, { useState } from 'react'
import MyQuestions from './MyQuestions'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import MyQuillEditor from '../textEditor/Editor'
import { IoMdCreate } from 'react-icons/io'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useCreateNewQuestionMutation,
  useDeleteQuestionByIdMutation,

  useGetQuestionsFromVersionIdQuery
} from '@/quries/BaseQuery'

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Title is required').trim("White spaces are not allowed").strict(true),
  duration: Yup.number().min(60, 'Duration must be at least 60 seconds').required('Duration is required'),
})

interface EditQuestionsProps {
  assessmentId: number;
  versionId: number
}

interface CurrentModalState {
  type: 'essay' | 'video' | 'audio' | 'fileAttachment' | '';
}

const EditQuestions = ({ assessmentId,versionId }: EditQuestionsProps) => {
  const [mutate, { isLoading }] = useCreateNewQuestionMutation()

  const { data, isLoading: questionLoading } = useGetQuestionsFromVersionIdQuery({ versionId })
  const [currentModal, setCurrentModal] = useState<CurrentModalState>({ type: '' })

  const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure()

  const formik = useFormik({
    initialValues: {
      question: '',
      description: '',
      duration: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await mutate({
        assessmentId,
        versionId,
        question: values.question,
        description: values.description,
        type: currentModal.type,
        duration: values.duration,
      }).unwrap().finally(() => onClose())
    },
  })

  const handleOpenModal = (type: string) => {
    switch (type) {
      case 'Essay':
        setCurrentModal({ type: 'essay' })
        break
      case 'Video':
        setCurrentModal({ type: 'video' })
        break
      case 'Audio':
        setCurrentModal({ type: 'audio' })
        break
      case 'fileAttachment':
        setCurrentModal({ type: 'fileAttachment' })
        break
      default:
        setCurrentModal({ type: '' })
        break
    }
    onOpen() // Open the modal after setting the correct type
  }

  return (
    <div className='items-center justify-between gap-2 p-4 w-full'>
      <div className='mt-4'>
        <h2 className='text-xl font-bold'>Add new questions</h2>
        <div className='w-full grid grid-cols-4 h-[100px] gap-14 mt-2'>
          {QuestionType.map((item) => (
            <div
              key={item.question}
              onClick={() => handleOpenModal(item.question)}
              className='flex items-center hover:bg-slate-300 cursor-pointer bg-slate-200 shadow-md rounded-lg justify-center gap-4 p-2'
            >
              {item.icon}
              <span className='text-lg'>{item.question}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full mt-4 gap-2 flex justify-center flex-col'>
        <h1 className='text-xl font-bold'>My Questions</h1>
        <MyQuestions questions={data ? data.assessments : []} />
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='full'>
        <ModalContent>
          <>
            <ModalHeader>create a new {currentModal.type} question</ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor='title'>Question Title</label>
                <Input
                  errorMessage={formik.errors.question}
                  isInvalid={!!(formik.errors.question && formik.touched.question)}
                  name='question'
                  onChange={formik.handleChange}
                  value={formik.values.question}
                />

                <label htmlFor='description'>Description</label>
                <div className='h-fit mb-10 overflow-hidden'>
                  <MyQuillEditor formik={formik} name='description' />
                </div>

                <label htmlFor='duration'>Duration</label>
               <Select 
                  errorMessage={formik.errors.duration}
                  isInvalid={!!(formik.errors.duration && formik.touched.duration)}
                  name='duration'
                  value={formik.values.duration as any}
                  onChange={formik.handleChange}>
<SelectItem key={300} value={300}>5 minutes</SelectItem>
<SelectItem key={600} value={600}>10 minutes</SelectItem>
<SelectItem key={900} value={900}>15 minutes</SelectItem>
                  </Select>

                <Button isLoading={isLoading} type='submit'>
                  Submit
                </Button>
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EditQuestions

const QuestionType = [
  { question: 'Essay', icon: <IoMdCreate /> },
  { question: 'Video', icon: <IoMdCreate /> },
  { question: 'Audio', icon: <IoMdCreate /> },
  { question: 'fileAttachment', icon: <IoMdCreate /> },
]
