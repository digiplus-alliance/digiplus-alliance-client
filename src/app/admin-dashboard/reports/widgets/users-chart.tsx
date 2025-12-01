import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { exportAsCSV } from "@/lib/exportAsCSV";
import { useGetUsersMonthlyStats } from "@/app/api/admin/reports/get-users-monthly-stats";
import { useGetUsersYearlyStats } from "@/app/api/admin/reports/get-users-yearly-stats";

export function UsersChart() {
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("monthly");
  const { data: monthlyStatsData, isLoading: isLoadingMonthly } =
    useGetUsersMonthlyStats();

  console.log("Monthly Stats Data:", monthlyStatsData);
  const { data: yearlyStatsData, isLoading: isLoadingYearly } =
    useGetUsersYearlyStats();

  // Transform monthly_breakdown data to chart format
  const monthlyData = useMemo(() => {
    if (!monthlyStatsData?.monthly_breakdown) return [];
    return monthlyStatsData.monthly_breakdown.map((item) => ({
      month: item.month,
      score: item.total_users,
    }));
  }, [monthlyStatsData]);

  // Transform yearly_breakdown data to chart format
  const yearlyData = useMemo(() => {
    if (!yearlyStatsData?.yearly_breakdown) return [];
    return yearlyStatsData.yearly_breakdown.map((item) => ({
      year: item.year.toString(),
      score: item.total_users,
    }));
  }, [yearlyStatsData]);

  const [chartData, setChartData] = useState<
    {
      month?: string;
      year?: string;
      score: number;
    }[]
  >([]);

  // Update chart data when monthly/yearly data changes or view mode changes
  useEffect(() => {
    if (viewMode === "monthly") {
      setChartData(monthlyData);
    } else {
      setChartData(yearlyData);
    }
  }, [viewMode, monthlyData, yearlyData]);

  const handleViewModeChange = (mode: "monthly" | "yearly") => {
    setViewMode(mode);
  };

  const exportAssessmentToCSV = async () => {
    if (viewMode === "monthly" && monthlyStatsData) {
      // Flatten the monthly breakdown with user details for complete export
      const flattenedData = monthlyStatsData.monthly_breakdown.flatMap(
        (monthData) =>
          monthData.user_details.map((user) => ({
            month: monthData.month,
            month_number: monthData.month_number,
            year: monthData.year,
            total_users_in_month: monthData.total_users,
            user_id: user.user_id || "",
            email: user.email || "",
            phone_number: user.phone_number || "",
            business_name: user.business_name || "",
            website: user.website || "",
            created_at: user.createdAt || "",
            updated_at: user.updatedAt || "",
          }))
      );

      exportAsCSV(
        flattenedData,
        `users-monthly-stats-${monthlyStatsData.year}`,
        [
          { key: "month", header: "Month" },
          { key: "month_number", header: "Month Number" },
          { key: "year", header: "Year" },
          { key: "total_users_in_month", header: "Total Users in Month" },
          { key: "user_id", header: "User ID" },
          { key: "email", header: "Email" },
          { key: "phone_number", header: "Phone Number" },
          { key: "business_name", header: "Business Name" },
          { key: "website", header: "Website" },
          { key: "created_at", header: "Created At" },
          { key: "updated_at", header: "Updated At" },
        ]
      );
    } else if (viewMode === "yearly" && yearlyStatsData) {
      // Export the yearly breakdown
      exportAsCSV(
        yearlyStatsData.yearly_breakdown,
        `users-yearly-stats-${yearlyStatsData.start_year}-${yearlyStatsData.end_year}`,
        [
          { key: "year", header: "Year" },
          { key: "total_users", header: "Total Users" },
        ]
      );
    }
  };

  const isLoading = isLoadingMonthly || isLoadingYearly;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-gray-500">
            Loading assessment chart...
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 lg:col-span-2">
      <div className="flex justify-between items-center mb-3  pb-2">
        <h3 className="font-normal text-[#A3A3A3] ">Total Users</h3>
        <Button
          variant="default"
          size="sm"
          onClick={exportAssessmentToCSV}
          className="w-auto bg-transparent hover:bg-transparent  cursor-pointer hover:text-[#0E5F7D] underline-offset-4 shadow-none drop-shadow-none text-[#0E5F7D] text-sm"
        >
          <Download
            className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
            color="#0E5F7D"
          />
          <span className="hidden sm:inline">Download Reports</span>
          <span className="sm:hidden">Download</span>
        </Button>
      </div>
      <div className=" flex items-center gap-2 w-full">
        <button
          onClick={() => handleViewModeChange("monthly")}
          className={`px-3 py-1 transition-all relative ${
            viewMode === "monthly"
              ? "text-[#227C9D]"
              : "text-[#A3A3A3] hover:text-[#227C9D]"
          }`}
        >
          <h3>Monthly</h3>
          {viewMode === "monthly" && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-[#227C9D]"></span>
          )}
        </button>
        <button
          onClick={() => handleViewModeChange("yearly")}
          className={`px-3 py-1 transition-all relative ${
            viewMode === "yearly"
              ? "text-[#227C9D]"
              : "text-[#A3A3A3] hover:text-[#227C9D]"
          }`}
        >
          <h3>Yearly</h3>
          {viewMode === "yearly" && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-[#227C9D]"></span>
          )}
        </button>
      </div>

      <div className="mt-4">
        {chartData.length > 0 ? (
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ left: -0, right: 10, top: 5, bottom: 5 }}
              >
                <XAxis
                  dataKey={viewMode === "monthly" ? "month" : "year"}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#B8B8B8" }}
                  className="sm:text-xs"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#B8B8B8" }}
                  domain={[0, 100]}
                  className="sm:text-xs"
                  width={30}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#D63A3A"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 2 }}
                  activeDot={{ r: 3, fill: "hsl(var(--primary))" }}
                  className="sm:stroke-[3px]"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center items-center py-8">
              <div className="text-sm text-gray-500">
                Assessment chart not found
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
