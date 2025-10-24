"use client";

import FilterButton from "@/components/FilterButton";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import TrainingManagementTable from "./widgets/training-management-table";
import UploadFileDialog from "./widgets/upload-timetable-modal";
import { useState } from "react";
import { useGetAllTrainingUsers } from "@/app/api/admin/trainings/getUsers";

export default function TrainingsPage() {
  const [open, setOpen] = useState(false);

  const handleFilterChange = (value: string) => {
    console.log("Selected filter:", value);
  };

  const { data: trainingUsers, isPending, error } = useGetAllTrainingUsers();

  console.log("Training Users:", trainingUsers);

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      {/* Header */}
      <div className="flex items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-primary font-bold">
            Training Management
          </h1>
          <p className="text-[#5E5B5B]">
            Manage training details and participants
          </p>
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
          <Button className="border border-[#FF5C5C]" variant="ghost" onClick={() => setOpen(true)}>
            Upload Timetable
          </Button>
          <Button>Send to Listed Participants</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
        <div className="flex flex-col  gap-3">
          <Label htmlFor="filter" className="text-[#706C6C] font-normal">
            Service
          </Label>
          <FilterButton
            placeholder="Select"
            options={[
              { label: "By Name", value: "name" },
              { label: "By User ID", value: "userId" },
              { label: "By Company", value: "company" },
            ]}
            onChange={handleFilterChange}
            className="w-[25rem]"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <DatePicker label="Start Date" />
          <DatePicker label="End Date" />
        </div>
      </div>

      <div className="p-6 rounded-lg border border-white shadow-sm pb-8">
        <h3 className="text-[#706C6C] text-xl font-bold border-b-2 border-white py-2">
          List of approved participants
        </h3>
        <TrainingManagementTable />
      </div>

      <UploadFileDialog
        open={open}
        onOpenChange={setOpen}
        onUpload={(file, link) => {
          console.log("Uploaded file:", file);
          console.log("Or link:", link);
        }}
      />
    </div>
  );
}
