'use client'

import { useGenerateMoreTestMutation, useGetMultipleChoiceAndOptionsQuery } from '@/quries/BaseQuery'
import React from 'react'
import MultipleChoice from './MultipleChoice'
import { Button, Modal, ModalBody, ModalContent, Skeleton, useDisclosure,Input, Slider, Textarea } from '@nextui-org/react'
import GenerateTestWithAi from '../assessments/GenerateTestWithAi'

import AddATest from '../tests/AddATest'
import { FaArrowRight, FaPlusCircle } from 'react-icons/fa'
import {  Bar, Pie } from "react-chartjs-2";
import { CategoryScale,registerables } from "chart.js";
import Chart from "chart.js/auto";

import Link from 'next/link'
import TestDragNDrop from '../assessments/TestDragNDrop'
import { useFormik } from 'formik'
import * as Yup from 'yup'
Chart.register(...registerables );
const validationSchema = Yup.object().shape({
    prompt: Yup.string().required('Prompt is required'),
    questionsCount: Yup.number().required('Questions Count is required').min(2, 'Questions Count is too short').strict(true),
})

const MultipleChoicesContainer = ({ id,versionId }: { id: number,versionId:number }) => {
    const { data: array, isLoading, isSuccess } = useGetMultipleChoiceAndOptionsQuery({ id ,versionId})
    const [mutate,{isLoading:isGenerating}]=useGenerateMoreTestMutation()
    const sortMultipleChoiceByOrderNumberDesc =  array?.data?.multipleChoiceQuestions ?? [] 
    const {isOpen,onClose,onOpen,onOpenChange}=useDisclosure()
const formik=useFormik({
  initialValues:{prompt:'',questionsCount:2},
  onSubmit:async(values)=>{
      mutate({id,questionsCount:values.questionsCount,prompt:values.prompt,versionId}).unwrap().finally(()=>onClose())
  },
  validationSchema
})
  
    if (isLoading) {
        return <Skeleton />
    }

    return (
       
        <div className="w-screen relative overflow-x-hidden mt-4 grid justify-center gap-10">
      {//draft
      }
      
{/*           <div className="w-full mt-4 grid justify-end gap-10">  <AddATest id={id} /></div>
 */}           <div className='w-full mb-10 '> {sortMultipleChoiceByOrderNumberDesc?.length > 0 ? (
                sortMultipleChoiceByOrderNumberDesc?.map((m: any,i:number) => (
                    <MultipleChoice key={i} MultipleChoice={m} />
                ))
            ) : (
                <GenerateTestWithAi versionId={versionId} assessmentId={id} text={"generate test with ai"} />
            )}</div>
            {isLoading &&  <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      
      }<div className='h-[10vh] z-20 bg-white w-full items-center px-2 gap-10 flex justify-around fixed bottom-0'>

      {isSuccess && sortMultipleChoiceByOrderNumberDesc.length>0 &&  <GenerateTestWithAi assessmentId={id} versionId={versionId} text={'Delete all tests and regenerate'}  />}
      {isSuccess && sortMultipleChoiceByOrderNumberDesc.length>0 && <Button onClick={onOpen} color='secondary' variant='solid' className='bg-gradient-to-r from-purple-600 to-pink-600 text-white' >Custom prompt</Button>}
      <Link href={`/assessments/${id}/${versionId}/edit/custom-tests`}> 

       <Button  endContent={<FaArrowRight/>}  variant='solid' className='bg-black text-white' >Next</Button>    </Link>
       <Modal size='md' isDismissable={false} isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
        <ModalContent>{(onClose) => (
            <ModalBody>
                
            <h1 className='text-2xl font-bold mb-4'>Custom prompt</h1>   
            <form onSubmit={formik.handleSubmit}>
            <Textarea className={' mb-4'}  color='secondary' name='prompt' onChange={formik.handleChange} isInvalid={!!(formik.errors.prompt && formik.touched.prompt)} value={formik.values.prompt} errorMessage={formik.errors.prompt} placeholder='generate tests more focus on...'  />   
            <Slider 
                                    label="Questions Count" 
                                    name='questionsCount'
                                    showSteps={true}
                                    color='secondary'
                                    
                                    onChangeEnd={(value) => formik.setFieldValue('questionsCount', value)} 
                                    value={formik.values.questionsCount}
                                    maxValue={10} 
                                    minValue={0} 
                                    size='lg'
                                    className="max-w-md"
                                />
                                {formik.errors.questionsCount && formik.touched.questionsCount && <p className='text-red-500'>
                                    {formik.errors.questionsCount}</p>}  
                                    <Button isLoading={isGenerating} isDisabled={isGenerating} type='submit' color='secondary' variant='solid' className='bg-purple-600 text-white' >Generate</Button>
                                    </form>
                                     </ModalBody>
                  
        )}
            </ModalContent>
        </Modal>
   
      </div>
        </div>
    )
}

export default MultipleChoicesContainer

