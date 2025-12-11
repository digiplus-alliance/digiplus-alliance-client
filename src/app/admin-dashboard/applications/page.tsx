"use client";

import FilterButton from "@/components/FilterButton";
import { Button } from "@/components/ui/button";
import ApplicationTable from "./widgets/application-table";
import { useState, useEffect } from "react";
import CreateApplication from "./widgets/create-application";
import { useGetAllApplications } from "@/app/api/admin/applications";
import { exportAsCSV } from "@/lib/exportAsCSV";
import { toast } from "sonner";
import ApplicationsList from "./widgets/applications-list";
import { useSearchParams } from "next/navigation";

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const [activeScreen, setActiveScreen] = useState("create");
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>("");

  useEffect(() => {
    if (viewParam === "list") {
      setActiveScreen("list");
    }
  }, [viewParam]);

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

    // Flatten the data to include all fields including responses
    const flattenedData = applications.map((app) => {
      // Create base data
      const baseData: Record<string, string> = {
        _id: app._id,
        form_title: app.form_title,
        form_slug: app.form_slug,
        name: app.name,
        email: app.email,
        service: app.service,
        service_type: app.service_type,
        status: app.status,
        timestamp: app.timestamp,
        payment_status: app.payment_status,
        responses: JSON.stringify(app.responses), 
      };

      // Add each response as a separate column
      if (app.responses && app.responses.length > 0) {
        app.responses.forEach((response) => {
          baseData[response.data_key || response.question] = response.answer;
        });
      }

      return baseData;
    });

    // Collect all unique keys from all applications (to handle varying responses)
    const allKeys = new Set<string>();
    flattenedData.forEach((data) => {
      Object.keys(data).forEach((key) => allKeys.add(key));
    });

    // Define columns for CSV export
    const columns = Array.from(allKeys).map((key) => ({
      key: key as keyof (typeof flattenedData)[0],
      header: key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));

    const filename = serviceTypeFilter
      ? `applications_${serviceTypeFilter.replace(/\s+/g, "_")}_${
          new Date().toISOString().split("T")[0]
        }`
      : `applications_${new Date().toISOString().split("T")[0]}`;

    exportAsCSV(flattenedData, filename, columns);
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
