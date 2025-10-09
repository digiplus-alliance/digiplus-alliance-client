"use client";

import { useGetAllApplications } from "@/app/api/admin/applications";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentApplication() {
  const router = useRouter();
  const { data: applications, isLoading, error } = useGetAllApplications();

  // Error state
  if (error) {
    return (
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <h3 className="font-normal text-[#171616] text-base md:text-2xl">
            Recent Application
          </h3>
          <button
            className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex"
            onClick={() => router.push("/admin-dashboard/applications")}
          >
            <p className="hidden md:block">See all</p>
            <span className="inline-block ml-1">
              <ArrowRight size={16} />
            </span>
          </button>
        </div>

        <div className="p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-red-800 font-semibold">
              Failed to load applications
            </h4>
            <p className="text-sm text-red-600">
              {error instanceof Error ? error.message : String(error)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state - show 2 streaming skeleton rows
  if (isLoading) {
    return (
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <h3 className="font-normal text-[#171616] text-base md:text-2xl">
            Recent Application
          </h3>
          <div className="text-sm text-[#8F8F8F] border border-transparent p-2 rounded-lg items-center flex">
            <p className="hidden md:block">&nbsp;</p>
          </div>
        </div>

        <div className="space-y-3 mt-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4  border rounded-md space-x-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex flex-col gap-1 w-full">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Loaded state - show top 2 applications
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <h3 className="font-normal text-[#171616] text-base md:text-2xl">
          Recent Application
        </h3>
        <button
          className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex"
          onClick={() => router.push("/admin-dashboard/applications")}
        >
          <p className="hidden md:block">See all</p>
          <span className="inline-block ml-1">
            <ArrowRight size={16} />
          </span>
        </button>
      </div>
      <div className="space-y-3 mt-8">
        {(!applications || applications.length === 0) ? (
          <div className="text-center text-sm text-gray-500">No Applications at the moment</div>
        ) : (
          <>
            {applications.slice(0, 2).map((application) => (
              <div
                key={application._id}
                className="flex justify-between items-center p-4  border rounded-md space-x-4"
              >
                <div className="flex items-center gap-3">
                  {application.image ? (
                    <Image
                      src={application.image}
                      alt={application.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#EBFBFF] flex items-center justify-center text-sm font-semibold text-[#227C9D]">
                      {application.name ? application.name.slice(0, 2).toUpperCase() : "NA"}
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="font-regular text-[#171616] text-base">{application.service}</p>
                    <p className="text-xs text-[#3D424F] ">
                      <span className="text-[#D63A3A]">{application.payment_status}</span> • <span className="text-[#A3A3A3]">{application.timestamp}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="text-sm text-[#227C9D] font-normal bg-[#EBFBFF] px-3 py-2 rounded-lg">{application.status}</button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
