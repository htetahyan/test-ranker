'use client'
import { Button, Input, Modal, ModalBody, ModalContent, useDisclosure,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react'
import React from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { TbDotsVertical } from "react-icons/tb";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { SelectAssessments } from '@/db/schema/schema';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateNewCandidateMutation } from '@/quries/CandidateQuery';
import { VersionModal } from './version/VersionModal';
const InviteCandidate = ({assessment}:{assessment:SelectAssessments}) => {
    const {onOpen,isOpen,onOpenChange}=useDisclosure()
  return (
    <div className='flex  w-full items-center h-[10vh] justify-end px-4'>
      <Button onClick={onOpen} color='secondary'  endContent={<RiSendPlaneFill/>} variant='solid'   className='mr-6'>
      Invite</Button>
      <Modal size='5xl' className='h-[70vh] '  isDismissable={false} isOpen={isOpen} onClose={onOpenChange}>
<ModalContent>
    {(onClose)=>(
        <>
        <ModalBody>
           <InviteTabs assessment={assessment}/>
            </ModalBody>
        </>
    )}
</ModalContent>
      </Modal>
      <VersionModal/>
    </div>
  )
}

export default InviteCandidate

export function InviteTabs({assessment}:{assessment:SelectAssessments}) {
  return (
    <div className="flex w-full h-[40vh] flex-col">
      <Tabs aria-label="Options">
        <Tab key="photos" title="Public Url">
          <Card>
            <CardBody className='flex flex-col gap-4'>
              <h1>Public Url</h1>
              <p className='text-blue-500'>{process.env.NEXT_PUBLIC_URL+'/candidate/'+assessment?.uniqueId+'/intro'}</p>
              <Button  variant='solid' className=' text-white w-fit'>Copy</Button>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="music" title="generate">
          <Card>
            <CardBody>

<GenerateInviteUrl assessment={assessment}/>            </CardBody>
          </Card>  
        </Tab>
        <Tab key="videos" title="batch invite">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required').min(3, 'Name is too short').trim("white spaces are not allowed").strict(true),
  email: Yup.string().email('Invalid email').required('Email is required').trim("white spaces are not allowed").strict(true),
})
export const GenerateInviteUrl = ({assessment}:{assessment:SelectAssessments}) => {
  const [mutate]=useCreateNewCandidateMutation()
  const [candidates,setCandidates]=React.useState<{fullName:string,email:string,generatedUrl:string}[]>([])
  const formik=useFormik({
    initialValues:{
fullName:'',      email:'',assessmentId:assessment?.id
    },
    validationSchema,
    onSubmit:async()=>{
     const res= await mutate(formik.values).unwrap()
     if(res.message==="success"){
       setCandidates([...candidates,{fullName:formik.values.fullName,email:formik.values.email,generatedUrl:process.env.NEXT_PUBLIC_URL+'/candidate/'+assessment?.uniqueId+'/'+res.generatedUrl}])
     }
    }
  })
  return(<div className='flex flex-col gap-4'>
    <h1 className='text-2xl font-bold'>Invite Candidate</h1>
    <form onSubmit={formik.handleSubmit}  className='flex items-center gap-4 '>
<Input isInvalid={!!(formik.touched.fullName && formik.errors.fullName)}
errorMessage={formik.errors.fullName}
name='fullName' label='Name' onChange={formik.handleChange} value={formik.values.fullName}/>
<Input isInvalid={!!(formik.touched.email && formik.errors.email)}
errorMessage={formik.errors.email}
name='email' label='Email' onChange={formik.handleChange} value={formik.values.email}/>
<Button type='submit'>Generate</Button>
    </form>
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={candidates}>
        {(item) => (
          <TableRow key={item.email}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
           
          </TableRow>
        )}
        
      </TableBody>
    </Table>
    </div>
  )
}
const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "5",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  }, {
    key: "6",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  }, {
    key: "7",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  }, {
    key: "8",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "fullName",
    label: "NAME",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "generatedUrl",
    label: "GENERATED URL",
  },
  {
    key: "copy",
    label:'COPY'
  
  }
];