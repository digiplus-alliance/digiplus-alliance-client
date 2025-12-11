"use client";

import { Button } from "@/components/ui/button";
import StatsCards from "./widgets/stats-card";
import { useAuthStore } from "@/store/auth";
import { useGetAllMetrics } from "../api/admin/metrics";
import { useRouter } from "next/navigation";
import RecentApplication from "./widgets/recent-application";
import RecentAssessment from "./widgets/recent-assessment";
import RecentUsers from "./widgets/recent-users";
import RecentBlog from "./widgets/recent-blog";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const { data: metrics, isLoading, error } = useGetAllMetrics();
  const router = useRouter();

  const statsData = [
    { label: "Total Users", value: metrics?.totalUsers ?? 0 },
    { label: "Total Applications", value: metrics?.totalApplications ?? 0 },
    {
      label: "Total Assessments Completed",
      value: metrics?.totalAssessmentsCompleted ?? 0,
    },
  ];

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      {/* Header */}
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">
            Welcome {user?.first_name}
          </h1>
          <p className="text-sm text-[#706C6C]">
            What would you like to do today?
          </p>
        </div>

        <div className="hidden md:block">
          <Button onClick={() => router.push("/admin-dashboard/assessment?view=list")}>
            View Assessments
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4">
        <StatsCards stats={statsData} isLoading={isLoading} error={error} />
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Application */}
        <RecentApplication />

        {/* Recent Assessment */}
        <RecentAssessment />
      </div>

      {/* Users + Blog Post */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users */}
        <RecentUsers />

        {/* Blog Post */}
        <RecentBlog />
      </div>
    </div>
  );
}
