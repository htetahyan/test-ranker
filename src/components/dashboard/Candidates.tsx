'use client';

import { SelectAssessments, SelectCandidates, SelectVersions } from '@/db/schema/schema';
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Pagination, Button } from "@nextui-org/react";
import Link from 'next/link';
import { Tooltip } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

interface Data {
  Candidates: SelectCandidates | null;
  versions: SelectVersions | null;
  Assessments: SelectAssessments | null;
}

interface CandidatesListProps {
  data: Data[];
  currentPage: number;
  totalPages: number;
}

const CandidatesList: React.FC<CandidatesListProps> = ({ data, currentPage, totalPages }) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/candidates?page=${page - 1}&limit=5`); // Adjust for 0-based index
  };

  const noCandidates = !data.length || data.every(item => item.Candidates === null);

  if (noCandidates) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">No Candidates Found</h2>
        <p className="text-gray-600">
          No candidates are available to display. Please add candidates or try again later.
        </p>
      </div>
    );
  }

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
          <TableColumn>Candidate URL</TableColumn>
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.Candidates?.id || Math.random()} className="hover:bg-gray-100 transition duration-150 ease-in-out">
              <TableCell>{item.Candidates?.id ?? 'N/A'}</TableCell>
              <TableCell>{item.Candidates?.fullName ?? 'N/A'}</TableCell>
              <TableCell>{item.Candidates?.email ?? 'N/A'}</TableCell>
              <TableCell>
                <Chip>{item.Candidates?.currentStep || 'N/A'}</Chip>
              </TableCell>
              <TableCell>{item.Candidates?.score ?? 'N/A'}</TableCell>
              <TableCell>
                {item.Candidates?.createdAt
                  ? new Date(item.Candidates.createdAt).toLocaleDateString()
                  : 'N/A'}
              </TableCell>
              <TableCell>
                {item.Candidates?.generatedUrl ? (
                  <Tooltip content={item.Candidates.generatedUrl}>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}/candidate/${item?.versions?.uniqueId}/${item.Candidates.generatedUrl}`}
                      className="text-blue-600 truncate"
                    >
                      {item.Candidates.generatedUrl.length > 20
                        ? `${item.Candidates.generatedUrl.slice(0, 20)}...`
                        : item.Candidates.generatedUrl}
                    </Link>
                  </Tooltip>
                ) : (
                  'N/A'
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Pagination
          total={totalPages}
          page={currentPage + 1} // Adjust for 1-based index
          onChange={handlePageChange}
          color="secondary"
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() => handlePageChange(currentPage > 0 ? currentPage : 1)}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() => handlePageChange(currentPage < totalPages - 1 ? currentPage + 2 : totalPages)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidatesList;
