'use client';
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import { useCreateNewAssessmentMutation, useEditAssessmentMutation } from "@/quries/BaseQuery";
import AutocompleteInput from "./AutoCompleteInput";
import { SelectAssessments } from "@/db/schema/schema";
import { jobsArray } from "@/utils/jobs";

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name is too short').trim("White spaces are not allowed").strict(true),
  jobRole: Yup.string().required('Job Role is required').min(3, 'Job Role is too short').trim("White spaces are not allowed").strict(true),
});

const AddTest = ({ assessments }: { assessments: SelectAssessments | null }) => {
  const router = useRouter();
  const [filteredJobs, setFilteredJobs] = useState<string[]>([]);
  assessments && router.prefetch(`/assessments/${assessments?.id!}/edit/tests`);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [mutate, { isLoading }] = useCreateNewAssessmentMutation();
  const [editMutate, { isLoading: editLoading }] = useEditAssessmentMutation();

  const formik = useFormik({
    initialValues: {
      name: assessments ? assessments.name : '',
      jobRole: assessments ? assessments.jobRole : '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (assessments) {
        const res = await editMutate({ assessmentId: assessments.id, name: values.name, jobRole: values.jobRole }).unwrap();
        if (res.message === "success") {
          router.push(`/assessments/${assessments.id}/edit/tests`);
        }
      } else {
        const res = await mutate({ name: values.name, jobRole: values.jobRole }).unwrap();
        console.log(res);
        router.push(`/assessments/${res.assessmentId}/${res.versionId}/edit/tests`);
      }
    },
  });

  const handleJobRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.handleChange(e);
    if (value.length > 0) {
      const filtered = jobsArray.filter((job) => job.toLowerCase().includes(value.toLowerCase()));
      setFilteredJobs(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredJobs([]);
      setShowSuggestions(false);
    }
  };

  const handleJobSelect = (job: string) => {
    formik.setFieldValue('jobRole', job);
    setShowSuggestions(false);
  };

  const exit = () => {
    router.back();
  };

  return (
    <div className="w-screen h-screen">
      <form onSubmit={formik.handleSubmit} className="w-full h-full items-center jus p-4 flex flex-col">
        <div className="w-full flex items-center justify-between p-6 px-4 border-b-2">
        <Button onClick={exit} className="mt-2 bg-black text-white" color="primary" size="md">
            Exit
          </Button>  
        </div>
        <div className="flex flex-col gap-4 mt-6 w-1/2  items-center">
        <h1 className="text-3xl font-bold">{assessments ? 'Edit Test' : 'Create New Test'}</h1>
        <Input
        label="Assessment Name"
            variant="underlined"

            defaultValue="untitled assessments"
            name="name"
            isInvalid={!!(formik.errors.name && formik.touched.name)}
            errorMessage={formik.errors.name}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
         
          <AutocompleteInput
            fieldName="jobRole"
        
            label="Job Role"
            handleInputChange={handleJobRoleChange}
            showSuggestions={showSuggestions}
            filteredSuggestions={filteredJobs}
            handleSelect={handleJobSelect}
            formik={formik}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button disabled={isLoading || editLoading} isLoading={isLoading || editLoading} type="submit" className="mt-2 bg-black text-white"  size="md">
            {assessments ? 'Edit' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTest;
