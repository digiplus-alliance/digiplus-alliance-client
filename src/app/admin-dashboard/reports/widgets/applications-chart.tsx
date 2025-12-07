import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useGetApplicationsMonthlyStats } from "@/app/api/admin/reports/get-applications-monthly-stats";
import { useGetApplicationsYearlyStats } from "@/app/api/admin/reports/get-applications-yearly-stats";

export function ApplicationsChart() {
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("monthly");
  const router = useRouter();
  const { data: monthlyStatsData, isLoading: isLoadingMonthly } =
    useGetApplicationsMonthlyStats();
  const { data: yearlyStatsData, isLoading: isLoadingYearly } =
    useGetApplicationsYearlyStats();

  // Transform monthly_breakdown data to chart format
  const monthlyData = useMemo(() => {
    if (!monthlyStatsData?.monthly_breakdown) return [];
    return monthlyStatsData.monthly_breakdown.map((item) => ({
      month: item.month,
      score: item.total_applications,
    }));
  }, [monthlyStatsData]);

  // Transform yearly_breakdown data to chart format
  const yearlyData = useMemo(() => {
    if (!yearlyStatsData?.yearly_breakdown) return [];
    return yearlyStatsData.yearly_breakdown.map((item) => ({
      year: item.year.toString(),
      score: item.total_applications,
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
        <h3 className="font-normal text-[#A3A3A3] ">Application Submission</h3>
        <Button
          variant={"ghost"}
          className="text-sm text-[#0E5F7D] p-2 items-center flex"
          onClick={() => router.push("/admin-dashboard/applications?view=list")}
        >
          <p className="hidden md:block">Go to Applications</p>
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
