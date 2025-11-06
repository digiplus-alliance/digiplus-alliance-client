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
import { SquarePen, Trash2 } from "lucide-react";
import { useGetBlogPosts } from "@/app/api/admin/blog/getBlogs";
import { useDeleteBlog } from "@/app/api/admin/blog/deleteBlog";
import DeactivateUserModal from "../../users/widgets/delete-modal";

const blogSampleData = [
  {
    id: "1",
    blogTitle: "Introducing Our New Feature",
    date: "2023-10-01 12:00 PM",
    status: "Published",
  },
  {
    id: "2",
    blogTitle: "Understanding the Basics of React",
    date: "2023-10-02 10:00 AM",
    status: "Draft",
  },
  {
    id: "3",
    blogTitle: "A Guide to TypeScript",
    date: "2023-10-03 02:00 PM",
    status: "Published",
  },
];

// Type for blog table data
type BlogTableData = {
  id: string;
  blogTitle: string;
  date: string;
  status: string;
};

interface UsersTableProps {
  searchQuery?: string;
  editBlogPost: (blogId: string) => void;
}

export default function BlogTable({
  searchQuery,
  editBlogPost,
}: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState<BlogTableData | null>(null);
  const [open, setOpen] = useState(false);
  const [blogInfoModalOpen, setBlogInfoModalOpen] = useState(false);
  const { data: BlogPosts, isPending, isError } = useGetBlogPosts();
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog(
    selectedBlog ? selectedBlog.id : ""
  );

  // Use blogSampleData directly
  const tableData = blogSampleData;
  const isLoading = false;
  const error = null;

  const pageSize = 10;

  const handleViewBlog = (blog: BlogTableData) => {
    editBlogPost(blog.id);
  };

  const handleDeleteBlog = (blog: BlogTableData) => {
    setSelectedBlog(blog);
    setOpen(true);
  };

  const handleDelete = () => {
    if (selectedBlog) {
      console.log("Deleting blog:", selectedBlog);
    }
  };

  const totalPages = Math.ceil(tableData.length / pageSize);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tableData.slice(start, start + pageSize);
  }, [currentPage, tableData]);

  const columns: ColumnDef<BlogTableData>[] = [
    {
      accessorKey: "blogTitle",
      header: "Blog Title",
      cell: (info: CellContext<BlogTableData, unknown>) => (
        <span className="text-[#06516C]">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (info: CellContext<BlogTableData, unknown>) => {
        return (
          <div>
            <p className="font-normal text-[#171616] text-xs">
              {info.getValue() as string}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: CellContext<BlogTableData, unknown>) => (
        <span
          className={`p-2 w-fit items-center flex rounded-lg ${
            (info.getValue() as string) === "Published"
              ? "text-[#117D70] bg-[#EBFFFC]"
              : "text-[#7A5402] bg-[#FFF6D3]"
          }`}
        >
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "more",
      header: "More",
      cell: (info: any) => {
        const row = info.row.original as BlogTableData;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewBlog(row)}
              className="p-1 hover:bg-gray-100 rounded"
              title="View blog info"
            >
              <SquarePen
                className="text-[#A3A3A3] group-hover:text-[#06516C] transition-colors"
                size={20}
              />
            </button>
            <button
              onClick={() => handleDeleteBlog(row)}
              className="p-1 hover:bg-gray-100 rounded"
              title="View blog info"
            >
              <Trash2
                className="text-[#A3A3A3] group-hover:text-[#06516C] transition-colors"
                size={20}
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

      <DeactivateUserModal
        deleteModalOpen={open}
        setDeleteModalOpen={setOpen}
        confirmDeleteUser={handleDelete}
        loading={isDeleting}
        title="Delete Blog Post?"
        description="Are you sure you want to delete this blog post?  If you do, this blog post will not be available for users anymore."
        confirmButtonText="Delete"
      />
    </>
  );
}
