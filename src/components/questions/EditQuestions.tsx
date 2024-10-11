'use client'

import React from 'react'
import MyQuestions from './MyQuestions'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import MyQuillEditor from '../textEditor/Editor'
import { IoMdCreate } from 'react-icons/io'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateNewQuestionMutation, useGetQuestionsFromAssessmentIdQuery } from '@/quries/BaseQuery'
const validationSchema = Yup.object().shape({
  question: Yup.string().required('Title is required').trim("White spaces are not allowed").strict(true),
})
const EditQuestions = ({assessmentId}:{assessmentId:number}) => {
  const [mutate,{isLoading}]=useCreateNewQuestionMutation()
  const {data,isLoading:questionLoading}= useGetQuestionsFromAssessmentIdQuery({assessmentId})
  const [currentModal, setCurrentModal] = React.useState<any>({})
console.log(data);

 
  const formik = useFormik({
    initialValues: {
      question: '',
      description: '',
    },
    onSubmit: async(values) => {
    await mutate({assessmentId:assessmentId,question:values.question,description:values.description}).unwrap()
    },validationSchema:validationSchema

  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  
  const handleOpenModal = ({ type }: any) => {
    switch (type) {
      case 'Essay':
        setCurrentModal({ type: 'essay' })
        break // Add break to stop execution here
      case 'Video':
        setCurrentModal({ type: 'video' })
        break // Add break
      case 'Audio':
        setCurrentModal({ type: 'audio' })
        break // Add break
      case 'fileAttachment':
        setCurrentModal({ type: 'fileAttachment' })
        break // Add break
      default:
        setCurrentModal({})
        break
    }
    onOpen() // Open the modal after setting the correct type
  }

  return (
    <div className='items-center justify-between gap-2 p-4 w-full'>
      <div className='mt-4'>
        <h2 className='text-xl font-bold'>Add new questions</h2>
        <div className='w-full grid grid-cols-4 h-[100px] gap-14 mt-2'>
          {QuestionType.map((item: any) => (
            <div
              key={item.question}
              onClick={() => handleOpenModal({ type: item.question })}
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
        <MyQuestions  questions={data?data.assessments:[]}/>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='full'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader >create a new {currentModal.type} question</ModalHeader>
              <ModalBody>
<form onSubmit={formik.handleSubmit}>
  <label htmlFor='title'>Question Title</label>
  <Input errorMessage={formik.errors.question} isInvalid={!!(formik.errors.question && formik.touched.question) } name='question' onChange={formik.handleChange} value={formik.values.question} />
<label htmlFor='description'>Description</label>
          <div className='h-[70vh]' >    <MyQuillEditor formik={formik} name='description' /></div> 
                <Button isLoading={isLoading} type='submit'>Submit</Button>
</form>
              </ModalBody>
            </>
          )}
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
