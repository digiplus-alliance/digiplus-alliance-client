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
import { useGetAllAssessments } from "@/app/api/admin/assessment/get-all-assessment";
import { format } from "date-fns";
import { useUpdatePublishStatus } from "@/app/api/admin/assessment/toggle-publish-status";
import { useDeleteAssessment } from "@/app/api/admin/assessment/delete-assessment";
import DeactivateUserModal from "../../users/widgets/delete-modal";

// Type for table data
type AssessmentTableData = {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  totalModules: number;
  totalPoints: number;
  isPublished: boolean;
  isActive: boolean;
  createdAt: string;
};

interface AssessmentTableProps {
  onEdit: (id: string) => void;
}

export default function AssessmentTable({ onEdit }: AssessmentTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<AssessmentTableData[]>([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { data: assessments, isLoading, error } = useGetAllAssessments();

  const { mutate: togglePublish, isPending: isToggling } =
    useUpdatePublishStatus(selectedAssessmentId);

  const { mutate: deleteAssessment, isPending: isDeleting } =
    useDeleteAssessment(selectedAssessmentId);

  const pageSize = 10;

  // Map API assessments to table data
  useEffect(() => {
    if (assessments) {
      const mapped = assessments.map((assessment) => ({
        id: assessment._id,
        title: assessment.title,
        description: assessment.description || "",
        totalQuestions: assessment.statistics.total_questions,
        totalModules: assessment.statistics.total_modules,
        totalPoints: assessment.statistics.total_possible_points,
        isPublished: assessment.is_published,
        isActive: assessment.is_active,
        createdAt: format(new Date(assessment.createdAt), "MMM dd, yyyy"),
      }));
      setTableData(mapped);
      setCurrentPage(1);
    }
  }, [assessments]);

  const handleEdit = (id: string) => {
    onEdit(id);
  };

  const handlePublishToggle = async (id: string, currentStatus: boolean) => {
    setSelectedAssessmentId(id);
    try {
      togglePublish({ is_published: !currentStatus });
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    }
  };

  const handleDelete = (id: string) => {
    setSelectedAssessmentId(id);
    setOpen(true);
  };

  const confirmDelete = () => {
    deleteAssessment(undefined, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: (error) => {
        console.error("Failed to delete assessment:", error);
      },
    });
  };

  const disabled = isToggling || isDeleting;

  const totalPages = Math.ceil(tableData.length / pageSize);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tableData.slice(start, start + pageSize);
  }, [currentPage, tableData]);

  const columns: ColumnDef<AssessmentTableData>[] = [
    {
      id: "titleDescription",
      header: "Title/Description",
      cell: (info: CellContext<AssessmentTableData, unknown>) => {
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
      id: "statistics",
      header: "Questions/Modules",
      cell: (info: CellContext<AssessmentTableData, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-medium text-[#000000] text-sm">
              {row.totalQuestions} Questions
            </p>
            <p className="text-xs text-[#B8B8B8]">{row.totalModules} Modules</p>
          </div>
        );
      },
    },
    {
      accessorKey: "totalPoints",
      header: "Total Points",
      cell: (info: CellContext<AssessmentTableData, unknown>) => {
        const row = info.row.original;
        return (
          <div>
            <p className="font-medium text-[#000000] text-sm">
              {row.totalPoints}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "isPublished",
      header: "Status",
      cell: (info: CellContext<AssessmentTableData, unknown>) => {
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
              {row.isPublished ? "Published" : "Unpublished"}
            </span>
          </div>
        );
      },
    },
    {
      id: "createdAt",
      header: "Created At",
      cell: (info: CellContext<AssessmentTableData, unknown>) => {
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
      cell: (info: CellContext<AssessmentTableData, unknown>) => {
        const row = info.row.original;
        return (
          <div className="relative inline-block">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                disabled={disabled}
              >
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
            Failed to load assessments
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
              <th className="px-4 py-2">Questions/Modules</th>
              <th className="px-4 py-2">Total Points</th>
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
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
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
          <p className="text-gray-500">No assessments found</p>
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

      <DeactivateUserModal
        deleteModalOpen={open}
        setDeleteModalOpen={setOpen}
        confirmDeleteUser={confirmDelete}
        loading={isDeleting}
        title="Delete Assessment?"
        description="Are you sure you want to delete this assessment? This action cannot be undone."
        confirmButtonText="Delete"
      />
    </div>
  );
}
