"use client"
import usePaddle from "@/service/usePaddle";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import PricingCards from "../dashboard/PricingCards";
import { useState } from "react";
import { SelectPricing } from "@/db/schema/schema";
export default function CheckoutButton({currentPricingId,user,pricing}:{currentPricingId:string,user:any,pricing:SelectPricing}) {
  
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
            <PricingCards pricing={pricing}  user={user} currentId={currentPricingId} />
          </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
    );
}