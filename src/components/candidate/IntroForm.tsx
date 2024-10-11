'use client'

import * as Yup from 'yup'
import React from 'react'
import { useFormik } from 'formik'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { SelectAssessments } from '@/db/schema/schema'

import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import { useCreateNewCandidateMutation } from '@/quries/CandidateQuery'

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Name is required')
    .min(3, 'Name is too short')
    .trim("white spaces are not allowed")
    .strict(true),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .trim("white spaces are not allowed")
    .strict(true),
  check: Yup.boolean().oneOf([true], 'You must accept that the information is correct')
})

const IntroForm = ({ assessment }: { assessment: SelectAssessments }) => {
  const router = useRouter()
  const [mutate,{isLoading}]=useCreateNewCandidateMutation()
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      check: false
    },
    onSubmit: async (values) => {
      // Handle form submission
      const res=await mutate({fullName:values.fullName,email:values.email,assessmentId:assessment?.id}).unwrap()
      if( res.message==="success"){
        router.push(`/candidate/${assessment?.uniqueId}/${res.generatedUrl}`)
    }
    },
    validationSchema: validationSchema
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 ">
      <div className="w-full max-w-lg bg-white  shadow-md rounded-lg p-8">
        <h3 className="text-xl font-semibold text-center mb-6">Please Fill in Your Information</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-6 ">
          
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <Input
              isInvalid={!!(formik.errors.fullName && formik.touched.fullName)}
              id="fullName"
              errorMessage={formik.errors.fullName}
              name="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              className="mt-1 block w-full p-3 borderrounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your full name"
            />
           
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              isInvalid={!!(formik.errors.email && formik.touched.email)}
              id="email"
              errorMessage={formik.errors.email}
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="mt-1 block w-full p-3 borderrounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
            
          </div>

          {/* Checkbox */}
          <div className="flex items-center w-full">
            <Checkbox
              isInvalid={!!(formik.errors.check && formik.touched.check)}
              checked={formik.values.check}
              onChange={() => formik.setFieldValue('check', !formik.values.check)}
              name="check"
              id="check"
              className=" text-indigo-600 border-gray-300 rounded"
            >
             All informations on above are correct
            </Checkbox>
          
          </div>
          {formik.errors.check && formik.touched.check && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.check}</p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={isLoading}
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default IntroForm
