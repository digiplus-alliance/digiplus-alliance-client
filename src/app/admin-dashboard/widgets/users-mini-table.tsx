import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "@/components/Pagination";
import { useGetAllUsers } from "@/app/api/admin/users";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersMiniTable({pageSize = 5}: {pageSize?: number}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users, isLoading, error } = useGetAllUsers();

  // map API users to table rows
  const mappedUsers = useMemo(() => {
    return (users ?? []).map((u: any) => ({
      id: u._id.slice(-6).toUpperCase(),
      name: `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() || u.email,
      email: u.email,
      business: u.business_name ?? "",
    }));
  }, [users]);

  const totalPages = Math.ceil((mappedUsers.length || 0) / pageSize);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return mappedUsers.slice(start, start + pageSize);
  }, [currentPage, mappedUsers]);
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

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold mb-2">
            Failed to load users
          </h3>
          <p className="text-sm text-red-600">
            {error instanceof Error ? error.message : String(error)}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="max-h-64 overflow-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-[#FBFBFD]">
              <tr className="text-left text-[#B8B8B8] text-sm font-inter">
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Name/Email</th>
                <th className="px-4 py-2">Business name</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-32" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // Empty state
  if (!mappedUsers || mappedUsers.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500">No users found</div>
    );
  }

  return (
    <>
      <div className=" overflow-auto">
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
      </div>
      <div className="mt-0 flex flex-col md:flex-row md:justify-between md:items-center gap-2 px-4">
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
