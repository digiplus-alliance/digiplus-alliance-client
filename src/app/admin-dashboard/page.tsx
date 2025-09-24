"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function AdminDashboard() {
  const [users] = useState([
    { id: "AP/2030222", name: "Oyebode Anjoke", email: "anjoke@gmail.com", business: "Company Name" },
    { id: "PY/093456U", name: "Oyebode Anjoke", email: "anjoke@gmail.com", business: "Company Name" },
    { id: "MM/1320CSAD", name: "Oyebode Anjoke", email: "anjoke@gmail.com", business: "Company Name" },
    { id: "UP/89ASD98", name: "Oyebode Anjoke", email: "anjoke@gmail.com", business: "Company Name" },
    { id: "LO/12309AS0", name: "Oyebode Anjoke", email: "anjoke@gmail.com", business: "Company Name" },
  ]);

  return (
    <div className="p-6 space-y-6 font-secondary">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome Opeyemi</h1>
          <p className="text-sm text-gray-500">What would you like to do today?</p>
        </div>
        <Button className="bg-[#EB7A21] hover:bg-[#d56a1d] text-white rounded-md">
          View Assessment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: 10 },
          { label: "Total applications", value: 10 },
          { label: "Total assessments completed", value: 10 },
        ].map((card, i) => (
          <div key={i} className="bg-white shadow-sm rounded-lg p-4 text-center border border-gray-200">
            <p className="text-sm text-gray-500">{card.label}</p>
            <h2 className="text-2xl font-semibold">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Application */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Recent Application</h3>
            <button className="text-sm text-[#008080]">See all →</button>
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <Image src="/avatar.png" alt="user" width={40} height={40} className="rounded-full" />
                  <div>
                    <p className="font-medium">Service Name</p>
                    <p className="text-xs text-gray-500">
                      100,000.00 NGN • April 20, 2022 at 04:00 PM
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#008080] font-semibold">Submitted</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Assessment */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Recent Assessment</h3>
            <button className="text-sm text-[#008080]">See all →</button>
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <Image src="/avatar.png" alt="user" width={40} height={40} className="rounded-full" />
                  <div>
                    <p className="font-medium">Name of Company</p>
                    <p className="text-xs text-gray-500">April 20, 2022 at 04:00 PM</p>
                  </div>
                </div>
                <span className="text-xs text-[#008080] font-semibold">Submitted</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users + Blog Post */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Users</h3>
            <button className="text-sm text-[#008080]">See all →</button>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Input placeholder="Search something..." className="flex-1" />
            {/* <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">User ID</th>
                <th className="py-2">Name/Email</th>
                <th className="py-2">Business name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 text-[#008080]">{u.id}</td>
                  <td className="py-2">
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </td>
                  <td className="py-2 text-[#008080]">{u.business}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Blog Post */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Blog Post</h3>
            <button className="text-sm text-[#008080]">See all →</button>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-3">
                  <Image src="/avatar.png" alt="author" width={32} height={32} className="rounded-full" />
                  <div>
                    <p className="font-medium">Post Title</p>
                    <span
                      className={`text-xs ${
                        i % 2 === 0 ? "text-[#008080]" : "text-gray-400"
                      }`}
                    >
                      {i % 2 === 0 ? "Published" : "Unpublished"}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">10 hours ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
