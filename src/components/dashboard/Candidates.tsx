'use client';
import { SelectAssessments, SelectCandidates, SelectVersions } from '@/db/schema/schema';
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Link from 'next/link';
import { Tooltip } from '@nextui-org/react';

interface Data {
  Candidates: SelectCandidates;
  versions: SelectVersions;
  Assessments: SelectAssessments;
}

interface CandidatesListProps {
  data: Data[];
}

const CandidatesList: React.FC<CandidatesListProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto w-full">
      <Table aria-label="Candidates table with versions and assessments" className="rounded-lg shadow-md">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Full Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Current Step</TableColumn>
          <TableColumn>Signed</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Generated URL</TableColumn>
          <TableColumn>Score</TableColumn>
          <TableColumn>Updated At</TableColumn>
          <TableColumn>Version Name</TableColumn>
          <TableColumn>Published</TableColumn>
          <TableColumn>Assessment Name</TableColumn>
          <TableColumn>Job Role</TableColumn>
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.Candidates.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
              <TableCell>{item.Candidates.id}</TableCell>
              <TableCell>{item.Candidates.fullName}</TableCell>
              <TableCell>{item.Candidates.email}</TableCell>
              <TableCell>{item.Candidates.currentStep}</TableCell>
              <TableCell className={item.Candidates.isSigned ? "text-green-600" : "text-red-600"}>
                {item.Candidates.isSigned ? "Yes" : "No"}
              </TableCell>
              <TableCell className={item.Candidates.status === 'Active' ? "text-blue-600" : "text-gray-500"}>
                {item.Candidates.status}
              </TableCell>
              <TableCell>{item.Candidates.createdAt ? new Date(item.Candidates.createdAt).toLocaleDateString() : "N/A"}</TableCell>
              <TableCell>
                {item.Candidates.generatedUrl ? (
                  <Tooltip content={item.Candidates.generatedUrl}>
                    <Link href={item.Candidates.generatedUrl} className="text-blue-600 truncate">
                      {item.Candidates.generatedUrl.length > 20 ? `${item.Candidates.generatedUrl.slice(0, 20)}...` : item.Candidates.generatedUrl}
                    </Link>
                  </Tooltip>
                ) : "N/A"}
              </TableCell>
              <TableCell>{item.Candidates.score ?? "N/A"}</TableCell>
              <TableCell>{item.Candidates.updatedAt ? new Date(item.Candidates.updatedAt).toLocaleDateString() : "N/A"}</TableCell>
              <TableCell>{item.versions?.name}</TableCell>
              <TableCell>{item.versions?.isPublished ? "Yes" : "No"}</TableCell>
              <TableCell>{item.Assessments?.name}</TableCell>
              <TableCell>{item.Assessments?.jobRole}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidatesList;
