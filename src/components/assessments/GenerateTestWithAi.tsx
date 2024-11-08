import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, useDisclosure, SelectItem, Textarea, Slider } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RiAiGenerate } from 'react-icons/ri';
import extractTextFromPDF from "pdf-parser-client-side";

import * as Yup from 'yup'; 
import AutocompleteInput from './AutoCompleteInput';
import { jobsArray, skillsArray } from '@/utils/jobs';
import { useGenerateTestMutation } from '@/quries/BaseQuery';
import { SelectAssessments } from '@/db/schema/schema';
import { useRouter } from 'next/navigation';
import { PDFDocument } from 'pdf-lib'; // Import pdf-lib
const wordCountValidation = (min: number, max: number) => {
    return Yup.string()
      .required()
      .test(
        'min-words',
        `Must be at least ${min} words`,
        function (value) {
          if (!value) return true; // Pass if empty (use .required() for required validation)
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount >= min;
        }
      )
      .test(
        'max-words',
        `Must be at most ${max} words`,
        function (value) {
          if (!value) return true; // Pass if empty (use .required() for required validation)
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount <= max;
        }
      );
  };
  
const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').min(3, 'Title is too short').trim("White spaces are not allowed").strict(true),
    testType: Yup.string().required('Test Type is required').min(3, 'Test Type is too short').trim("White spaces are not allowed").strict(true),
    duration: Yup.string().required('Duration is required').min(3, 'Duration is too short').strict(true).trim("White spaces are not allowed"),
    questionsCount: Yup.number().required('Questions Count is required').min(2, 'Questions Count is too short').strict(true),
    generateBy: Yup.string().required('Generate By is required').min(3, 'Generate By is too short').trim("White spaces are not allowed").strict(true),
    description:Yup.string().when('generateBy',{
        is:(val:string)=> val==="job description",
        then:()=> wordCountValidation(50,200)
        
        
    }),
    pdf: Yup.string().when('generateBy',{
        is:(val:string)=> val==="pdf",
        then:()=> Yup.string().required()
    }),
    link:Yup.string().when('generateBy',{
        is: (val: string) => val === "Link",
        then: () => Yup.string()
            .matches(
                /^(https?:\/\/)?(www\.)?[a-z0-9]+(\.[a-z]{2,})(\/[a-zA-Z0-9#]+)*(\/)?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 
                'Enter correct URL that does not end with a file extension!'
            )
            .required('Please enter website')
        
    }),

});

const GenerateTestWithAi = ({  versionId,text,assessmentId }: { assessmentId: number,versionId: number,text:string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mutate, { isLoading }] = useGenerateTestMutation();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            assessmentId,
         
            versionId,
            duration: '',
            questionsCount: 0,
            link:'',
            pdf:'',
            generateBy: '',
        },
        validationSchema,
        onSubmit: async (values) => {
         
            
           
             // Add the extracted PDF text to the payload
            const res = await mutate(values).unwrap()
            onClose()
            
            if (res.message === "success") {
                router.refresh();
            }
        },
    });


    const handlePdfChange = async (pdfFile: File) => {
     
        const extractedText = await  extractTextFromPDF(pdfFile,'clean');;
        formik.setFieldValue('pdf',extractedText)
   
    };

    const [filteredJobs, setFilteredJobs] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [generateBy, setGenerateBy] = useState<string>(''); // Track the selected "Generate By" value

    const handleTestTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        formik.handleChange(e);

        if (value.length > 0) {
            const filtered = [...jobsArray, ...skillsArray].filter((job) =>
                job.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredJobs(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredJobs([]);
            setShowSuggestions(false);
        }
    };

    const handleTestTypeSelect = (testType: string) => {
        formik.setFieldValue('testType', testType);
        setShowSuggestions(false);
    };

    const handleGenerateByChange = (value: string) => {
        setGenerateBy(value); // Update the state when "Generate By" is selected
        formik.setFieldValue('generateBy', value);
    };
console.log(formik.errors);

    return (
        <div>
            <Button onClick={onOpen} endContent={<RiAiGenerate size={20} />} className="w-fit p-2 text-white bg-gradient-to-r from-pink-500 to-violet-500">
                {text}
            </Button>
            <Modal isOpen={isOpen} size="full" isDismissable={false} onClose={onClose}>
                <ModalContent>
                    <>
                        <ModalHeader>Generate Test With AI</ModalHeader>
                        <ModalBody>
                            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4">
                                {fields.map((field: any) => (
                                    <div className="flex flex-col items-center w-full" key={field.name}>
                                        {field.type === "text" ? (
                                            <Input
                                            variant='underlined'
                                                label={`Enter ${field.label}`}
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                isInvalid={!!(formik.errors[field.name as keyof typeof formik.values] && formik.touched[field.name as keyof typeof formik.values])}
                                                errorMessage={formik.errors[field.name as keyof typeof formik.values]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values[field.name as keyof typeof formik.values] as string}
                                            />
                                        ) : field.type === 'textField' ? (
                                            <Textarea
                                                label="Description"
                                                placeholder="Enter your description"
                                                name={field.name}
                                                onChange={formik.handleChange}
                                                value={formik.values[field.name as keyof typeof formik.values] as string}
                                                isInvalid={!!(formik.errors[field.name as keyof typeof formik.values] && formik.touched[field.name as keyof typeof formik.values])}
                                                errorMessage={formik.errors[field.name as keyof typeof formik.values]}
                                            />
                                        ) : field.type === 'testType' ? (
                                            <AutocompleteInput
                                                formik={formik}
                                                fieldName={'testType'}
                                                label={field.label}
                                                handleInputChange={handleTestTypeChange}
                                                showSuggestions={showSuggestions}
                                                filteredSuggestions={filteredJobs}
                                                handleSelect={handleTestTypeSelect}
                                            />
                                        ) : (
                                            <Select
                                                label={`Select ${field.label}`}
                                                isInvalid={!!(formik.errors[field.name as keyof typeof formik.values] && formik.touched[field.name as keyof typeof formik.values])}
                                                errorMessage={formik.errors[field.name as keyof typeof formik.values]}
                                                name={field.name}
                                                onChange={formik.handleChange}
                                                value={formik.values[field.name as keyof typeof formik.values] as string}
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
                               <div><Slider 
                                    label="Questions Count" 
                                    name='questionsCount'
                                    showSteps={true}
                                    color='secondary'
                                    step={1} 
                                    onChangeEnd={(value) => formik.setFieldValue('questionsCount', value)} 
                                    value={formik.values.questionsCount}
                                    maxValue={10} 
                                    minValue={0} 
                                    size='lg'
                                    className="max-w-md"
                                />
                                {formik.errors.questionsCount && formik.touched.questionsCount && <p className='text-red-500'>
                                    {formik.errors.questionsCount}</p>}</div> 
                                <Select
                                    label="Generate By"
                                    name="generateBy"
                                    onChange={(e) => handleGenerateByChange(e.target.value)}
                                    value={generateBy}
                                >
                                    {generationFields[0].options.map((option: any) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </Select>
        
                                {/* Conditionally render input based on selected value */}
                                {generateBy === 'job description' && (
                                    <Textarea
                                        label="Job Description"
                                        placeholder="Enter job description"
                                        name="description"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        isInvalid={!!(formik.errors.description && formik.touched.description)}
                                        errorMessage={formik.errors.description}
                                    />
                                )}
                                {generateBy === 'link' && (
                                    <Input
                                        label="Link"
                                        placeholder="Enter link"
                                        name="link"
                                        onChange={formik.handleChange}
                                        value={formik.values.link}
                                        isInvalid={!!(formik.errors.link && formik.touched.link)}
                                        errorMessage={formik.errors.link}
                                    />
                                )}
                                {generateBy === 'pdf' && (
                                    <Input
                                    
                                        label="Upload PDF"
                                        type="file"
                                        placeholder="Upload PDF"
                                        name="pdf"
                                        accept="application/pdf"
                                        onChange={(event) => handlePdfChange(event!.target!.files?.[0]!)}
                                        isInvalid={!!(formik.errors.pdf && formik.touched.pdf)}
                                        errorMessage={formik.errors.pdf}
                                    />
                                )}
                                <Button isDisabled={isLoading} className='w-fit bg-black text-white' isLoading={isLoading} type='submit'>
                                    Submit
                                </Button>
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
    { name: 'testType', label: 'Test Type', type: 'testType' },
    { name: 'duration', label: 'Duration', type: 'dropDown', options: [{ label: '5 minutes', value: 300 }, { label: '10 minutes', value: 600 }, { label: '15 minutes', value: 900 }] },
];

const generationFields = [
    { name: 'generateBy', label: 'Generate By', type: 'dropDown', options: [{ label: 'Job Description', value: 'job description' }, { label: 'Link', value: 'link' }, { label: 'PDF', value: 'pdf' }] }
];