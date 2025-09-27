"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import UsersTable from "./widgets/user-table";
import FilterButton from "@/components/FilterButton";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const handleFilterChange = (value: string) => {
    console.log("Selected filter:", value);
  };
  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      {/* Header */}
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">Users</h1>
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
          <Button onClick={() => router.push("/admin-dashboard/applications")}>View Applications</Button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-tl-2xl p-4">
        <UsersTable />
      </div>
    </div>
  );
}
