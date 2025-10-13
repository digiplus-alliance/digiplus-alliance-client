"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import UsersTable from "./widgets/user-table";
import { useRouter } from "next/navigation";
import Searchbar from "@/components/Searchbar";

export default function page() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      {/* Header */}
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">Users</h1>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Searchbar 
            placeholder="Search users..." 
            onSearch={handleSearch}
            value={searchQuery}
          />
          <Button onClick={() => router.push("/admin-dashboard/applications")}>
            View Applications
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-tl-2xl p-4">
        <UsersTable searchQuery={searchQuery} />
      </div>
    </div>
  );
}
