"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import Pagination from "@/components/Pagination";
import { ChevronDown, Trash2 } from "lucide-react";
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

// Extended type for table data that matches current structure
type TableUser = {
  id: string;
  name: string;
  email: string;
  service: string;
  training?: string;
  paymentStatus: string;
  timestamp: string;
  status: string;
};

const users: TableUser[] = [
  {
    id: "AP/2030222",
    name: "Oyebode Anjoke",
    email: "anjoke@gmail.com",
    service: "Company Name",
    training: "DigiPlus Training",
    timestamp: "2023-10-01 10:00 AM",
    paymentStatus: "Not Paid",
    status: "Submitted",
  },
  {
    id: "PY/093456U",
    name: "Chukwu Emeka",
    email: "emeka@example.com",
    service: "Emeka Foods",
    training: "Ecosystem Building",
    timestamp: "2023-10-02 11:30 AM",
    paymentStatus: "Paid",
    status: "Being Processed",
  },
  {
    id: "MM/1320CSAD",
    name: "Amina Bello",
    email: "amina@example.com",
    service: "Bello Traders",
    training: "Advanced Sales Training",
    timestamp: "2023-10-03 02:15 PM",
    paymentStatus: "Not Paid",
    status: "Approved",
  },
  {
    id: "UP/89ASD98",
    name: "Grace Ife",
    email: "grace@example.com",
    service: "Ife Logistics",
    training: "Logistics Management",
    timestamp: "2023-10-04 09:45 AM",
    paymentStatus: "Paid",
    status: "Rejected",
  },
  {
    id: "LO/12309AS0",
    name: "Tunde Bakare",
    email: "tunde@example.com",
    service: "Bakare Services",
    training: "Business Management",
    timestamp: "2023-10-05 01:20 PM",
    paymentStatus: "Not Paid",
    status: "Completed",
  },
  {
    id: "ZZ/999999",
    name: "Extra User",
    email: "extra@example.com",
    service: "Extra LLC",
    training: "Extra Training",
    timestamp: "2023-10-06 03:30 PM",
    paymentStatus: "Not Paid",
    status: "Submitted",
  },
  {
    id: "AP/2030222",
    name: "Oyebode Anjoke",
    email: "anjoke@gmail.com",
    service: "Company Name",
    training: "DigiPlus Training",
    timestamp: "2023-10-01 10:00 AM",
    paymentStatus: "Not Paid",
    status: "Submitted",
  },
  {
    id: "PY/093456U",
    name: "Chukwu Emeka",
    email: "emeka@example.com",
    service: "Emeka Foods",
    training: "Ecosystem Building",
    timestamp: "2023-10-02 11:30 AM",
    paymentStatus: "Paid",
    status: "Being Processed",
  },
  {
    id: "MM/1320CSAD",
    name: "Amina Bello",
    email: "amina@example.com",
    timestamp: "2023-10-03 02:15 PM",
    status: "Not Started",
    service: "Bello Traders",
    paymentStatus: "Not Paid",
    training: "Advanced Sales Training",
  },
  {
    id: "UP/89ASD98",
    name: "Grace Ife",
    email: "grace@example.com",
    service: "Ife Logistics",
    training: "Logistics Management",
    timestamp: "2023-10-04 09:45 AM",
    paymentStatus: "Paid",
    status: "Rejected",
  },
  {
    id: "LO/12309AS0",
    name: "Tunde Bakare",
    email: "tunde@example.com",
    service: "Bakare Services",
    training: "Business Management",
    timestamp: "2023-10-05 01:20 PM",
    paymentStatus: "Not Paid",
    status: "Completed",
  },
  {
    id: "ZZ/999999",
    name: "Extra User",
    email: "extra@example.com",
    service: "Extra LLC",
    training: "Extra Training",
    paymentStatus: "Not Paid",
    timestamp: "2023-10-06 03:30 PM",
    status: "Submitted",
  },
];

export default function ApplicationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<TableUser | null>(null);
  const [tableData, setTableData] = useState<TableUser[]>(users);
  const pageSize = 10;

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
  };

  const handlePaymentStatusChange = (userId: string, newStatus: string) => {
    setTableData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, paymentStatus: newStatus } : user
      )
    );
  };

  const handleViewUser = (user: TableUser) => {
    setSelectedUser(user);
    setUserInfoModalOpen(true);
  };

  const handleDeleteUser = (user: TableUser) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    // Add delete logic here
    console.log("Deleting user:", userToDelete);
    setDeleteModalOpen(false);
    setUserToDelete(null);
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
    // {
    //   accessorKey: "more",
    //   header: "More",
    //   cell: (info: any) => {
    //     const row = info.row.original as any;
    //     return (
    //       <div className="flex items-center gap-2">
    //         <button
    //           onClick={() => handleViewUser(row)}
    //           className="p-1 hover:bg-gray-100 rounded"
    //           title="View user info"
    //         >
    //           <CiUser
    //             className="text-[#A3A3A3] group-hover:text-[#06516C] transition-colors"
    //             size={20}
    //           />
    //         </button>
    //         <button
    //           onClick={() => handleDeleteUser(row)}
    //           className="p-1 hover:bg-gray-100 rounded"
    //           title="Delete user"
    //         >
    //           <Trash2
    //             size={16}
    //             className="text-[#A3A3A3] group-hover:text-red-500 transition-colors"
    //           />
    //         </button>
    //       </div>
    //     );
    //   },
    // },
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

      {/* User Info Modal */}
      {/* <UserInfoModal
        userInfoModalOpen={userInfoModalOpen}
        setUserInfoModalOpen={setUserInfoModalOpen}
        selectedUser={selectedUser as AdminUser | null}
      /> */}

      {/* Delete Confirmation Modal */}
      {/* <DeactivateUserModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        confirmDeleteUser={confirmDeleteUser}
      /> */}
    </>
  );
}
