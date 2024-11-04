'use client'
import { useAppSelector } from '@/store/hooks'
import { setStepTwoData } from '@/store/slice/MultiStepFormSlice'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

const StepTwo = ({ nextStep, prevStep }: { nextStep: () => void, prevStep: () => void }) => {
  const dispatch = useDispatch()
  const { stepTwoData } = useAppSelector((state) => state.multiStepForm)

  const validationSchema = Yup.object().shape({
    url: stepTwoData.useUrl
      ? Yup.string().url().required('URL is required').trim("No leading/trailing spaces allowed").strict(true)
      : Yup.string(),
    description: !stepTwoData.useUrl
      ? Yup.string().required('Description is required').trim("No leading/trailing spaces allowed").strict(true)
      : Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      url: stepTwoData.url ?? '',
      useUrl: stepTwoData.useUrl ?? false,
      description: stepTwoData.description ?? '',
    },
    validationSchema,
    onSubmit: () => {
      const dataToDispatch = stepTwoData.useUrl
        ? { url: formik.values.url, useUrl: true }
        : { description: formik.values.description, useUrl: false }

      dispatch(setStepTwoData(dataToDispatch))
      nextStep()
    },
  })

  const setUseUrl = (value: boolean) => {
    dispatch(setStepTwoData({ ...stepTwoData, useUrl: value }))
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col gap-4 w-full'>
        <h1 className='text-2xl font-bold'>Job Description</h1>
        <p className='text-gray-500'>Provide a URL or manually enter the job description.</p>

        <div className="flex gap-4">
          <Button type="button" onClick={() => setUseUrl(true)} className={`${stepTwoData.useUrl ? 'bg-black' : 'bg-gray-400'} text-white px-4 py-2 rounded-md`}>
            Use URL
          </Button>
          <Button type="button" onClick={() => setUseUrl(false)} className={`${!stepTwoData.useUrl ? 'bg-black' : 'bg-gray-400'} text-white px-4 py-2 rounded-md`}>
            Enter Description
          </Button>
        </div>

        {stepTwoData.useUrl ? (
          <Input
            name='url'
            label='URL'
            isInvalid={!!(formik.touched.url && formik.errors.url)}
            errorMessage={formik.errors.url}
            onChange={formik.handleChange}
            value={formik.values.url}
          />
        ) : (
          <Textarea
            name='description'
            label='Job Description'
            isInvalid={!!(formik.touched.description && formik.errors.description)}
            errorMessage={formik.errors.description}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        )}

        <div className='flex gap-4 w-full justify-between'>
          <Button onClick={prevStep} className='bg-black text-white px-4 py-2 rounded-md'>Previous</Button>
          <Button type='submit' className='bg-black text-white px-4 py-2 rounded-md'>Next</Button>
        </div>
      </div>
    </form>
  )
}

export default StepTwo
