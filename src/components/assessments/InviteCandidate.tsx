'use client'
import { Button, Input, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { TbDotsVertical } from "react-icons/tb";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { SelectAssessments } from '@/db/schema/schema';

const InviteCandidate = ({assessment}:{assessment:SelectAssessments}) => {
    const {onOpen,isOpen,onOpenChange}=useDisclosure()
  return (
    <div className='flex  w-full items-center h-[10vh] justify-end px-4'>
      <Button onClick={onOpen} color='secondary'  endContent={<RiSendPlaneFill/>} variant='solid'   className='mr-6'>
      Invite</Button>
      <Modal  isDismissable={false} isOpen={isOpen} onClose={onOpenChange}>
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
      <Button    endContent={<TbDotsVertical />
} variant='ghost' isIconOnly  className='w-10 h-10 rounded-full'>

      </Button>
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
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
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