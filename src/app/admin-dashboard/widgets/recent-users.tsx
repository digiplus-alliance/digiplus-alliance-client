"use client";

// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import UsersMiniTable from "./users-mini-table";

export default function RecentUsers() {
  const router = useRouter();
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 lg:col-span-2">
      <div className="flex justify-between items-center mb-3  pb-2">
        <h3 className="font-normal text-[#171616] ">Users</h3>
        <button
          className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex"
          onClick={() => router.push("/admin-dashboard/users")}
        >
          See all{" "}
          <span className="inline-block ml-1">
            <ArrowRight size={16} />
          </span>
        </button>
      </div>
      {/* <div className="flex items-center gap-3 mb-4">
        <Input placeholder="Search something..." className="flex-1" />
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      <UsersMiniTable />
    </div>
  );
}
