'use client'
import { useAppSelector } from '@/store/hooks'
import { setStepThreeData, setStepTwoData } from '@/store/slice/MultiStepFormSlice'
import { Button, Input, Select, SelectItem, Slider, Textarea } from '@nextui-org/react'
import { useFormik } from 'formik'
import { label } from 'framer-motion/client'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import * as Yup from 'yup'

const StepThree = ({ nextStep, prevStep }: { nextStep: () => void, prevStep: () => void }) => {
  const dispatch = useDispatch()
  const { stepThreeData } = useAppSelector((state) => state.multiStepForm)

  const validationSchema = Yup.object().shape({
   questionCount: Yup.number()
      .required('Question count is required')
      .min(1, 'Question count must be at least 2')
      .max(10, 'Question count must be less than 10')
      .strict(true),
    duration: Yup.number().required('Duration is required').min(60, 'Duration must be at least 60 seconds').strict(true),
  })

  const formik = useFormik({
    initialValues: {
    
      questionCount: stepThreeData.questionCount ?? 5,
      duration: 300,
    },
    validationSchema,
    onSubmit: () => {
      toast.loading("redirecting",{duration:2000})
   
      dispatch(setStepThreeData(formik.values))
      nextStep()
    },
  })


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col gap-4 w-full min-h-[60vh]'>
        <h1 className='text-2xl font-bold'>Job Description</h1>
        <p className='text-gray-500'>Provide a URL or manually enter the job description.</p>
        <Slider 
                                    label="Questions Count" 
                                    name='questionCount'
                                    showSteps={true}
                                    
                                    color='secondary'
                                    step={1} 
                                    onChangeEnd={(value) => formik.setFieldValue('questionCount', value)} 
                                    value={formik.values.questionCount}
                                    maxValue={10} 
                                    minValue={0} 
                                    size='lg'
                                    className="max-w-md"
                                />
                               <p className='text-red-500 min-h-4'>{formik.touched.questionCount && formik.errors.questionCount && formik.errors.questionCount}
                                    </p>
<Select
  value={formik.values.duration}
  name='duration'
selectedKeys={[formik.values.duration.toString()]}
  label='Duration'
onChange={(e) => formik.setFieldValue('duration', parseInt(e.target.value))}>
  {Durations.map((duration) => (
    <SelectItem key={duration.value} value={duration.value}>
      {duration.label}
    </SelectItem>
  ))}
</Select>

  {formik.touched.duration && formik.errors.duration && (
                                    <p className='text-red-500'>{formik.errors.duration}</p>
                                    )}


        <div className='flex gap-4 w-full justify-between'>
          <Button onClick={prevStep} className='bg-black text-white px-4 py-2 rounded-md'>Previous</Button>
          <Button type='submit' className='bg-black text-white px-4 py-2 rounded-md'>Next</Button>
        </div>
      </div>
    </form>
  )
}

export default StepThree
const Durations=[{
    label:'5 minutes',
    value:300
},{
    label:'10 minutes',
    value:600
}
]