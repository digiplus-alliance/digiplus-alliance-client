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
import { Skeleton } from "@/components/ui/skeleton";
import { getAssessmentStatusStyles } from "@/lib/getStatusStyles";
import {
  useGetAllTrainingUsers,
  AllTrainingApplicationsResponse,
} from "@/app/api/admin/trainings/getUsers";

type TableUser = {
  application_id: string;
  name: string;
  email: string;
  service_type: string;
  service: string;
  submission_time: string;
  payment_amount: number;
  timetable_url: string | null;
  start_date: string | null;
  status: string;
};

const users: TableUser[] = [];

interface TrainingManagementTableProps {
  searchQuery?: string;
  serviceFilter?: string;
}

export default function TrainingManagementTable({
  searchQuery = "",
  serviceFilter = "",
}: TrainingManagementTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Pass training name filter to the hook for server-side filtering
  const {
    data: trainingUsers,
    isPending,
    error,
  } = useGetAllTrainingUsers({
    trainingName: serviceFilter.trim() || undefined,
  });

  // Use actual data from hook or empty array
  const displayData = (trainingUsers as TableUser[]) || [];

  // Apply client-side search filtering only
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return displayData;
    }

    const query = searchQuery.toLowerCase();
    return displayData.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.application_id.toLowerCase().includes(query)
      );
    });
  }, [displayData, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [currentPage, filteredData]);
  const columns: ColumnDef<TableUser>[] = [
    {
      accessorKey: "application_id",
      header: "Application ID",
      cell: (info: CellContext<TableUser, unknown>) => (
        <span className="text-[#06516C]">
          {(info.getValue() as string).slice(0, 6).toUpperCase()}
        </span>
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
      accessorKey: "service_type",
      header: "Service Type",
      cell: (info: CellContext<TableUser, unknown>) => (
        <span className="text-[#171616] text-sm">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: (info: CellContext<TableUser, unknown>) => (
        <span className="text-[#171616] text-sm">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      id: "timestamp",
      header: "Submission Time",
      cell: (info: CellContext<TableUser, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-normal text-[#171616] text-xs">
              {row.submission_time}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "payment_amount",
      header: "Paid",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div>
            <p className="font-normal text-[#000000] text-sm text-center">
              ₦{row.payment_amount?.toLocaleString()}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "timetable_url",
      header: "Time Table",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div>
            <p className="font-normal text-[#171616] text-sm text-center">
              {row.timetable_url ? "Available" : "N/A"}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div>
            <p className="font-normal text-[#171616] text-sm text-center">
              {row.start_date || "N/A"}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
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

  // Render loading skeleton
  if (isPending) {
    return (
      <>
        <Table>
          <TableHeader className="bg-[#FBFBFD]">
            <TableRow className="text-left text-[#B8B8B8] text-sm font-inter hover:bg-[#FBFBFD]">
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className="px-4 py-2 text-[#B8B8B8] font-bold"
                >
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: pageSize }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="group border-t hover:bg-[#EBFBFF] hover:border-b-[#227C9D] hover:border-b-1"
              >
                {columns.map((_, cellIndex) => (
                  <TableCell key={cellIndex} className="px-4 py-2 align-top">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 px-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-48" />
        </div>
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="w-full p-8 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Failed to Load Training Applications
          </h3>
          <p className="text-red-700 mb-4">
            {error instanceof Error
              ? error.message
              : "An error occurred while fetching the data."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render empty state
  if (displayData.length === 0) {
    return (
      <div className="w-full p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          No Training Applications
        </h3>
        <p className="text-gray-600">
          There are no training applications at the moment.
        </p>
      </div>
    );
  }

  // Render no search results state
  if (
    filteredData.length === 0 &&
    (searchQuery.trim() || serviceFilter.trim())
  ) {
    const filterDetails = [];
    if (searchQuery.trim()) {
      filterDetails.push(`search: "${searchQuery}"`);
    }
    if (serviceFilter.trim()) {
      filterDetails.push(`training: "${serviceFilter}"`);
    }
    const filterText = filterDetails.join(" and ");

    return (
      <div className="w-full p-8 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          No Results Found
        </h3>
        <p className="text-blue-700">
          No training applications match your filters ({filterText}). Try
          adjusting your search terms or filters.
        </p>
      </div>
    );
  }

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
                <TableHead
                  key={header.id}
                  className="px-4 py-2 text-[#B8B8B8] font-bold"
                >
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
