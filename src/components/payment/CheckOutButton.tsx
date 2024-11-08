"use client"
import usePaddle from "@/service/usePaddle";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import PricingCards from "../dashboard/PricingCards";
import { useState } from "react";
export default function CheckoutButton({currentPricingId}:{currentPricingId:string}){
  
const {isOpen,onOpen,onOpenChange}=useDisclosure()
  return (<>
    <Button
      onClick={onOpen}
    >
    Upgrade Plan
    </Button>
    <Modal onOpenChange={onOpenChange} size="full" isOpen={isOpen}>
      <ModalContent>
        {(onClose)=>(
          <><ModalHeader>Upgrade Your Plan</ModalHeader>
          <ModalBody>
            <PricingCards currentId={currentPricingId} />
          </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
    );
}