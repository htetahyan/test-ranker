'use client'
import React from 'react';
import CandidateList from '@/components/assessments/CandidateList';
import InviteCandidate from '@/components/assessments/InviteCandidate';
import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import PublishDraftBtn from './PublishDraftBtn';
import { useRouter } from 'next/navigation';
import { useCloneVersionMutation } from '@/quries/BaseQuery';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { toast } from 'sonner';
import DeleteAssessmentButton from './DeleteAssessmentButton';

const Assessment = ({ data, versionId, isFree }:any) => {
const currentVersion=data?.version.find((v:any)=>v.id===versionId)
const {isOpen,onOpen,onClose}=useDisclosure()
const [isSelected, setIsSelected] = React.useState(false);
const [clone]=useCloneVersionMutation()
const router=useRouter()
const goToEditAssessment=async()=>{
  if(isFree){
    toast.success('Free assessment cannot be edited')
    return                  
  }
  if(isSelected){
   await clone({assessmentId:data?.assessment?.id,versionId:currentVersion?.id}).unwrap()
  }
}
  return (
    <div className="w-screen min-h-screen bg-gray-50 text-gray-800">
      <div className="flex justify-between items-center p-6 bg-white shadow-sm">
      <Link href={`/dashboard/assessments`}><Button className="bg-black  text-white hover:bg-black/80"  startContent={<IoMdArrowRoundBack />} >Back</Button></Link>
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900">{data?.assessment?.name}</h1>
          <div className="text-gray-600">
            <p>{data?.assessment?.jobRole}</p>
            <p>{data?.assessment?.jobLocation}</p>
            <p>{data?.assessment?.workArrangement}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
        <PublishDraftBtn currentVersion={currentVersion}  />
            <Button onClick={onOpen} isIconOnly className="bg-gray-200 text-gray-700 hover:bg-gray-300" endContent={<FaPen />} />
       </div>
      </div>
<Modal isOpen={isOpen} onClose={onClose} >
  <ModalContent>
    {(onClose) => (
      <><ModalHeader>Confirm edit assessment</ModalHeader>
      <ModalBody>
      <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
        <p className="text-gray-700">Are you sure you want to edit this assessment? This will create a new version and all candidates from this version will not be affected.</p>
      </Checkbox>
      
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
        <Button color='danger' isDisabled={!isSelected}  onClick={goToEditAssessment}>
        Edit</Button>
      </ModalFooter>
      </>
    )}
  </ModalContent>
  </Modal>
      <div className="p-6">
        <InviteCandidate versionId={data?.versionId} version={data?.version} assessment={data?.assessment}/>
        <CandidateList assessmentId={data?.assessment?.id} candidates={data?.candidates} />
      </div>
    </div>
  );
}

export default Assessment;
