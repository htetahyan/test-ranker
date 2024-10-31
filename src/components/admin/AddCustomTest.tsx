'use client';

import React from 'react';
import { Button, ModalContent, useDisclosure, Modal, ModalBody, ModalHeader, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateNewCustomTestMutation } from '@/quries/adminQuery';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
    title: Yup.string().required('title is required'),
    description: Yup.string().required('Description is required'),
    duration: Yup.number().required('Duration is required'),
});

const Durations = [
    { label: '5 minutes', value: 300 },
    { label: '10 minutes', value: 600 },
    { label: '15 minutes', value: 900 },
    { label: '20 minutes', value: 1200 },
    { label: '25 minutes', value: 1500 },
    { label: '30 minutes', value: 1800 },
];

const AddCustomTest = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router=useRouter()
    const [mutate,{isLoading}]=useCreateNewCustomTestMutation()
    const formik = useFormik({
        initialValues: { title: '', description: '', duration: 300 },
        validationSchema,
        onSubmit:async( values) => {
          const res= await mutate(values).unwrap()
router.replace(`/admin/custom-tests`)
        },
    });

    return (
        <div>
            <Button onClick={onOpen}>Add Custom Test</Button>
            <Modal size='full' isOpen={isOpen} onClose={onClose} isDismissable={false}>
                <ModalContent>
                    <ModalHeader>Add Custom Test</ModalHeader>
                    <ModalBody>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='flex flex-col gap-4'>
                                <Input
                                    name='title'
                                    placeholder='title'
                                    label='Title'
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    errorMessage={formik.errors.title}
                                    isInvalid={formik.touched.title && !!formik.errors.title}
                                />
                                <Textarea
                                label='Description'
                                    name='description'
                                    placeholder='Description'
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    errorMessage={formik.errors.description}
                                    isInvalid={formik.touched.description && !!formik.errors.description}
                                />
                                <Select

                                    label='Duration'
                                    errorMessage={formik.errors.duration}
                                    name='duration'
                                    value={formik.values.duration.toString()}
                                    selectedKeys={[formik.values.duration.toString()]}
                                    onChange={(e) => formik.setFieldValue('duration', parseInt(e.target.value))}
                                    isInvalid={formik.touched.duration && !!formik.errors.duration}
                                >
                                    {Durations.map((duration) => (
                                        <SelectItem key={duration.value} value={duration.value.toString()}>
                                            {duration.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {formik.touched.duration && formik.errors.duration && (
                                    <p className='text-red-500'>{formik.errors.duration}</p>
                                )}
                                <Button type='submit'>Submit</Button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AddCustomTest;
