'use client';

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import UsersTable from "./widgets/user-table";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      {/* Header */}
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">Users</h1>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Select>
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">By name</SelectItem>
              <SelectItem value="inactive">By User ID</SelectItem>
              <SelectItem value="inactive">By Company</SelectItem>
            </SelectContent>
          </Select>
          <Button>View Applications</Button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-tl-2xl p-4">
        <UsersTable />
      </div>
    </div>
  );
}
