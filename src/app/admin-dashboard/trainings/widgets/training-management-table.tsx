import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAssessmentStatusStyles } from "@/lib/getStatusStyles";

type TableUser = {
  id: string;
  name: string;
  email: string;
  submissionTime: string;
  paid: string;
  timeTable: string;
  startDate: string;
  status: string;
};

const users: TableUser[] = [
  {
    id: "AP/2030222",
    name: "Oyebode Anjoke",
    email: "anjoke@gmail.com",
    submissionTime: "16 June 2021 ・ 1.20 pm",
    paid: "N100,000",
    timeTable: "Mon, Wed, Fri",
    startDate: "2021-06-21",
    status: "Submitted",
  },
  {
    id: "PY/093456U",
    name: "Chukwu Emeka",
    email: "emeka@example.com",
    submissionTime: "17 June 2021 ・ 11.30 am",
    paid: "N150,000",
    timeTable: "Tue, Thu, Sat",
    startDate: "2021-06-22",
    status: "Being Processed",
  },
  {
    id: "MM/1320CSAD",
    name: "Amina Bello",
    email: "amina@example.com",
    submissionTime: "18 June 2021 ・ 2.15 pm",
    paid: "N200,000",
    timeTable: "Mon, Wed, Fri",
    startDate: "2021-06-23",
    status: "Not Started",
  },
  {
    id: "UP/89ASD98",
    name: "Grace Ife",
    email: "grace@example.com",
    submissionTime: "19 June 2021 ・ 9.45 am",
    paid: "N120,000",
    timeTable: "Tue, Thu, Sat",
    startDate: "2021-06-24",
    status: "Rejected",
  },
  {
    id: "LO/12309AS0",
    name: "Tunde Bakare",
    email: "tunde@example.com",
    submissionTime: "20 June 2021 ・ 3.30 pm",
    paid: "N180,000",
    timeTable: "Mon, Wed, Fri",
    startDate: "2021-06-25",
    status: "Completed",
  },
  {
    id: "ZZ/999999",
    name: "Extra User",
    email: "extra@example.com",
    submissionTime: "06 October 2021 ・ 3.30 pm",
    paid: "N100,000",
    timeTable: "Mon, Wed, Fri",
    startDate: "2021-10-07",
    status: "Submitted",
  },
  {
    id: "AP/2030222",
    name: "Oyebode Anjoke",
    email: "anjoke@gmail.com",
    submissionTime: "2023-10-01 10:00 AM",
    paid: "N100,000",
    timeTable: "Mon, Wed, Fri",
    startDate: "2023-10-06",
    status: "Submitted",
  },
  {
    id: "PY/093456U",
    name: "Chukwu Emeka",
    email: "emeka@example.com",
    submissionTime: "2023-10-02 11:30 AM",
    paid: "N150,000",
    timeTable: "Tue, Thu, Sat",
    startDate: "2023-10-07",
    status: "Being Processed",
  },
  {
    id: "MM/1320CSAD",
    name: "Amina Bello",
    email: "amina@example.com",
    submissionTime: "2023-10-03 02:15 PM",
    paid: "N200,000",
    timeTable: "Mon, Wed, Fri",
    startDate: "2023-10-08",
    status: "Not Started",
  },
  {
    id: "UP/89ASD98",
    name: "Grace Ife",
    email: "grace@example.com",
    submissionTime: "2023-10-04 09:45 AM",
    paid: "N120,000",
    timeTable: "Tue, Thu, Sat",
    startDate: "2023-10-09",
    status: "Rejected",
  },
  {
    id: "LO/12309AS0",
    name: "Tunde Bakare",
    email: "tunde@example.com",
    submissionTime: "2023-10-05 01:20 PM",
    paid: "N180,000",
    timeTable: "Mon, Wed, Fri",
    startDate: "2023-10-10",
    status: "Completed",
  },
  {
    id: "ZZ/999999",
    name: "Extra User",
    email: "extra@example.com",
    submissionTime: "2023-10-06 03:30 PM",
    paid: "N100,000",
    timeTable: "Mon, Wed, Fri",
    startDate: "2023-10-07",
    status: "Submitted",
  },
];

export default function TrainingManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(users.length / pageSize);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [currentPage]);
  const columns: ColumnDef<TableUser>[] = [
    {
      accessorKey: "id",
      header: "Application ID",
      cell: (info: CellContext<TableUser, unknown>) => (
        <span className="text-[#06516C]">{info.getValue() as string}</span>
      ),
    },
    {
      id: "nameEmail",
      header: "Name",
      cell: (info: CellContext<TableUser, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-medium text-[#000000] text-sm">{row.name}</p>
            <p className="text-xs text-[#B8B8B8]">{row.email}</p>
          </div>
        );
      },
    },
    {
      id: "timestamp",
      header: "Submission Time",
      cell: (info: CellContext<TableUser, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-normal text-[#171616] text-xs">
              {row.submissionTime}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "paid",
      header: "Paid",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div>
            <p className="font-normal text-[#000000] text-sm text-center">
              {row.paid}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "timeTable",
      header: "Time Table",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div>
            <p className="font-normal text-[#171616] text-sm text-center">
              {row.timeTable}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div>
            <p className="font-normal text-[#171616] text-sm text-center">
              {row.startDate}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "assessmentStatus",
      header: "Status",
      cell: (info: any) => {
        const row = info.row.original as any;
        const status = row.status;
        const styleClasses = getAssessmentStatusStyles(status);
        return (
          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-normal border ${styleClasses}`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: pageData,
    columns: columns as any,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <TableHeader className="bg-[#FBFBFD] ">
          {table.getHeaderGroups().map((hg) => (
            <TableRow
              key={hg.id}
              className="text-left text-[#B8B8B8] text-sm font-inter hover:bg-[#FBFBFD]"
            >
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="px-4 py-2 text-[#B8B8B8] font-bold">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="group border-t hover:bg-[#EBFBFF] hover:border-b-[#227C9D] hover:border-b-1"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="px-4 py-2 align-top">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 px-4">
        <p className="text-sm text-[#667085] border border-[#EBFBFF] p-2 rounded-lg">
          5 List per Page
        </p>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
