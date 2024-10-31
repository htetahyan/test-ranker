'use client'
import { useAppSelector } from '@/store/hooks'
import { setStepOneData } from '@/store/slice/MultiStepFormSlice'
import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { jobs, jobsArray } from '@/utils/jobs'
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name is too short').trim("white spaces are not allowed").strict(true),
    jobRole: Yup.string().required('Job Role is required'),
})
const StepOne = ({nextStep,prevStep}:{nextStep:()=>void,prevStep:()=>void}) => {
    const dispatch=useDispatch()
    const {stepOneData}=useAppSelector((state)=>state.multiStepForm)
    const formik=useFormik({
        initialValues:{
        name:stepOneData.name??'',
        jobRole:stepOneData.jobRole??'',
        },
        onSubmit:()=>{
dispatch(setStepOneData(formik.values))
nextStep()
        },validationSchema
    })

  return (
    <form onSubmit={formik.handleSubmit}>'
    <div className='flex flex-col gap-4 w-full'>
        <h1 className='text-2xl font-bold'>Give this assessment a name and job role</h1>
        <p className='text-gray-500'>This will be the name of the assessment and the job role it will be assigned to.</p>

        <Input name='name' label='Name' isInvalid={!!(formik.touched.name && formik.errors.name)} errorMessage={formik.errors.name} onChange={formik.handleChange} value={formik.values.name} />
      <Autocomplete
      allowsCustomValue 
      label='Job Role'
      isInvalid={!!(formik.touched.jobRole && formik.errors.jobRole)}
      errorMessage={formik.errors.jobRole}
     
onInputChange={(e) => formik.setFieldValue('jobRole', e)}
      name='jobRole'
      onSelectionChange={(e) => formik.setFieldValue('jobRole', e)}
      defaultItems={jobs}>
        {(item)=><AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
      </Autocomplete>
        <div className='flex gap-4 w-full justify-end'>
        <Button type='submit' className='bg-black text-white px-4 py-2 rounded-md'>Next</Button>
        </div>
          </div></form>
  )
}

export default StepOne
