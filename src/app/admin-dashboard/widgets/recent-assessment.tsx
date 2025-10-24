"use client";

import { useGetAllSubmittedAssessments } from "@/app/api/admin/assessment/get-submitted-assessments";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentAssessment() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetAllSubmittedAssessments({
    page: 1,
    limit: 3,
  });

  // Error state
  if (isError) {
    return (
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <h3 className="font-normal text-[#171616] text-base md:text-2xl">
            Recent Assessment
          </h3>
          <button
            className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex"
            onClick={() => router.push("/admin-dashboard/assessment")}
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
              Failed to load assessments
            </h4>
            <p className="text-sm text-red-600 mb-4">
              There was an error loading the data. Please try again.
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state - show 3 streaming skeleton rows
  if (isLoading) {
    return (
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <h3 className="font-normal text-[#171616] text-base md:text-2xl">
            Recent Assessment
          </h3>
          <div className="text-sm text-[#8F8F8F] border border-transparent p-2 rounded-lg items-center flex">
            <p className="hidden md:block">&nbsp;</p>
          </div>
        </div>

        <div className="space-y-3 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 border rounded-md space-x-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex flex-col gap-1 w-full">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Loaded state - show top 3 assessments
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <h3 className="font-normal text-[#171616] text-base md:text-2xl">
          Recent Assessment
        </h3>
        <button
          className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex"
          onClick={() => router.push("/admin-dashboard/assessment")}
        >
          <p className="hidden md:block">See all</p>
          <span className="inline-block ml-1">
            <ArrowRight size={16} />
          </span>
        </button>
      </div>
      <div className="space-y-3 mt-8">
        {!data?.submissions || data.submissions.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-8">
            No assessments at the moment
          </div>
        ) : (
          <>
            {data.submissions.slice(0, 3).map((submission) => (
              <div
                key={submission.submission_id}
                className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center p-4 border rounded-md space-x-4"
              >
                <div className="flex items-center gap-3">
                  {submission.user.profile_picture ? (
                    <img
                      src={submission.user.profile_picture}
                      alt={submission.user.business_name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover w-10 h-10"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#EBFBFF] flex items-center justify-center text-sm font-semibold text-[#227C9D]">
                      {submission.user.business_name
                        ? submission.user.business_name.slice(0, 2).toUpperCase()
                        : "NA"}
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="font-regular text-[#171616] text-base">
                      {submission.user.business_name}
                    </p>
                    <p className="text-xs text-[#3D424F]">
                      <span className="text-[#A3A3A3]">
                        {submission.completed_date} at {submission.completed_time}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="text-sm text-[#227C9D] font-normal bg-[#EBFBFF] px-3 py-2 rounded-lg">
                    Submitted
                  </button>
                  <p className="flex justify-end text-[#B8B8B8] text-sm font-medium">
                    Score: {submission.scores.user_score}/{submission.scores.max_possible_score}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

