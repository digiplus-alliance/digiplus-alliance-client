"use client";

import { useState, useEffect } from "react";
import CurrentAssessment from "./current-assessment/main";
import EditAssessment from "./edit-assessment/main";
import ListAssessment from "./list-assessment/main";
import { Button } from "@/components/ui/button";
import FilterButton from "@/components/FilterButton";
import { useSearchParams } from "next/navigation";

export default function AssessmentPage() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const [activeComponent, setActiveComponent] = useState<
    "current" | "edit" | "list"
  >("current");

  useEffect(() => {
    if (viewParam === "list") {
      setActiveComponent("list");
    }
  }, [viewParam]);

  const handleFilterChange = (value: string) => {
    console.log("Selected filter:", value);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "current":
        return <CurrentAssessment />;
      case "edit":
        return <EditAssessment toggleComponent={setActiveComponent} />;
      case "list":
        return <ListAssessment/>;
    }
  };

  return (
    <div className="p-6 space-y-6 font-secondary md:bg-[#EBEBEB] rounded-tl-2xl">
      <div>
        {/* Header */}
        <div className="flex items-start md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl text-primary font-bold">
              {activeComponent === "current" && "Assessment Management"}
              {activeComponent === "edit" && "Edit current question"}
              {activeComponent === "list" && "Assessment Management"}
            </h1>
          </div>
          <div className="hidden md:flex md:items-center md:gap-4">
            {activeComponent === "current" && (
              <>
                <Button>Import Assessment Questions</Button>
              </>
            )}
            {activeComponent === "edit" && (
              <>
                <Button>Update</Button>
              </>
            )}
            {activeComponent === "list" && (
              <>
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
                  <Button>Download as CSV</Button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4 my-4">
          <Button
            variant="ghost"
            className={`text-[#227C9D] ${
              activeComponent === "current" ? "bg-white rounded-t-lg rounded-b-none" : ""
            }`}
            onClick={() => setActiveComponent("current")}
          >
            Create Assessment Questions
          </Button>
          <Button
            variant="ghost"
            className={`text-[#227C9D] ${
              activeComponent === "edit" ? "bg-white rounded-t-lg rounded-b-none" : ""
            }`}
            onClick={() => setActiveComponent("edit")}
          >
            Edit Assessments
          </Button>
          <Button
            variant="ghost"
            className={`text-[#227C9D] ${
              activeComponent === "list" ? "bg-white rounded-t-lg rounded-b-none" : ""
            }`}
            onClick={() => setActiveComponent("list")}
          >
            Assessment List
          </Button>
        </div>
        {renderComponent()}
      </div>
    </div>
  );
}
