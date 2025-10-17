import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import Pagination from "@/components/Pagination";
// import { IoLinkOutline } from "react-icons/io5";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
// import { getAssessmentStatusStyles } from "@/lib/getStatusStyles";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  useGetAllSubmittedAssessments,
  type Submission,
} from "@/app/api/admin/assessment/get-submitted-assessments";

// Extended type for table data that matches current structure
type TableUser = {
  id: string;
  name: string;
  email: string;
  business: string;
  assessment: string;
  timestamp: string;
  score: number;
  percentageScore: number;
  maxScore: number;
  assessmentStatus: string;
};

// const serviceOptions = ["View Details", "Edit Assessment", "Delete Assessment"];

export default function AssessmentListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectionsById, setSelectionsById] = useState<
  //   Record<string, string[]>
  // >({});
  const pageSize = 10;
  const { data, isLoading, isError, refetch } = useGetAllSubmittedAssessments({
    page: currentPage,
    limit: pageSize,
  });

  // Transform API data to table format
  const tableData: TableUser[] = useMemo(() => {
    if (!data?.submissions) return [];
    
    return data.submissions.map((submission: Submission) => ({
      id: submission.user._id.slice(-6).toUpperCase(),
      name: `${submission.user.first_name} ${submission.user.last_name}`,
      email: submission.user.email,
      business: submission.user.business_name,
      assessment: submission.assessment.title,
      timestamp: `${submission.completed_date} ${submission.completed_time}`,
      score: submission.scores.user_score,
      percentageScore: submission.scores.percentage_score,
      maxScore: submission.scores.max_possible_score,
      assessmentStatus: "Submitted",
    }));
  }, [data]);

  const totalPages = data?.pagination?.total_pages || 1;
  const pageData = tableData;
  const columns: ColumnDef<TableUser>[] = [
    {
      accessorKey: "id",
      header: "User ID",
      cell: (info: CellContext<TableUser, unknown>) => (
        <span className="text-[#06516C]">{info.getValue() as string}</span>
      ),
    },
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
      accessorKey: "business",
      header: "Business name",
      cell: (info: CellContext<TableUser, unknown>) => (
        <span className="text-[#117D70] bg-[#EBFFFC] p-2 w-fit items-center flex rounded-lg">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "assessment",
      header: "Assessment",
      cell: (info: CellContext<TableUser, unknown>) => (
        <span className="text-[#117D70] bg-[#EBFFFC] p-2 w-fit items-center flex rounded-lg">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: (info: any) => {
        const row = info.row.original as TableUser;
        return (
          <div>
            <p className="font-medium text-[#171616] text-sm">
              {row.score}/{row.maxScore}
            </p>
            <p className="text-xs text-[#B8B8B8]">
              {row.percentageScore.toFixed(2)}%
            </p>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "assessmentStatus",
    //   header: "Assessment Status",
    //   cell: (info: any) => {
    //     const row = info.row.original as any;
    //     const status = row.assessmentStatus;
    //     const styleClasses = getAssessmentStatusStyles(status);
    //     return (
    //       <div>
    //         <span
    //           className={`px-3 py-1 rounded-full text-xs font-medium border ${styleClasses}`}
    //         >
    //           {status}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "more",
    //   header: "Suggest",
    //   cell: (info: any) => {
    //     const row = info.row.original as any;

    //     const handleToggleSelection = (rowId: string, option: string) => {
    //       setSelectionsById((prev) => {
    //         const prevList = prev[rowId] ?? [];
    //         const exists = prevList.includes(option);
    //         const nextList = exists
    //           ? prevList.filter((p) => p !== option)
    //           : [...prevList, option];
    //         const next = { ...prev, [rowId]: nextList };
    //         console.log({ id: rowId, selections: nextList });
    //         return next;
    //       });
    //     };

    //     return (
    //       <div className="relative inline-block">
    //         <DropdownMenu>
    //           <DropdownMenuTrigger
    //             className={`w-full text-left px-3 py-1 text-xs font-medium cursor-pointer flex items-center justify-between`}
    //           >
    //             <IoLinkOutline
    //               className="text-[#A3A3A3] group-hover:text-[#06516C] transition-colors"
    //               size={20}
    //             />
    //           </DropdownMenuTrigger>

    //           <DropdownMenuContent className="w-40">
    //             {serviceOptions.map((s) => {
    //               const selected = (selectionsById[row.id] ?? []).includes(s);
    //               return (
    //                 <DropdownMenuItem
    //                   key={s}
    //                   className="text-sm"
    //                   onClick={(e) => e.stopPropagation()}
    //                 >
    //                   <label className="flex items-center gap-2 cursor-pointer">
    //                     <Checkbox
    //                       checked={selected}
    //                       onCheckedChange={() =>
    //                         handleToggleSelection(row.id, s)
    //                       }
    //                     />
    //                     <span className="text-sm text-[#7A7A7A]">{s}</span>
    //                   </label>
    //                 </DropdownMenuItem>
    //               );
    //             })}
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </div>
    //     );
    //   },
    // },
  ];

  const table = useReactTable({
    data: pageData,
    columns: columns as any,
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading state
  if (isLoading) {
    return (
      <>
        <Table className="border border-[#EBFBFF] rounded-lg">
          <TableHeader className="bg-[#FBFBFD]">
            <TableRow className="text-left text-[#B8B8B8] text-sm font-inter">
              <TableHead className="px-4 py-2 text-[#B8B8B8] font-bold">
                User ID
              </TableHead>
              <TableHead className="px-4 py-2 text-[#B8B8B8] font-bold">
                Name/Email
              </TableHead>
              <TableHead className="px-4 py-2 text-[#B8B8B8] font-bold">
                Timestamp
              </TableHead>
              <TableHead className="px-4 py-2 text-[#B8B8B8] font-bold">
                Business name
              </TableHead>
              <TableHead className="px-4 py-2 text-[#B8B8B8] font-bold">
                Assessment
              </TableHead>
              <TableHead className="px-4 py-2 text-[#B8B8B8] font-bold">
                Score
              </TableHead>
              <TableHead className="px-4 py-2 text-[#B8B8B8] font-bold">
                Assessment Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-t">
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-40" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-8 w-32 rounded-lg" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-8 w-40 rounded-lg" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-3 w-12" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 px-4">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-64 rounded-lg" />
        </div>
      </>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold mb-2">
            Failed to load submitted assessments
          </h3>
          <p className="text-sm text-red-600 mb-4">
            There was an error loading the data. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (tableData.length === 0) {
    return (
      <div className="p-4">
        <div className="border border-[#EBFBFF] rounded-lg p-8 text-center">
          <p className="text-[#B8B8B8]">No submitted assessments found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Table className="border border-[#EBFBFF] rounded-lg">
        <TableHeader className="bg-[#FBFBFD]">
          {table.getHeaderGroups().map((hg) => (
            <TableRow
              key={hg.id}
              className="text-left text-[#B8B8B8] text-sm font-inter"
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
          10 List per Page
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
