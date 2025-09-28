"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UsersMiniTable from "./widgets/users-mini-table";
import StatsCards from "./widgets/stats-card";

const statsData = [
  { label: "Total Users", value: 10 },
  { label: "Total Applications", value: 10 },
  { label: "Total Assessments Completed", value: 10 },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      {/* Header */}
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">Welcome Opeyemi</h1>
          <p className="text-sm text-[#706C6C]">
            What would you like to do today?
          </p>
        </div>

        <div className="hidden md:block">
          <Button>View Assessments</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4">
        <StatsCards stats={statsData} />
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Application */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3 border-b pb-2">
            <h3 className="font-normal text-[#171616] text-base md:text-2xl">
              Recent Application
            </h3>
            <button className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex">
              <p className="hidden md:block">See all</p>
              <span className="inline-block ml-1">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
          <div className="space-y-3 mt-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4  border rounded-md space-x-4"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/about/team-placeholder-four.png"
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-regular text-[#171616] text-base">
                      Service Name
                    </p>
                    <p className="text-xs text-[#3D424F] ">
                      <span className="text-[#D63A3A]">100,000.00 NGN</span> •{" "}
                      <span className="text-[#A3A3A3]">
                        April 20, 2022 at 04:00 PM
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="text-sm text-[#227C9D] font-normal bg-[#EBFBFF] px-3 py-2 rounded-lg">
                    Submitted
                  </button>
                  <p className="flex justify-end text-[#B8B8B8] text-sm font-medium">
                    Qty: 1
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Assessment */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3 border-b pb-2">
            <h3 className="font-normal text-[#171616] ">Recent Assessment</h3>
            <button className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex">
              See all{" "}
              <span className="inline-block ml-1">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 border rounded-md"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/about/team-placeholder-four.png"
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-regular text-[#171616] text-base">
                      Name of Company
                    </p>
                    <p className="text-sm text-[#A3A3A3]">
                      April 20, 2022 at 04:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="text-sm text-[#227C9D] font-normal bg-[#EBFBFF] px-3 py-2 rounded-lg">
                    Submitted
                  </button>
                  <p className="flex justify-end text-[#B8B8B8] text-sm font-medium">
                    Qty: 1
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users + Blog Post */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 lg:col-span-2">
          <div className="flex justify-between items-center mb-3  pb-2">
            <h3 className="font-normal text-[#171616] ">Users</h3>
            <button className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex">
              See all{" "}
              <span className="inline-block ml-1">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
          <div className="flex items-center gap-3 mb-4">
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
          </div>
          <UsersMiniTable />
        </div>

        {/* Blog Post */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <h3 className="font-normal text-[#171616] ">Blog Post</h3>
            <button className="text-sm text-[#8F8F8F] border border-[#227C9D] p-2 rounded-lg items-center flex">
              See all{" "}
              <span className="inline-block ml-1">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/about/team-placeholder-four.png"
                    alt="author"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-normal text-base">Post Title</p>
                    <span
                      className={`text-xs ${
                        i % 2 === 0
                          ? "text-[#008080] bg-[#EBFBFF] px-2 py-1 rounded-2xl text-xs"
                          : "text-gray-400 bg-[#F5F5F5] px-2 py-1 rounded-2xl text-xs"
                      }`}
                    >
                      {i % 2 === 0 ? "Published" : "Unpublished"}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#B8B8B8]">10 hours ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
