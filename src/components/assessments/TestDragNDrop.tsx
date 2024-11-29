"use client";

import React, { useRef } from "react";
import { ReactSortable } from "react-sortablejs";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { GoListOrdered } from "react-icons/go";
import { IoMdCheckmarkCircle, IoMdClose } from "react-icons/io";
import { MdDragHandle, MdDelete } from "react-icons/md";
import "./style.css";
import { useOrderTestsMutation } from "@/quries/BaseQuery";

const draggableList = [
  { id: 1, question: "Mike", order: 1 },
  { id: 2, question: "Michael", order: 2 },
  { id: 3, question: "Mason", order: 3 },
  { id: 4, question: "Miller", order: 4 },
  { id: 5, question: "Milner", order: 5 },
  { id: 6, question: "Merry", order: 6 },
];

export default function TestDragNDrop({ data }: { data: any }) {
  const [list, setList] = React.useState<any>();
  const [deleteIds, setDeleteIds] = React.useState<number[]>([]);
  const [mutate, { isLoading }] = useOrderTestsMutation();

  // Ref to store the initial order
  const initialOrderRef = useRef<any>([]);

  // Initialize list on mount
  React.useEffect(() => {
    const initialList = data ? [...data] : [...draggableList];
    setList(initialList);
    initialOrderRef.current = initialList.map((item: any, index: number) => ({
      ...item,
      order: index + 1, // Assuming initial order is by index + 1
    }));
  }, [data]);

  // Update the list and recalculate order
  const updateOrderAfterChange = (newList: any) => {
    const updatedList = newList.map((item: any, index: number) => ({
      ...item,
      order: index + 1,
    }));
    setList(updatedList); // Update state with new list
  };

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = async () => {
    // Prepare payload
    const payload = {
      deleteIds, // IDs to delete
      reorderList: list.map((item: any, index: number) => ({
        id: item.id,
        order: index + 1,
      })), // Reorder items with updated order
    };

    await mutate(payload)
      .unwrap()
      .finally(() => {
        onClose();
      });
  };

  return (
    <div className="w-fit">
      <Button
        className="text-white bg-black"
        startContent={<GoListOrdered />}
        onClick={onOpen}
      >
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
            <>
              <ModalHeader>Drag and Drop</ModalHeader>
              <ModalBody className="h-fit mb-20">
                {list?.length === 0 ? (
                  <ModalHeader>No tests available</ModalHeader>
                ) : (
                  <>
                    <ReactSortable
                      filter=".addImageButtonContainer"
                      dragClass="sortableDrag"
                      list={list}
                      setList={updateOrderAfterChange}
                      animation={200}
                      easing="ease-in"
                    >
                      {list?.map(
                        (item: { id: number; question: string; order: number }) => (
                          <div
                            key={item.id}
                            className="draggableItem flex items-center justify-between"
                          >
                            <p>
                              {item.order} - {item.question}
                            </p>
                            <div className="flex items-center gap-2">
                              <MdDragHandle size={30} />
                              <MdDelete
                                size={25}
                                className="cursor-pointer text-red-600"
                                onClick={() => {
                                  // Add item.id to deleteIds state
                                  setDeleteIds((prev) => [...prev, item.id]);
                                  // Remove item from list
                                  setList((prev:any) =>
                                    prev.filter((i:any) => i.id !== item.id)
                                  );
                                }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </ReactSortable>
                  </>
                )}
                <ModalFooter className="fixed bottom-0 flex items-center justify-between">
                  <Button
                    endContent={<IoMdClose />}
                    color="danger"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    endContent={<IoMdCheckmarkCircle />}
                    color="secondary"
                    className="text-white"
                    onClick={handleSubmit}
                    isDisabled={isLoading}
                  >
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
