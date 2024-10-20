'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Button, Input } from '@nextui-org/react';
import { useSignCandidateMutation } from '@/quries/CandidateQuery';
import { useRouter } from 'next/navigation';

const Sign = ({ candidate ,uniqueId}: { candidate: any, uniqueId: string }) => {
    const [mutate,{isLoading,isError,isSuccess}]=useSignCandidateMutation()
    const router=useRouter()
    router.prefetch(`/candidate/${uniqueId}/${candidate.generatedUrl}/tests`)
  // Validation schema for the signature form
  const validationSchema = Yup.object({
    signature: Yup.string()
      .required('Signature is required')
      .test(
        'match-name',
        'Invalid signature. Please enter the correct name.',
        function (value) {
          return value?.toLowerCase() === candidate.fullName.toLowerCase();
        }
      ),
  });

  // Initializing Formik
  const formik = useFormik({
    initialValues: {
      signature: '',
      candidate_uniqueId: candidate.generatedUrl,
    },
    validationSchema,
    onSubmit: async (values) => {
    const res= await mutate(values).unwrap()
    console.log(res);
    
    if( res.message==="success"){
        router.push(`/candidate/${uniqueId}/${candidate.generatedUrl}/tests`)
    }

  }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Honesty Agreement</h1>
      <p className="mb-6">
        TestGorilla strives to create a fair test-taking experience for all. We use advanced methods to detect dishonesty and protect the integrity of your assessment. Instances of dishonesty may lead to disqualification from the assessment and our platform, and may be reported to the employer who requested the assessment.
      </p>
      <p className="mb-4">
        The use of AI tools, taking an assessment multiple times, and other behaviors outlined in the full policy are not allowed unless instructed otherwise.{' '}
        <a href="#" className="text-blue-500 underline">View the full Candidate Honesty Policy</a>.
      </p>
      <p className="mb-4">
        Please agree with this policy by entering <strong>{candidate.fullName}</strong> as your signature.
      </p>

      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          name="signature"
          placeholder={`Enter ${candidate.fullName}`}
          className="border rounded p-2 mb-4"
          value={formik.values.signature}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!(formik.touched.signature && formik.errors.signature)}
          errorMessage={formik.errors.signature}
        />
       
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={formik.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Sign;
