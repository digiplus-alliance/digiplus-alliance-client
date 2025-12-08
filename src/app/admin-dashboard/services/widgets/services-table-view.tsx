import { useGetAllServices } from "@/app/api/admin/services/get-all-services";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Ban, MoreVertical, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import DeactivateUserModal from "../../users/widgets/delete-modal";
import { useState } from "react";
import { useDeleteService } from "@/app/api/admin/services/delete-service";

// Skeleton Table Row Component
function TableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-12 w-12 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full max-w-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8 rounded" />
      </TableCell>
    </TableRow>
  );
}

interface ServicesTableViewProps {
  onEdit: (serviceId: string) => void;
}

export default function ServicesTableView({ onEdit }: ServicesTableViewProps) {
  const { data: services, isLoading, error } = useGetAllServices();
  const [serviceId, setServiceId] = useState<string | null>(null);
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService(
    serviceId || ""
  );
  const [open, setOpen] = useState(false);

  const handleEdit = (serviceId: string) => {
    onEdit(serviceId);
  };

  const handleDelete = (serviceId: string) => {
    setServiceId(serviceId);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (serviceId) {
      deleteService(undefined, {
        onSuccess: () => {
          setOpen(false);
          setServiceId(null);
        },
        onError: () => {
          setOpen(false);
          setServiceId(null);
        },
        onSettled: () => {
          setOpen(false);
          setServiceId(null);
        },
      });
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRowSkeleton key={index} />
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <Ban className="mx-auto mb-4 text-red-600" size={48} />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Failed to Load Services
          </h3>
          <p className="text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "An error occurred while fetching services. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!services || services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <p className="text-gray-500 text-lg">No services available</p>
      </div>
    );
  }

  // Success State - Table View
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service._id} className="hover:bg-gray-50">
              <TableCell>
                <div className="relative w-12 h-12 rounded overflow-hidden">
                  <Image
                    src={service.image || "/placeholder-one.png"}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell className="max-w-md truncate">
                {service.short_description || "No description available"}
              </TableCell>
              <TableCell className="text-right">
                {service.price || "N/A"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleEdit(service._id)}
                      className="cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(service._id)}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeactivateUserModal
        deleteModalOpen={open}
        setDeleteModalOpen={setOpen}
        confirmDeleteUser={confirmDelete}
        loading={isDeleting}
        title="Delete Service?"
        description="Are you sure you want to delete this service? This action cannot be undone."
        confirmButtonText="Delete"
      />
    </div>
  );
}
