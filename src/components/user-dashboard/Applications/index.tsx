"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Calendar, Filter, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ApplicationsTable } from "./ApplicationsTable";
import PageHeader from "@/components/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import Link from "next/link";
import StatsCards from "@/app/admin-dashboard/widgets/stats-card";
import { useGetApplicationStatusCounts } from "@/app/api/user/useGetApplicationStatusCounts";
import { useGetServices } from "@/app/api/services/useGetServices";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export interface ApplicationFilters {
  search?: string;
  service?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

const Applications = () => {
  const router = useRouter();
  const { data: statusCounts, isLoading: isLoadingStats } =
    useGetApplicationStatusCounts();
  const { data: services, isLoading: isLoadingServices } = useGetServices();

  // Filter states
  const [filters, setFilters] = useState<ApplicationFilters>({});
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  // Transform API data to display format
  const statsData = statusCounts
    ? [
        { label: "Applications Submitted", value: statusCounts.Submitted },
        {
          label: "Applications Being Processed",
          value: statusCounts["Being Processed"],
        },
        { label: "Applications Approved", value: statusCounts.Approved },
        { label: "Applications Rejected", value: statusCounts.Rejected },
        { label: "Applications Completed", value: statusCounts.Completed },
      ]
    : [];

  // Get unique services for dropdown
  const serviceOptions = useMemo(() => {
    if (!services) return [];
    return services.map((service) => service.name);
  }, [services]);

  // Status options
  const statusOptions = [
    "Submitted",
    "Being Processed",
    "Approved",
    "Rejected",
    "Completed",
  ];

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value || undefined }));
  };

  const handleServiceChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      service: value === "all" ? undefined : value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      status: value === "all" ? undefined : value,
    }));
  };

  const handleDateRangeChange = (from?: Date, to?: Date) => {
    setDateRange({ from, to });
    setFilters((prev) => ({
      ...prev,
      dateFrom: from,
      dateTo: to,
    }));
  };
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 flex-wrap gap-y-3">
        <PageHeader title="Applications" />
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
          <Button
            className="w-full sm:w-auto text-sm sm:text-base"
            onClick={() => router.push("/user-dashboard/assessment")}
          >
            Take Assessments
          </Button>
          <Link
            href="/user-dashboard/applications/apply"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto border border-[#FF5C5C] font-normal text-sm sm:text-base"
            >
              Apply to services and trainings
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-3 sm:p-4">
        {!isLoadingStats && statusCounts ? (
          <StatsCards stats={statsData} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-sm rounded-lg p-4 text-center border border-gray-200 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Applications Table */}
      <div className="col-span-1 mt-4 sm:mt-6">
        <Card className="bg-transparent border border-[#FFFFFF] rounded-[18px]">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-base sm:text-lg font-semibold text-[#706C6C] border-b border-[#FFFFFF] w-full pb-3 sm:pb-4">
                Application submission
              </CardTitle>
            </div>
            {/* Filters Section - Responsive */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0 mt-4 bg-[#FBFBFD] rounded-lg p-3 sm:p-5 justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10 bg-muted border-0 text-sm sm:text-base"
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              {/* Filter Controls */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
                {/* Service Filter */}
                <Select onValueChange={handleServiceChange}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-white border-[#DDDDDD] text-sm sm:text-base">
                    <SelectValue
                      placeholder="Filter by Service"
                      className="text-[#706C6C]"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    {serviceOptions.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full sm:w-[150px] bg-white border-[#DDDDDD] text-sm sm:text-base">
                    <SelectValue
                      placeholder="Filter Status"
                      className="text-[#706C6C]"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Date Range Filter */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto border-[#DDDDDD] bg-white text-[#b1afaf] hover:bg-[#FBFBFD] text-sm sm:text-base"
                    >
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        "Filter Date Range"
                      )}
                      <Calendar className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-fit p-4 sm:p-6">
                    <DialogHeader>
                      <DialogTitle className="text-center sm:text-left">
                        Select Date Range
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range) => {
                          if (range) {
                            handleDateRangeChange(range.from, range.to);
                          } else {
                            handleDateRangeChange(undefined, undefined);
                          }
                        }}
                        numberOfMonths={1}
                        className="sm:hidden"
                      />
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range) => {
                          if (range) {
                            handleDateRangeChange(range.from, range.to);
                          } else {
                            handleDateRangeChange(undefined, undefined);
                          }
                        }}
                        numberOfMonths={2}
                        className="hidden sm:block"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <ApplicationsTable filters={filters} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Applications;
