import { useDeleteAssessmentMutation } from '@/quries/BaseQuery'
import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import React from 'react'
import { RiLockUnlockFill } from 'react-icons/ri'

const DeleteAssessmentButton = ({assessmentId}:{assessmentId:number}) => {
    const [deleteAssessment,{isLoading}]= useDeleteAssessmentMutation();
const handleDelete=async()=>{
    await deleteAssessment({assessmentId}).unwrap().then(()=> window.location.reload())}
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (<>
   <Button onClick={onOpen} className='w-fit  rounded-full' startContent={<RiLockUnlockFill />} color='danger'>Delete</Button>
   <Modal  isOpen={isOpen} onClose={onClose}>
     <ModalContent>
       {(onClose) => (
         <>
           <ModalHeader>Delete Assessment</ModalHeader>
           <ModalBody>Are you sure you want to delete this assessment? This will delete all the versions and candidates inside assessment.</ModalBody>
           <ModalFooter>
             <Button isLoading={isLoading}  color='danger' onClick={handleDelete}>
               Delete
             </Button>
             <Button onClick={onClose}>Cancel</Button>
           </ModalFooter>
         </>
       )}
     </ModalContent>
   </Modal>
   </>
  )
}

export default DeleteAssessmentButton
