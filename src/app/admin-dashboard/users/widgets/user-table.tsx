import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import Pagination from "@/components/Pagination";
import { CiUser } from "react-icons/ci";
// import { Trash2 } from "lucide-react";
import UserInfoModal from "./profile-modal";
import DeactivateUserModal from "./delete-modal";
import { AdminUser } from "@/types/admin/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsers } from "@/app/api/admin/users";
import { Skeleton } from "@/components/ui/skeleton";

// Extended type for table data that matches current structure
type TableUser = {
  id: string;
  name: string;
  email: string;
  business: string;
  timestamp: string;
  applications: number;
  assessment: number;
  // Additional fields for AdminUser compatibility
  userId: string;
  business_name: string;
  applications_count: number;
  profile_picture: string;
  phone: string;
  website: string;
  role: string;
  assessments_count: number;
  created_at: string;
  updated_at: string;
  last_login: string;
};

interface UsersTableProps {
  searchQuery?: string;
}

export default function UsersTable({ searchQuery }: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<TableUser | null>(null);
  const {
    data: apiUsers,
    isLoading,
    error,
  } = useGetAllUsers({
    search: searchQuery,
  });
  const [tableData, setTableData] = useState<TableUser[]>([]);

  const pageSize = 10;

  // Map API users to table data
  useEffect(() => {
    if (apiUsers) {
      const mapped = apiUsers.map((u) => ({
        id: u._id,
        userId: u._id,
        name: `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() || u.email,
        email: u.email,
        business: u.business_name ?? "",
        business_name: u.business_name ?? "",
        timestamp: new Date(u.createdAt).toLocaleString(),
        applications: u.applications_count ?? 0,
        applications_count: u.applications_count ?? 0,
        assessment: u.assessments_count ?? 0,
        assessments_count: u.assessments_count ?? 0,
        profile_picture: u.profile_picture ?? "",
        phone: "",
        website: "",
        role: u.role ?? "",
        last_login: u.last_login ?? "",
        created_at: u.createdAt,
        updated_at: u.updatedAt,
      }));
      setTableData(mapped);
      setCurrentPage(1);
    }
  }, [apiUsers]);

  const handleViewUser = (user: TableUser) => {
    setSelectedUser(user);
    setUserInfoModalOpen(true);
  };

  // const handleDeleteUser = (user: TableUser) => {
  //   setUserToDelete(user);
  //   setDeleteModalOpen(true);
  // };

  const confirmDeleteUser = () => {
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
      accessorKey: "id",
      header: "User ID",
      cell: (info: CellContext<TableUser, unknown>) => (
        <span className="text-[#06516C]">
          {(info.getValue() as string).slice(-6).toUpperCase()}
        </span>
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
      accessorKey: "assessment",
      header: "Assessment",
      cell: (info: any) => {
        const row = info.row.original as any;
        return (
          <div>
            <p className="font-medium text-[#171616] text-sm text-center">
              {row.assessment}
            </p>
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
            {/* <button
              onClick={() => handleDeleteUser(row)}
              className="p-1 hover:bg-gray-100 rounded"
              title="Delete user"
            >
              <Trash2
                size={16}
                className="text-[#A3A3A3] group-hover:text-red-500 transition-colors"
              />
            </button> */}
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

  // Error state
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

  // Loading state - show skeleton table
  if (isLoading) {
    return (
      <>
        <Table>
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
                Applications
              </TableHead>
              <TableHead className="px-4 py-2 text-[#B8B8B8] font-bold">
                Assessment Status
              </TableHead>
              <TableHead className="px-4 py-2 text-[#B8B8B8] font-bold">
                More
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i} className="border-t">
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }

  // Empty state
  if (!tableData || tableData.length === 0) {
    return <div className="text-center text-sm text-gray-500 p-8">Empty</div>;
  }

  return (
    <>
      <Table>
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
