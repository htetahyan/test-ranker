import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import MyQuillEditor from '../textEditor/Editor';

const AddATest = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      question: '',
      options: ['', '', '', ''],
    },
    validationSchema: Yup.object({
      question: Yup.string().required('Question is required'),
   
    }),
    onSubmit: async (values) => {
      console.log(values);
      // Handle your form submission here
    },
  });

  return (
    <div >
      <Button onClick={onOpen} endContent={<FaPlus />}>
        Add A Test
      </Button>
      <Modal isDismissable={false} isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add A Test</ModalHeader>
              <ModalBody>
                <form onSubmit={formik.handleSubmit}>
                  {/* Quill Editor for Question */}
                  <MyQuillEditor formik={formik} name="question" />
             

                  {/* Submit Button */}
                  <div className="mt-6">
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddATest;
