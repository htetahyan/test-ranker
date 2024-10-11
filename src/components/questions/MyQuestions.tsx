'use client';
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

// Sample data for questions

// Columns for the table
const columns = [
   { name: "Question", uid: "question" },
  { name: "Type", uid: "type" },
  { name: "duration", uid: "duration" },
 
];

const MyQuestions = ({questions}: {questions: any}) => {
  console.log(questions);
  
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
        {(item:any) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{item[columnKey as keyof typeof item]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MyQuestions;
