'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Slider} from "@nextui-org/react";


export default function CandidateList() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
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
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="role">INVITEDON</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
        <TableColumn key="rating">RATING</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{columnKey==='rating'? <Slider step={1} defaultValue={getKeyValue(item, columnKey)}
            showSteps={true}
            marks={[
                {value:1, label: '0'},
                {value: 2, label: '1'},
                {value: 3, label: '2'},
                {value: 4, label: '3'},
                {value: 5, label: '4'},

                {value: 6, label: '5'},
            ]}
            isDisabled={true}
            size="lg"
            maxValue={6} minValue={1} color="secondary" /> :getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
export const users = [
    {
      key: "1",
      name: "Tony Reichert",
      invitedOn: "2023-06-01T00:00:00.000Z",
      status: "Active",
      rating:5
    },
    {
      key: "2",
      name: "Zoey Lang",
      invitedOn: "2023-06-01T00:00:00.000Z",
      status: "Paused",
      rating:2
    },
]