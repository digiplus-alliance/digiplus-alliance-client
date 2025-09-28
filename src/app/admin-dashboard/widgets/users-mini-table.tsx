import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "@/components/Pagination";

const users = [
  {
    id: "AP/2030222",
    name: "Oyebode Anjoke",
    email: "anjoke@gmail.com",
    business: "Company Name",
  },
  {
    id: "PY/093456U",
    name: "Chukwu Emeka",
    email: "emeka@example.com",
    business: "Emeka Foods",
  },
  {
    id: "MM/1320CSAD",
    name: "Amina Bello",
    email: "amina@example.com",
    business: "Bello Traders",
  },
  {
    id: "UP/89ASD98",
    name: "Grace Ife",
    email: "grace@example.com",
    business: "Ife Logistics",
  },
  {
    id: "LO/12309AS0",
    name: "Tunde Bakare",
    email: "tunde@example.com",
    business: "Bakare Services",
  },
  {
    id: "ZZ/999999",
    name: "Extra User",
    email: "extra@example.com",
    business: "Extra LLC",
  },
  {
    id: "AP/2030222",
    name: "Oyebode Anjoke",
    email: "anjoke@gmail.com",
    business: "Company Name",
  },
  {
    id: "PY/093456U",
    name: "Chukwu Emeka",
    email: "emeka@example.com",
    business: "Emeka Foods",
  },
  {
    id: "MM/1320CSAD",
    name: "Amina Bello",
    email: "amina@example.com",
    business: "Bello Traders",
  },
  {
    id: "UP/89ASD98",
    name: "Grace Ife",
    email: "grace@example.com",
    business: "Ife Logistics",
  },
  {
    id: "LO/12309AS0",
    name: "Tunde Bakare",
    email: "tunde@example.com",
    business: "Bakare Services",
  },
  {
    id: "ZZ/999999",
    name: "Extra User",
    email: "extra@example.com",
    business: "Extra LLC",
  },
];

export default function UsersMiniTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(users.length / pageSize);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [currentPage]);
  const columns = [
    {
      accessorKey: "id",
      header: "User ID",
      cell: (info: any) => (
        <span className="text-[#06516C]">{info.getValue()}</span>
      ),
    },
    {
      id: "nameEmail",
      header: "Name/Email",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div>
            <p className="font-medium text-[#000000] text-sm">{row.name}</p>
            <p className="text-xs text-[#B8B8B8]">{row.email}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "business",
      header: "Business name",
      cell: (info: any) => (
        <span className="text-[#117D70] bg-[#EBFFFC] p-2 w-fit items-center flex rounded-lg">
          {info.getValue()}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: pageData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="w-full text-sm border-collapse">
        <thead className="bg-[#FBFBFD]">
          {table.getHeaderGroups().map((hg) => (
            <tr
              key={hg.id}
              className="text-left text-[#B8B8B8] text-sm font-inter"
            >
              {hg.headers.map((header) => (
                <th key={header.id} className="px-4 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-[#EBFBFF] hover:border-b-[#227C9D] hover:border-b-1"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 align-top">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
