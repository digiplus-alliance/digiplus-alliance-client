"use client";

import FilterButton from "@/components/FilterButton";
import { Button } from "@/components/ui/button";
import App from "next/app";
import ApplicationTable from "./widgets/application-table";

export default function ApplicationsPage() {
  const handleFilterChange = (value: string) => {
    console.log("Selected filter:", value);
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
        <div className="hidden md:flex md:items-center md:gap-4">
          <FilterButton
            placeholder="Filter Status"
            options={[
              { label: "By Name", value: "name" },
              { label: "By User ID", value: "userId" },
              { label: "By Company", value: "company" },
            ]}
            onChange={handleFilterChange}
          />
          <Button>Export as CSV</Button>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" className="text-[#227C9D]">
          Create Application Questions
        </Button>
        <Button variant="ghost" className="text-[#227C9D]">
          Edit Current Application
        </Button>
        <Button variant="outline" className="bg-white border-none">
          Application List
        </Button>
      </div>
      <div className="overflow-x-auto bg-white rounded-tl-2xl p-4">
        <ApplicationTable />
      </div>
    </div>
  );
}
