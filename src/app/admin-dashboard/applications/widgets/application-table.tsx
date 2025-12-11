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
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  getApplicationStatusStyles,
  getAssessmentStatusStyles,
} from "@/lib/getStatusStyles";
import { useGetAllApplications } from "@/app/api/admin/applications";
import { useUpdatePaymentStatus } from "@/app/api/admin/applications/update-payment-status";
import { useUpdateApplicationStatus } from "@/app/api/admin/applications/update-application-status";

// Extended type for table data that matches current structure
type TableUser = {
  id: string;
  name: string;
  email: string;
  formTitle: string;
  service: string;
  training?: string;
  paymentStatus: string;
  timestamp: string;
  status: string;
};
const users: TableUser[] = [];

interface ApplicationTableProps {
  serviceTypeFilter?: string;
}

export default function ApplicationTable({
  serviceTypeFilter,
}: ApplicationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: applications,
    isLoading,
    error,
  } = useGetAllApplications({
    service_type: serviceTypeFilter || undefined,
  });
  const [tableData, setTableData] = useState<TableUser[]>(users);
  const pageSize = 10;
  const [applicationId, setApplicationId] = useState<string>("");
  const { mutate, isPending: isUpdating } =
    useUpdatePaymentStatus(applicationId);
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateApplicationStatus(applicationId);

  // map API applications to table data when available
  useEffect(() => {
    if (applications) {
      const mapped = applications.map((app) => ({
        id: app._id,
        name: app.name,
        email: app.email,
        formTitle: app.form_title,
        service: app.service,
        training: app.service_type ?? "",
        paymentStatus: app.payment_status ?? "",
        timestamp: app.timestamp,
        status: app.status,
      }));
      setTableData(mapped);
      setCurrentPage(1);
    }
  }, [applications]);

  const statusOptions = [
    "Submitted",
    "Being Processed",
    "Completed",
    "Rejected",
    "Approved",
  ];

  const paymentOptions = ["Not Paid", "Paid"];

  const handleStatusChange = (userId: string, newStatus: string) => {
    setTableData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    setApplicationId(userId);
    updateStatus({ status: newStatus });
  };

  const handlePaymentStatusChange = (userId: string, newStatus: string) => {
    setTableData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, paymentStatus: newStatus } : user
      )
    );
    setApplicationId(userId);
    mutate({ paymentStatus: newStatus });
  };

  const totalPages = Math.ceil(tableData.length / pageSize);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tableData.slice(start, start + pageSize);
  }, [currentPage, tableData]);

  const columns: ColumnDef<TableUser>[] = [
    {
      id: "nameEmail",
      header: "Name/Email",
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
      id: "serviceTraining",
      header: "Service/Training Type",
      cell: (info: CellContext<TableUser, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-medium text-[#000000] text-sm">{row.service}</p>
            <p className="text-xs text-[#B8B8B8]">{row.training}</p>
          </div>
        );
      },
    },
    {
      id: "formTitle",
      header: "Form Title",
      cell: (info: CellContext<TableUser, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-medium text-[#000000] text-sm">
              {row.formTitle}
            </p>
            {/* <p className="text-xs text-[#B8B8B8]">{row.training}</p> */}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: CellContext<TableUser, unknown>) => {
        const row = info.row.original;
        const currentStatus = row.status;
        const styleClasses = getAssessmentStatusStyles(currentStatus);
        return (
          <div className="relative inline-block">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`w-full text-left px-3 py-1 rounded-full text-xs font-medium border ${styleClasses} cursor-pointer flex items-center justify-between`}
                disabled={isUpdatingStatus}
              >
                <span className="truncate">{currentStatus}</span>
                <ChevronDown size={12} className="text-[#706C6C] ml-2" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40">
                {statusOptions.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => handleStatusChange(row.id, s)}
                    className="text-sm"
                  >
                    {s}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
    {
      id: "timestamp",
      header: "Timestamp",
      cell: (info: CellContext<TableUser, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-normal text-[#171616] text-xs">
              {row.timestamp}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: (info: CellContext<TableUser, unknown>) => {
        const row = info.row.original;
        const paymentStatus = row.paymentStatus;
        const styleClasses = getApplicationStatusStyles(paymentStatus);
        return (
          <div className="relative inline-block">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`w-full text-left px-3 py-1 rounded-full text-xs font-medium border ${styleClasses} cursor-pointer flex items-center justify-between`}
                disabled={isUpdating}
              >
                <span className="truncate">{paymentStatus}</span>
                <ChevronDown size={12} className="text-[#706C6C] ml-2" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40">
                {paymentOptions.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => handlePaymentStatusChange(row.id, s)}
                    className="text-sm"
                  >
                    {s}
                  </DropdownMenuItem>
                ))}
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
            Failed to load applications
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
      <>
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#FBFBFD]">
            <tr className="text-left text-[#B8B8B8] text-sm font-inter">
              <th className="px-4 py-2">Name/Email</th>
              <th className="px-4 py-2">Service/Training Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-40" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <div className="bg-white rounded-tl-2xl p-4">
      <table className="w-full text-sm border-collapse ">
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
          10 List per Page
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
