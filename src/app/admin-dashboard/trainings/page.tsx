"use client";

import Searchbar from "@/components/Searchbar";
import FilterButton from "@/components/FilterButton";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import TrainingManagementTable from "./widgets/training-management-table";
import UploadFileDialog from "./widgets/upload-timetable-modal";
import { useState } from "react";
import { useGetAllServices } from "@/app/api/admin/services/get-all-services";
import { useSendTimetable } from "@/app/api/admin/trainings/time-table";

export default function TrainingsPage() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [timetableFile, setTimetableFile] = useState<File | undefined>();
  const [timetableLink, setTimetableLink] = useState<string | undefined>();
  const { data: services, isLoading } = useGetAllServices();
  const { mutate: sendTimetable, isPending } =
    useSendTimetable(selectedService);

  // Transform services data into filter options
  const serviceOptions = (services || []).map((service) => ({
    value: service.name,
    label: service.name,
  }));

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (value: string) => {
    setSelectedService(value);
  };

  const handleUpload = (file?: File, link?: string) => {
    setTimetableFile(file);
    setTimetableLink(link);
  };

  const handleSendToParticipants = () => {
    // Build the payload - use FormData when there's a file
    let payload: FormData | Record<string, any>;

    if (timetableFile) {
      // Use FormData for file uploads
      payload = new FormData();
      payload.append(
        "start_date",
        startDate ? startDate.toISOString().split("T")[0] : ""
      );
      payload.append(
        "end_date",
        endDate ? endDate.toISOString().split("T")[0] : ""
      );
      payload.append("file", timetableFile);
    } else {
      // Use JSON object for URL
      payload = {
        start_date: startDate ? startDate.toISOString().split("T")[0] : null,
        end_date: endDate ? endDate.toISOString().split("T")[0] : null,
        timetable_url: timetableLink,
      };
    }

    console.log("Send to Listed Participants - Payload:", payload);
    sendTimetable(payload as any, {
      onSuccess: () => {
        // Clear all input values
        setSelectedService("");
        setStartDate(undefined);
        setEndDate(undefined);
        setTimetableFile(undefined);
        setTimetableLink(undefined);
      },
    });
  };

  // Validation: Check if all required fields are filled
  const isFormValid =
    selectedService && startDate && endDate && (timetableFile || timetableLink);

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
          <Searchbar
            placeholder="Search by name or email"
            onSearch={handleSearch}
            value={searchQuery}
          />
          <Button
            className="border border-[#FF5C5C]"
            variant="ghost"
            onClick={() => setOpen(true)}
          >
            {timetableFile || timetableLink ? (
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Update Timetable
              </div>
            ) : (
              "Upload Timetable"
            )}
          </Button>
          <Button
            onClick={handleSendToParticipants}
            disabled={!isFormValid}
            title={!isFormValid ? "Please fill all required fields" : ""}
          >
            {isPending ? "Sending..." : "Send to Listed Participants"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
        <div className="flex flex-col  gap-3">
          <Label htmlFor="filter" className="text-[#706C6C] font-normal">
            Service
          </Label>
          <FilterButton
            placeholder={isLoading ? "Loading services..." : "Select"}
            options={serviceOptions}
            onChange={handleFilterChange}
            className="w-[25rem]"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker label="End Date" value={endDate} onChange={setEndDate} />
        </div>
      </div>

      <div className="p-6 rounded-lg border border-white shadow-sm pb-8">
        <h3 className="text-[#706C6C] text-xl font-bold border-b-2 border-white py-2">
          List of approved participants
        </h3>
        <TrainingManagementTable
          searchQuery={searchQuery}
          serviceFilter={selectedService}
        />
      </div>

      <UploadFileDialog
        open={open}
        onOpenChange={setOpen}
        onUpload={handleUpload}
        currentFile={timetableFile}
        currentLink={timetableLink}
      />
    </div>
  );
}
