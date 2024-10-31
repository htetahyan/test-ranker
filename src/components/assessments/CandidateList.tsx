'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Slider, Select, SelectItem} from "@nextui-org/react";
import { SelectCandidates } from "@/db/schema/schema";
import Link from "next/link";


export default function CandidateList({candidates,assessmentId}:{candidates: SelectCandidates[],assessmentId:number}) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(candidates.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return candidates.slice(start, end);
  }, [page, candidates]);

  return (  <>
  {candidates.length ===0 ? (<div className="h-[10vh] bg-slate-100 border-1 shadow-lg mt-5 mb-5 w-full flex items-center justify-center ">
    <h1>No candidate yet</h1>
  </div>):(
    <Table 
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="fullName">NAME</TableColumn>
        <TableColumn key="createdAt">DATE CREATED</TableColumn>
        <TableColumn key="email">Email</TableColumn>

        <TableColumn key="currentStep">CURRENt STEP</TableColumn>
        <TableColumn key="rating">RATING</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
        <TableRow key={item.fullName}>
        {(columnKey) => (
        
            <TableCell>
            { columnKey === 'currentStep' ? (
             <Select selectedKeys={[getKeyValue(item, columnKey)]} value={getKeyValue(item, columnKey)} color={getKeyValue(item, columnKey)==='finished'?'success': getKeyValue(item, columnKey)==='intro'?'warning':'primary'}  defaultSelectedKeys={[getKeyValue(item, columnKey)]} >
             <SelectItem key={'sign'} value="sign">sign</SelectItem>
             <SelectItem key={'intro'} value="intro">intro</SelectItem>
             <SelectItem key={'test'} value="Invited">test</SelectItem>
             <SelectItem key={'questions'} value="questions">questions</SelectItem>
             <SelectItem key={'info'} value="info">info</SelectItem>
             <SelectItem color="success" key={'finished'} value="finished">
              finished
             </SelectItem>

              </Select>
            ) : columnKey === 'createdAt' ?(
              new Date(getKeyValue(item, columnKey)).toLocaleString()
            ):
            
            (  <Link href={`/assessments/${assessmentId}/${item.versionId}/candidates/${item.id}`}  className="underline">
              {getKeyValue(item, columnKey)}</Link>
            )}
                      

          </TableCell>
         
        )}
        
      </TableRow>
      
        )}
      </TableBody>
    </Table>)}
  </>
  );
}
