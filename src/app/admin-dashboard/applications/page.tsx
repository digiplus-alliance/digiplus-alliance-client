"use client";

import FilterButton from "@/components/FilterButton";
import { Button } from "@/components/ui/button";
import ApplicationTable from "./widgets/application-table";
import { useState } from "react";
import CreateApplication from "./widgets/create-application";
import { useGetAllApplications } from "@/app/api/admin/applications";
import { exportAsCSV } from "@/lib/exportAsCSV";
import { toast } from "sonner";
import ApplicationsList from "./widgets/applications-list";

export default function ApplicationsPage() {
  const [activeScreen, setActiveScreen] = useState("create");
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>("");

  // Fetch applications data for export
  const { data: applications } = useGetAllApplications({
    service_type: serviceTypeFilter || undefined,
  });

  const handleFilterChange = (value: string) => {
    setServiceTypeFilter(value);
  };

  const handleExportCSV = () => {
    if (!applications || applications.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Define columns for CSV export
    const columns = [
      { key: "name" as const, header: "Name" },
      { key: "email" as const, header: "Email" },
      { key: "service" as const, header: "Service" },
      { key: "service_type" as const, header: "Service Type" },
      { key: "status" as const, header: "Status" },
      { key: "payment_status" as const, header: "Payment Status" },
      { key: "timestamp" as const, header: "Timestamp" },
    ];

    const filename = serviceTypeFilter
      ? `applications_${serviceTypeFilter.replace(/\s+/g, "_")}_${
          new Date().toISOString().split("T")[0]
        }`
      : `applications_${new Date().toISOString().split("T")[0]}`;

    exportAsCSV(applications, filename, columns);
    toast.success("Applications exported successfully!");
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "list":
        return <ApplicationTable serviceTypeFilter={serviceTypeFilter} />;
      case "create":
        return <CreateApplication />;
      case "edit":
        return <ApplicationsList />;
      default:
        return <CreateApplication />;
    }
  };

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      {/* Header */}
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">
            Application Management
          </h1>
        </div>
        {activeScreen === "list" && (
          <div className="hidden md:flex md:items-center md:gap-4">
            <FilterButton
              placeholder={serviceTypeFilter || "Filter by Service Type"}
              options={[
                { value: "Ecosystem Building", label: "Ecosystem Building" },
                {
                  value: "Digital Skills & Training",
                  label: "Digital Skills & Training",
                },
                {
                  value: "Digital Infrastructure / Tools",
                  label: "Digital Infrastructure / Tools",
                },
                {
                  value: "Business Advisory & Ecosystem Support",
                  label: "Business Advisory & Ecosystem Support",
                },
                { value: "Research & Insights", label: "Research & Insights" },
                {
                  value: "Innovation & Co-creation Labs",
                  label: "Innovation & Co-creation Labs",
                },
              ]}
              onChange={handleFilterChange}
            />
            <Button onClick={handleExportCSV}>Export as CSV</Button>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <Button
          variant="ghost"
          className={
            activeScreen === "create"
              ? "text-[#227C9D] bg-white border-none p-4"
              : ""
          }
          onClick={() => setActiveScreen("create")}
        >
          Create Application Questions
        </Button>
        <Button
          variant="ghost"
          className={
            activeScreen === "edit"
              ? "text-[#227C9D] bg-white border-none p-4"
              : ""
          }
          onClick={() => setActiveScreen("edit")}
        >
          Edit Applications
        </Button>
        <Button
          variant="ghost"
          className={
            activeScreen === "list" ? "bg-white border-none text-[#227C9D]" : ""
          }
          onClick={() => setActiveScreen("list")}
        >
          Application List
        </Button>
        {activeScreen === "list" && serviceTypeFilter !== "" && (
          <Button
            variant="ghost"
            className="text-[#227C9D]"
            onClick={() => setServiceTypeFilter("")}
          >
            Clear Filter
          </Button>
        )}
      </div>
      <div className="overflow-x-auto ">{renderScreen()}</div>
    </div>
  );
}
