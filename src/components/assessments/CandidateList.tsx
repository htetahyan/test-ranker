"use client";
import React, { useState, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Select, SelectItem, getKeyValue } from "@nextui-org/react";
import { SelectCandidates } from "@/db/schema/schema";
import Link from "next/link";

type CandidateListProps = {
  candidates: SelectCandidates[];
  assessmentId: number;
};

export default function CandidateList({ candidates, assessmentId }: CandidateListProps) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const pages = Math.ceil(candidates.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return candidates.slice(start, start + rowsPerPage);
  }, [page, candidates]);

  return (
    <>
      {candidates.length === 0 ? (
        <div className="h-[10vh] bg-slate-100 border shadow-lg mt-5 mb-5 w-full flex items-center justify-center">
          <h1>No candidate yet</h1>
        </div>
      ) : (
        <Table
          aria-label="Candidate list with pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
               
                page={page}
                total={pages}
                onChange={setPage}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader about="">
            <TableColumn key="fullName">Name</TableColumn>
            <TableColumn key="createdAt">Date Created</TableColumn>
            <TableColumn key="email">Email</TableColumn>
            <TableColumn key="currentStep">Current Step</TableColumn>
            <TableColumn key="rating">Rating</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.fullName}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "currentStep" ? (
                      <Select
                        selectedKeys={[getKeyValue(item, columnKey)]}
                        color={getKeyValue(item, columnKey) === "finished" ? "success" : getKeyValue(item, columnKey) === "intro" ? "warning" : "primary"}
                      >
                        <SelectItem key="sign" value="sign">Sign</SelectItem>
                        <SelectItem key="intro" value="intro">Intro</SelectItem>
                        <SelectItem key="test" value="test">Test</SelectItem>
                        <SelectItem key="questions" value="questions">Questions</SelectItem>
                        <SelectItem key="info" value="info">Info</SelectItem>
                        <SelectItem key="finished" value="finished">Finished</SelectItem>
                      </Select>
                    ) : columnKey === "createdAt" ? (
                      new Date(getKeyValue(item, columnKey)).toLocaleString()
                    ) : (
                      <Link href={`/assessments/${assessmentId}/${item.versionId}/candidates/${item.id}`} className="underline">
                        {getKeyValue(item, columnKey)}
                      </Link>
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
