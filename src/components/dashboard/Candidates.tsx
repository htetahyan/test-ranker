'use client';
import { SelectAssessments, SelectCandidates, SelectVersions } from '@/db/schema/schema';
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
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
    <div className="overflow-x-auto w-full relative">
      <Table aria-label="Candidates table with versions and assessments" className="rounded-lg shadow-md max-w-full">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Full Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Current Step</TableColumn>
          <TableColumn>Score</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>candidate URL</TableColumn>
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.Candidates.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
              <TableCell>{item.Candidates.id}</TableCell>
              <TableCell>{item.Candidates.fullName}</TableCell>
              <TableCell>{item.Candidates.email}</TableCell>
              <TableCell className={"whitespace-nowrap"}>
                <Chip>{item.Candidates.currentStep ? item.Candidates.currentStep : "N/A"}</Chip>
              </TableCell>
              <TableCell>{item.Candidates.score ?? "N/A"}</TableCell>
              <TableCell>{item.Candidates.createdAt ? new Date(item.Candidates.createdAt).toLocaleDateString() : "N/A"}</TableCell>
              <TableCell>
                {item.Candidates.generatedUrl ? (
                  <Tooltip content={item.Candidates.generatedUrl}>
                    <Link href={process.env!.NEXT_PUBLIC_URL! + "/candidate/" + item!.versions!.uniqueId + "/" +item.Candidates.generatedUrl} className="text-blue-600 truncate">
                      { item.Candidates.generatedUrl.length > 20 ? `${item.Candidates.generatedUrl.slice(0, 20)}...` : item.Candidates.generatedUrl}
                    </Link>
                  </Tooltip>
                ) : "N/A"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidatesList;
