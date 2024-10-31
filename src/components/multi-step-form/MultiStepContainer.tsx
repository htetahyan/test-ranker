'use client'
import { useAppSelector } from '@/store/hooks';
import { Progress, Slider } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const StepOne=dynamic(()=>import('@/components/multi-step-form/StepOne'),{ssr:false})
const MultiStepContainer = () => {
    const [step, setStep] = useState(1);
    const formData = useAppSelector((state) => state.multiStepForm);
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
const router=useRouter()
    const submit = async() => {
      const data={name:formData.stepOneData.name,jobRole:formData.stepOneData.jobRole,
        generateBy:formData.stepTwoData.useUrl===true?'URL':'DESC',url:formData.stepTwoData.url,description:formData.stepTwoData.description,
        questionCount:formData.stepThreeData.questionCount,duration:formData.stepThreeData.duration,
        }

        const res=await fetch('/api/create', { method: 'POST', body: JSON.stringify(data) })
        const {sessionId}=await res.json()
        if(res.status===201){
          toast.success('Assessment created successfully')
          router.push(`/account?callback=/dashboard/${sessionId}`)
      }
    }
  return (
    <div className='flex flex-col gap-4 p-4 w-1/2'>
        <div>
            <Progress value={step} maxValue={3} color="primary"     
            classNames={{
                track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-indigo-200 to-indigo-500",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",            }}
            formatOptions={{style:'decimal',maximumFractionDigits:0,minimumFractionDigits:0}}
            />
        </div>
      {step === 1 && <StepOne nextStep={nextStep} prevStep={prevStep} />}
      {step === 2 && <StepTwo nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <StepThree nextStep={submit} prevStep={prevStep} />}
    </div>
  )
}

export default  MultiStepContainer
