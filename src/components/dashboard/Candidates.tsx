'use client'
import { SelectCandidates } from '@/db/schema/schema'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

const CandidatesList = ({candidates}:{candidates: SelectCandidates[]}) => {
  return (
    <div>
    <Table aria-label="Candidates table without pagination">
      <TableHeader>
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="fullName">Full Name</TableColumn>
        <TableColumn key="email">Email</TableColumn>
        <TableColumn key="currentStep">Current Step</TableColumn>
        <TableColumn key="isSigned">Signed</TableColumn>
        <TableColumn key="status">Status</TableColumn>
        <TableColumn key="createdAt">Created At</TableColumn>
        <TableColumn key="generatedUrl">Generated URL</TableColumn>
        <TableColumn key="score">Score</TableColumn>
        <TableColumn key="updatedAt">Updated At</TableColumn>
      </TableHeader>
      <TableBody items={candidates}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.currentStep}</TableCell>
            <TableCell>{item.isSigned ? "Yes" : "No"}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "N/A"}</TableCell>
            <TableCell>{item.generatedUrl || "N/A"}</TableCell>
            <TableCell>{item.score !== null ? item.score : "N/A"}</TableCell>
            <TableCell>{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "N/A"}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
  )
}

export default CandidatesList
