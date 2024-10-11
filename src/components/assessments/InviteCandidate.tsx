'use client'
import { Button, Input, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { TbDotsVertical } from "react-icons/tb";

const InviteCandidate = () => {
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
            <div className='flex  gap-2'>
            <Input isDisabled value='Invite Candidates'/>
            <Button isDisabled>Copy</Button>
            </div>
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
