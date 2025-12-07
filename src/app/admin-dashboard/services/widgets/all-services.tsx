import { useGetAllServices } from "@/app/api/admin/services/get-all-services";
import ServiceCard from "./service-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Ban } from "lucide-react";

// Skeleton Card Component
function ServiceCardSkeleton() {
  return (
    <Card className="md:w-[13rem] max-w-[400px] min-h-[10rem] overflow-hidden p-0 flex flex-col justify-between bg-transparent border-none shadow-none drop-shadow-none">
      {/* Image Skeleton */}
      <Skeleton className="relative w-full h-32" />

      {/* Title Skeleton */}
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>

      {/* Body Skeleton */}
      <CardContent className="flex-grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="justify-end py-4">
        <Skeleton className="h-6 w-24" />
      </CardFooter>
    </Card>
  );
}

interface AllServicesProps {
  onEdit: (serviceId: string) => void;
}

export default function AllServices({ onEdit }: AllServicesProps) {
  const { data: services, isLoading, error } = useGetAllServices();

  // Loading State - Show 8 skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
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

  // Success State - Show services or empty state
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {services && services.length > 0 ? (
        services.map((it) => (
          <ServiceCard
            key={it._id}
            image={it.image}
            title={it.name}
            body={it.short_description ?? ""}
            footer={it.price ?? ""}
          />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] text-center p-8">
          <p className="text-gray-500 text-lg">No services available</p>
        </div>
      )}
    </div>
  );
}
