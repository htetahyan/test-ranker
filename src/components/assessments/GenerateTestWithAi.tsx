'use client'

import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, useDisclosure, SelectItem, Textarea } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RiAiGenerate } from 'react-icons/ri';
import * as Yup from 'yup';
import AutocompleteInput from './AutoCompleteInput';
import { jobsArray, skillsArray } from '@/utils/jobs';
import { useGenerateTestMutation } from '@/quries/BaseQuery';
import { SelectAssessments } from '@/db/schema/schema';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').min(3, 'Title is too short').trim("White spaces are not allowed").strict(true),
    description: Yup.string().required('Description is required').min(3, 'Description is too short').trim("White spaces are not allowed").strict(true),
    testType: Yup.string().required('Test Type is required').min(3, 'Test Type is too short').trim("White spaces are not allowed").strict(true),
    duration: Yup.string().required('Duration is required').min(3, 'Duration is too short').strict(true).trim("White spaces are not allowed"),
    questionsCount: Yup.string().required('Questions Count is required').min(1, 'Questions Count is too short').strict(true).trim("White spaces are not allowed"),
});

const GenerateTestWithAi = ({assessment}:{assessment:SelectAssessments}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mutate,{isLoading}]=useGenerateTestMutation()
    const router=useRouter()
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            testType: assessment?.jobRole ?? '',
           
            assessmentId:assessment?.id ,
    
            duration: '',
            questionsCount: '',
        },
        validationSchema,
        onSubmit:async (values) => {
const res=await mutate(values).unwrap().finally(onClose)

        }
    });
    const [filteredJobs, setFilteredJobs] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
const handleTestTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.handleChange(e);

    if (value.length > 0) {
      const filtered = [...jobsArray,...skillsArray].filter((job) =>
        job.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobs(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredJobs([]);
      setShowSuggestions(false);
    }
}

const handleTestTypeSelect = (testType: string) => {
    formik.setFieldValue('testType', testType);
    setShowSuggestions(false);
  };
    return (
        <div>
            <Button onClick={onOpen} endContent={<RiAiGenerate  size={20} />
} className="w-fit p-2 text-white bg-gradient-to-r from-pink-500 to-violet-500">
                Generate Test With AI
            </Button>
            <Modal isOpen={isOpen} size='full' isDismissable={false} onClose={onClose}>
                <ModalContent>
                    <>
                        <ModalHeader>Generate Test With AI</ModalHeader>
                        <ModalBody >
                            <form onSubmit={formik.handleSubmit} className='grid grid-cols- gap-4'>
                                {fields.map((field:any) => (
                                    <div className="flex flex-col items-center w-full" key={field.name}>
                                        {field.type === "text" ? (
                                            <Input
                                                label={`Enter ${field.label}`}
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                isInvalid={!!(formik.errors[field.name as keyof typeof formik.values ] && formik.touched[field.name as keyof typeof formik.values])}
                                                errorMessage={formik.errors[field.name as keyof typeof formik.values]}
                                                onChange={formik.handleChange}
                                                
                                                onBlur={formik.handleBlur}
                                                value={formik.values[field.name as keyof typeof formik.values] as string }
                                            />
                                        ) : field.type==='textField'?(
                                            <Textarea
                                            label="Description"
                                            placeholder="Enter your description"
                                            name={field.name}
                                            onChange={formik.handleChange}
                                            value={formik.values[field.name as keyof typeof formik.values] as string}
                                            className=""
                                            isInvalid={!!(formik.errors[field.name as keyof typeof formik.values] && formik.touched[field.name as keyof typeof formik.values])}
                                            errorMessage={formik.errors[field.name as keyof typeof formik.values]}
                                          />
                                        ):  field.type==='testType'?(
                                            <AutocompleteInput
                                                formik={formik}
                                                fieldName={'testType'}
                                                label={field.label}
                                                handleInputChange={handleTestTypeChange}
                                                showSuggestions={showSuggestions}
                                                filteredSuggestions={filteredJobs}

                                                handleSelect={handleTestTypeSelect}
                                            />
                                        ):(
                                            <Select
                                                label={`Select ${field.label}`}
                                                
                                                isInvalid={!!(formik.errors[field.name as keyof typeof formik.values] && formik.touched[field.name as keyof typeof formik.values])}
                                                errorMessage={formik.errors[field.name as keyof typeof formik.values]}
                                                name={field.name}
                                                onChange={formik.handleChange}
                                                value={formik.values[field.name as keyof typeof formik.values]}
                                            >
                                                {(field.options || []).map((option: any) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        )}
                                    </div>
                                ))}
                            <div/>
<Button type="submit" disabled={isLoading} isLoading={isLoading} className="w-fit justify-self-end p-2 text-white bg-gradient-to-r from-pink-500 to-violet-500" endContent={<RiAiGenerate  size={20} />}>Generate</Button>
                            </form>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default GenerateTestWithAi;

const fields = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Job Description', type: 'textField' },
    {
        name: 'testType', label: 'Test Type', type: 'testType',
      
    },
   
    {
        name: 'duration', label: 'Duration', type: 'dropDown',
        options: [
            { label: `${ 300 / 60} minutes`, value: 300 },
            { label: `${600 / 60} minutes`, value: 600 },
            { label: `${900 / 60} minutes`, value: 900 },
        ]
    },
    {
        name: 'questionsCount', label: 'Questions Count', type: 'dropDown',
        options: [
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '15', value: 15 },
        ]
    }
];
