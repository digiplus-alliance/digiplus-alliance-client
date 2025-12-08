"use client";

import { Button } from "@/components/ui/button";
import StatsCards from "../widgets/stats-card";
import { useAuthStore } from "@/store/auth";
import { useGetAllMetrics } from "@/app/api/admin/metrics";
import { useRouter } from "next/navigation";

import RecentUsers from "../widgets/recent-users";
import { AdminAssessmentChart } from "./widgets/assessments-chart";
import { ApplicationsChart } from "./widgets/applications-chart";
import { UsersChart } from "./widgets/users-chart";

export default function Reports() {
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
          <Button onClick={() => router.push("/admin-dashboard/assessment")}>
            View Assessments
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4">
        <StatsCards stats={statsData} isLoading={isLoading} error={error} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Application */}
        <div>
          <UsersChart />
        </div>

        {/* Recent Assessment */}
        <div>
          <ApplicationsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AdminAssessmentChart />
        </div>
        <div>
          <RecentUsers pageSize={3}/>
        </div>
      </div>
    </div>
  );
}
