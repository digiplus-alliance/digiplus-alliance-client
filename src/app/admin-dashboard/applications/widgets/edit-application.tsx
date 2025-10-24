"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import Pagination from "@/components/Pagination";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useGetApplicationForms } from "@/app/api/admin/applications/get-all-application-forms";
import { format } from "date-fns";

// Type for table data
type ApplicationTableData = {
  id: string;
  title: string;
  description: string;
  totalSections: number;
  isPublished: boolean;
  createdAt: string;
};

interface ListApplicationsProps {
  onEdit: (id: string) => void;
}

export default function ListApplications({ onEdit }: ListApplicationsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<ApplicationTableData[]>([]);

  const { data, error, isLoading } = useGetApplicationForms();

  const pageSize = 10;

  // Map API forms to table data
  useEffect(() => {
    if (data) {
      const mapped: ApplicationTableData[] = data.map((form) => ({
        id: form._id,
        title: form.welcome_title,
        description: form.welcome_description || "",
        totalSections: form.modules?.length || 0,
        isPublished: !!form.is_published,
        createdAt: form.createdAt
          ? format(new Date(form.createdAt), "MMM dd, yyyy")
          : "N/A",
      }));
      setTableData(mapped);
      setCurrentPage(1);
    }
  }, [data]);

  const handleEdit = (id: string) => {
    onEdit(id);
  };

  const handlePublishToggle = (id: string, currentStatus: boolean) => {
    console.log(
      `${currentStatus ? "Unpublish" : "Publish"} application ID:`,
      id
    );
    // TODO: API call to toggle publish status
  };

  const handleDelete = (id: string) => {
    console.log("Delete application ID:", id);
    // TODO: API call to delete application
  };

  const totalPages = Math.ceil(tableData.length / pageSize);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tableData.slice(start, start + pageSize);
  }, [currentPage, tableData]);

  const columns: ColumnDef<ApplicationTableData>[] = [
    {
      id: "titleDescription",
      header: "Title/Description",
      cell: (info: CellContext<ApplicationTableData, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-medium text-[#000000] text-sm">{row.title}</p>
            <p className="text-xs text-[#B8B8B8] truncate max-w-xs">
              {row.description || "No description"}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "totalSections",
      header: "Modules",
      cell: (info: CellContext<ApplicationTableData, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-medium text-[#000000] text-sm">
              {row.totalSections} Modules
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "isPublished",
      header: "Status",
      cell: (info: CellContext<ApplicationTableData, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                row.isPublished
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}
            >
              {row.isPublished ? "Published" : "Draft"}
            </span>
          </div>
        );
      },
    },
    {
      id: "createdAt",
      header: "Created At",
      cell: (info: CellContext<ApplicationTableData, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-normal text-[#171616] text-xs">
              {row.createdAt}
            </p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info: CellContext<ApplicationTableData, unknown>) => {
        const row = info.row.original;
        return (
          <div className="relative inline-block">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <MoreVertical size={16} className="text-[#706C6C]" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuItem
                  onClick={() => handleEdit(row.id)}
                  className="text-sm cursor-pointer"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handlePublishToggle(row.id, row.isPublished)}
                  className="text-sm cursor-pointer"
                >
                  {row.isPublished ? "Unpublish" : "Publish"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(row.id)}
                  className="text-sm cursor-pointer text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: pageData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Error state
  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold mb-2">
            Failed to load application forms
          </h3>
          <p className="text-sm text-red-600">
            {error instanceof Error ? error.message : String(error)}
          </p>
        </div>
      </div>
    );
  }

  // Loading state - show skeleton table
  if (isLoading) {
    return (
      <div className="bg-white rounded-tl-2xl p-4">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#FBFBFD]">
            <tr className="text-left text-[#B8B8B8] text-sm font-inter">
              <th className="px-4 py-2">Title/Description</th>
              <th className="px-4 py-2">Sections</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-8" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (tableData.length === 0) {
    return (
      <div className="bg-white rounded-tl-2xl p-4">
        <div className="text-center py-12">
          <p className="text-gray-500">No application forms found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-tl-2xl p-4">
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
              className="group border-t hover:bg-[#EBFBFF] hover:border-b-[#227C9D] hover:border-b-1"
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
          {pageSize} List per Page
        </p>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
