'use client';
import { jobsArray } from "@/utils/jobs";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { ErrorMessage, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IoMdClock } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import * as Yup from 'yup';
import { useCreateNewAssessmentMutation, useEditAssessmentMutation } from "@/quries/BaseQuery";
import JobRoleInput from "./AutoCompleteInput";
import AutocompleteInput from "./AutoCompleteInput";
import { SelectAssessments } from "@/db/schema/schema";

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name is too short').trim("white spaces are not allowed").strict(true),
  jobRole: Yup.string().required('Job Role is required').min(3, 'Job Role is too short').trim("white spaces are not allowed").strict(true),
  jobLocation: Yup.string().required('Job Location is required'),
  workArrangement: Yup.string().required('Work Arrangement is required'),
});

const AddTest = ({assessments}: {assessments: SelectAssessments|null }) => {
  const router = useRouter();
  const [filteredJobs, setFilteredJobs] = useState<string[]>([]);
  router.prefetch(`/assessments/${assessments?.id}/edit/tests`);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
const [mutate,{isLoading}]=useCreateNewAssessmentMutation()
const [editMutate,{isLoading:editLoading}]=useEditAssessmentMutation()
  const formik = useFormik({
    initialValues: {
      name: assessments?.name ?? '',
      jobRole: assessments?.jobRole ?? '',
      jobLocation: assessments?.jobLocation ?? '',
      workArrangement: assessments?.workArrangement ?? '',
    },

    validationSchema,
    onSubmit: async(values) => {
  if(assessments!==null){ 
  const res= await editMutate({assessmentId:assessments.id,name:values.name,jobRole:values.jobRole,jobLocation:values.jobLocation,workArrangement:values.workArrangement}).unwrap()
    if(res.message==="success"){
      router.push(`/assessments/${assessments.id}/edit/tests`)}
  }else {
    const res= await  mutate({name:values.name,jobRole:values.jobRole,jobLocation:values.jobLocation,workArrangement:values.workArrangement}).unwrap()
      router.push(`/assessments/${res}/edit/tests`);}
    },
  });

  const handleJobRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.handleChange(e);
    if (value.length > 0) {
      const filtered = jobsArray.filter((job) =>
        job.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobs(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredJobs([]);
      setShowSuggestions(false);
    }
  };
const exit=()=>{
  router.back()
}
  const handleJobSelect = (job: string) => {
    formik.setFieldValue('jobRole', job);
    setShowSuggestions(false);
  };

  return (
    <div className="w-screen h-screen">
      <form onSubmit={formik.handleSubmit} className="w-full h-full p-4">
        <div className="w-full flex items-center justify-between p-6 px-4 border-b-2">
          <div>
            <Input
              variant="faded"
              defaultValue="untitled assessments"
              name="name"
              isInvalid={!!(formik.errors.name && formik.touched.name)}
              errorMessage={formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          
         
          </div>
          <Button onClick={exit} className="mt-2" color="primary" size="md">
            exit
          </Button>
        </div>
        <h1 className="text-2xl font-bold p-6 px-4">Details</h1>
        <div className="w-full grid grid-cols-2 gap-4 mt-6 justify-center gap-y-6">
          {fields.map((field: { name: string, label: string, type: string,mode?: any, options?: { value: string, label: string }[] }) => (
            <div className="flex flex-col items-center w-full" key={field.name}>
              {field.name === "jobRole" ? (
               <AutocompleteInput fieldName="jobRole" label="Job Role" handleInputChange={handleJobRoleChange} showSuggestions={showSuggestions} filteredSuggestions={filteredJobs} handleSelect={handleJobSelect} formik={formik}/>
              ) : field.type === "text" ? (
                <Input
                  label={`Enter ${field.label}`}
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  isInvalid={!!(formik.errors[field.name as keyof typeof formik.errors] && formik.touched[field.name as keyof typeof formik.touched])}
                  errorMessage={formik.errors[field.name as keyof typeof formik.errors]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name as keyof typeof formik.values]}
                />
              ) : (
                <Select
                isInvalid={!!(formik.errors[field.name as keyof typeof formik.errors] && formik.touched[field.name as keyof typeof formik.touched])}
                errorMessage={formik.errors[field.name as keyof typeof formik.errors]}
                selectionMode={field.mode ?? "single"}
                label={`Select ${field.label}`}
                defaultSelectedKeys={[formik.values[field.name as keyof typeof formik.values]]} // Should be an array for "multiple"
                value={formik.values[field.name as keyof typeof formik.values]}
                onSelectionChange={(keys) => formik.setFieldValue(field.name, Array.from(keys))}
                name={field.name}
              >
                {(field.options || []).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end">
          <Button type="submit" className="mt-2" color="secondary" size="md">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTest;

const fields = [
  { name: "jobRole", label: "Job Role", type: "text" },
 
  {
    name: "jobLocation",
    label: "Job Location",
    type: "dropDown",
    options: [
      { label: "EMCA", value: "EMCA" },
      { label: "EUROPE", value: "EUROPE" },
    ],
    mode: "multiple",
  },
  {
    name: "workArrangement",
    label: "Work Arrangement",
    type: "dropDown",
    options: [
      { label: "remote", value: "remote" },
      { label: "hybrid", value: "hybrid" },
      { label: "onsite", value: "onsite" },
    ],
    mode: "multiple",
  },
];

