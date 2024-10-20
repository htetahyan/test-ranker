'use client';
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useDeleteQuestionByIdMutation } from "@/quries/BaseQuery";

// Columns for the table
const columns = [
  { name: "Question", uid: "question" },
  { name: "Type", uid: "type" },
  { name: "Duration", uid: "duration" },
  { name: "Actions", uid: "actions" },
];

const MyQuestions = ({ questions }: { questions: any }) => {
  const [mutate] = useDeleteQuestionByIdMutation();

  const deleteQuestionById = async (id: number) => {
    try {
      await mutate(id).unwrap();
      console.log(`Question with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete question with ID ${id}:`, error);
    }
  };

  return (
    <Table aria-label="Questions Table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={questions}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "actions" ? (
                  <Button color="danger" onClick={() => deleteQuestionById(item.id)}>
                    Delete
                  </Button>
                ) : (
                  item[columnKey as keyof typeof item]
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MyQuestions;
