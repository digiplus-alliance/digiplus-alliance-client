import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import Pagination from "@/components/Pagination";
import { CiUser } from "react-icons/ci";
import { Trash2 } from "lucide-react";
import UserInfoModal from "./profile-modal";
import DeactivateUserModal from "./delete-modal";
import { AdminUser } from "@/types/admin/user";

// Extended type for table data that matches current structure
type TableUser = {
  id: string;
  name: string;
  email: string;
  business: string;
  timestamp: string;
  applications: number;
  assessmentStatus: string;
};

const users: TableUser[] = [
  {
    id: "AP/2030222",
    name: "Oyebode Anjoke",
    email: "anjoke@gmail.com",
    business: "Company Name",
    timestamp: "2023-10-01 10:00 AM",
    applications: 5,
    assessmentStatus: "Submitted",
  },
  {
    id: "PY/093456U",
    name: "Chukwu Emeka",
    email: "emeka@example.com",
    business: "Emeka Foods",
    timestamp: "2023-10-02 11:30 AM",
    applications: 3,
    assessmentStatus: "Being Processed",
  },
  {
    id: "MM/1320CSAD",
    name: "Amina Bello",
    email: "amina@example.com",
    business: "Bello Traders",
    timestamp: "2023-10-03 02:15 PM",
    applications: 4,
    assessmentStatus: "Approved",
  },
  {
    id: "UP/89ASD98",
    name: "Grace Ife",
    email: "grace@example.com",
    business: "Ife Logistics",
    timestamp: "2023-10-04 09:45 AM",
    applications: 2,
    assessmentStatus: "Rejected",
  },
  {
    id: "LO/12309AS0",
    name: "Tunde Bakare",
    email: "tunde@example.com",
    business: "Bakare Services",
    timestamp: "2023-10-05 01:20 PM",
    applications: 6,
    assessmentStatus: "Completed",
  },
  {
    id: "ZZ/999999",
    name: "Extra User",
    email: "extra@example.com",
    business: "Extra LLC",
    timestamp: "2023-10-06 03:30 PM",
    applications: 1,
    assessmentStatus: "Submitted",
  },
  {
    id: "AP/2030222",
    name: "Oyebode Anjoke",
    email: "anjoke@gmail.com",
    business: "Company Name",
    timestamp: "2023-10-01 10:00 AM",
    applications: 5,
    assessmentStatus: "Submitted",
  },
  {
    id: "PY/093456U",
    name: "Chukwu Emeka",
    email: "emeka@example.com",
    business: "Emeka Foods",
    timestamp: "2023-10-02 11:30 AM",
    applications: 3,
    assessmentStatus: "Being Processed",
  },
  {
    id: "MM/1320CSAD",
    name: "Amina Bello",
    email: "amina@example.com",
    timestamp: "2023-10-03 02:15 PM",
    applications: 4,
    assessmentStatus: "Not Started",
    business: "Bello Traders",
  },
  {
    id: "UP/89ASD98",
    name: "Grace Ife",
    email: "grace@example.com",
    business: "Ife Logistics",
    timestamp: "2023-10-04 09:45 AM",
    applications: 2,
    assessmentStatus: "Rejected",
  },
  {
    id: "LO/12309AS0",
    name: "Tunde Bakare",
    email: "tunde@example.com",
    business: "Bakare Services",
    timestamp: "2023-10-05 01:20 PM",
    applications: 6,
    assessmentStatus: "Completed",
  },
  {
    id: "ZZ/999999",
    name: "Extra User",
    email: "extra@example.com",
    business: "Extra LLC",
    timestamp: "2023-10-06 03:30 PM",
    applications: 1,
    assessmentStatus: "Submitted",
  },
];

export default function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<TableUser | null>(null);
  const pageSize = 10;

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

  const getAssessmentStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "submitted":
        return "bg-[#EBFFFC] text-[#117D70]";
      case "being processed":
        return "bg-[#FFF6D3] text-[#5E5B5B]";
      case "completed":
        return "bg-[#EBFBFF] text-[#227C9D]";
      case "rejected":
        return "bg-[#FFEBEB] text-[#850C0C]";
      case "approved":
        return "bg-[#EBFFFC] text-[#117D70]";
      case "not started":
        return "bg-[#FFEBEB] text-[#850C0C]";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalPages = Math.ceil(users.length / pageSize);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [currentPage]);
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
      accessorKey: "applications",
      header: "Applications",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div>
            <p className="font-medium text-[#171616] text-sm text-center">
              {row.applications}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "assessmentStatus",
      header: "Assessment Status",
      cell: (info: any) => {
        const row = info.row.original as any;
        const status = row.assessmentStatus;
        const styleClasses = getAssessmentStatusStyles(status);
        return (
          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${styleClasses}`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "more",
      header: "More",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewUser(row)}
              className="p-1 hover:bg-gray-100 rounded"
              title="View user info"
            >
              <CiUser
                className="text-[#A3A3A3] group-hover:text-[#06516C] transition-colors"
                size={20}
              />
            </button>
            <button
              onClick={() => handleDeleteUser(row)}
              className="p-1 hover:bg-gray-100 rounded"
              title="Delete user"
            >
              <Trash2
                size={16}
                className="text-[#A3A3A3] group-hover:text-red-500 transition-colors"
              />
            </button>
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
      <UserInfoModal
        userInfoModalOpen={userInfoModalOpen}
        setUserInfoModalOpen={setUserInfoModalOpen}
        selectedUser={selectedUser as AdminUser | null}
      />

      {/* Delete Confirmation Modal */}
      <DeactivateUserModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        confirmDeleteUser={confirmDeleteUser}
      />
    </>
  );
}
