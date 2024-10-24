'use client'
import React, { useRef } from "react";
import { ReactSortable } from "react-sortablejs";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { GoListOrdered } from "react-icons/go";
import { IoMdCheckmarkCircle, IoMdClose } from "react-icons/io";
import { MdDragHandle } from "react-icons/md";
import './style.css';
import { useOrderTestsMutation } from "@/quries/BaseQuery";

const draggableList = [
  { question: "Mike", order: 1 },
  { question: "Michael", order: 2 },
  { question: "Mason", order: 3 },
  { question: "Miller", order: 4 },
  { question: "Milner", order: 5 },
  { question: "Merry", order: 6 }
];

export default function TestDragNDrop({ data }: { data: any }) {
  const [list, setList] = React.useState<any>();
const [mutate, { isLoading }] =useOrderTestsMutation()
  // Ref to store the initial order
  const initialOrderRef = useRef<any>([]);

  // Initialize list on mount
  React.useEffect(() => {
    const initialList = data ? [...data] : [...draggableList];
    setList(initialList);
    initialOrderRef.current = initialList.map((item: any, index: number) => ({
      ...item,
      order: index + 1 // assuming initial order is by index + 1
    }));
  }, [data]);

  // Function to handle list changes
  const updateOrderAfterChange = (newList: any) => {
    // Recalculate the order based on the position in the new list
    const updatedList = newList.map((item: any, index: number) => ({
      ...item,
      order: index + 1 // update the order based on the new index
    }));
    setList(updatedList); // Update state with new list
  };
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const onsubmit = async() => {
    // Compare current list with initial order to extract changed items
    const changedItems = list.filter((item: any, index: number) => {
      const initialItem = initialOrderRef.current[index];
      return item.question !== initialItem.question || item.order !== initialItem.order;
    });
    const extractChangedItems=changedItems.map((item: any) => {
      return {id:item.id,order:item.order}
    })

await mutate(extractChangedItems).unwrap().finally(() => {
  onClose()
})
  };


  return (
    <div className="w-fit">
      <Button color="secondary" className="text-white" endContent={<GoListOrdered />} onClick={onOpen}>
        Order
      </Button>
      <Modal
        backdrop="blur"
        isDismissable={false}
        size="5xl"
        className="h-[80vh] w-[80vw] relative overflow-x-hidden overflow-y-scroll"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <><ModalHeader>Drag and Drop</ModalHeader>
              <ModalBody className="h-fit mb-20">
             { data.length ===0? <ModalHeader>Empty tests</ModalHeader> :<> 
                <ReactSortable
                  filter=".addImageButtonContainer"
                  dragClass="sortableDrag"
                  list={list ?? draggableList}
                  setList={updateOrderAfterChange} // Use the update function
                  animation={200}
                  easing="ease-in"
                >
                  {list?.map((item: { question: string, order: number }) => (
                    <div key={item.question} className="draggableItem flex items-center justify-between">
                      <p>{item.order} - {item.question}</p>
                      <MdDragHandle size={30} />
                    </div>
                  ))}
                </ReactSortable></>}
                <ModalFooter className="fixed bottom-0 flex items-center justify-between">
                  <Button endContent={<IoMdClose />} color="danger" onClick={onClose}>
                    Close
                  </Button>
                  <Button endContent={<IoMdCheckmarkCircle />} color="secondary" className="text-white" onClick={onsubmit}>
                    Apply changes
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
