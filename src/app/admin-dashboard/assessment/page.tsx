"use client";

import { useState, useEffect } from "react";
import CurrentAssessment from "./current-assessment/main";
import EditAssessment from "./edit-assessment/main";
import ListAssessment from "./list-assessment/main";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Searchbar from "@/components/Searchbar";
import { useGetAllSubmittedAssessments } from "@/app/api/admin/assessment/get-submitted-assessments";
import { exportAsCSV } from "@/lib/exportAsCSV";
import { toast } from "sonner";

export default function AssessmentPage() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const [activeComponent, setActiveComponent] = useState<
    "current" | "edit" | "list"
  >("current");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch } = useGetAllSubmittedAssessments({
    page: 1,
    limit: 1000,
    searchQuery: searchQuery.trim() || undefined,
  });

  useEffect(() => {
    if (viewParam === "list") {
      setActiveComponent("list");
    }
  }, [viewParam]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleExportCSV = () => {
    // console.log("Export data:", data);
    // console.log("Submissions:", data?.submissions);
    
    if (!data?.submissions || data.submissions.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Flatten the data to include all fields including answers
    const flattenedData = data.submissions.map((submission) => {
      // Create base data
      const baseData: Record<string, string> = {
        submission_id: submission.submission_id,
        assessment_title: submission.assessment.title || "N/A",
        assessment_description: submission.assessment.description || "N/A",
        total_possible_points: String(
          submission.assessment.total_possible_points
        ),
        is_published: String(submission.assessment.is_published),
        user_first_name: submission.user?.first_name || "N/A",
        user_last_name: submission.user?.last_name || "N/A",
        user_email: submission.user?.email || "N/A",
        user_business_name: submission.user?.business_name || "N/A",
        user_score: String(submission.scores.user_score),
        max_possible_score: String(submission.scores.max_possible_score),
        percentage_score: String(submission.scores.percentage_score),
        completed_at: submission.completed_at,
        completed_date: submission.completed_date,
        completed_time: submission.completed_time,
        answers: JSON.stringify(submission.answers), // Full answers array as JSON
      };

      // Add each answer as a separate column
      if (submission.answers && submission.answers.length > 0) {
        submission.answers.forEach((answer) => {
          const key = answer.question_text.replace(/[^a-zA-Z0-9]/g, "_");
          const answerValue =
            answer.answer === null
              ? "Not answered"
              : typeof answer.answer === "object"
              ? JSON.stringify(answer.answer)
              : String(answer.answer);
          baseData[key] = answerValue;
        });
      }

      return baseData;
    });

    // Collect all unique keys from all submissions (to handle varying answers)
    const allKeys = new Set<string>();
    flattenedData.forEach((data) => {
      Object.keys(data).forEach((key) => allKeys.add(key));
    });

    // Define columns for CSV export
    const columns = Array.from(allKeys).map((key) => ({
      key: key as keyof (typeof flattenedData)[0],
      header: key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));

    const filename = `submitted_assessments_${
      new Date().toISOString().split("T")[0]
    }`;

    exportAsCSV(flattenedData, filename, columns);
    toast.success("Assessment submissions exported successfully!");
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "current":
        return <CurrentAssessment />;
      case "edit":
        return <EditAssessment toggleComponent={setActiveComponent} />;
      case "list":
        return <ListAssessment searchQuery={searchQuery} />;
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
            {activeComponent === "list" && (
              <>
                <div className="hidden md:flex md:items-center md:gap-4">
                  <Searchbar
                    placeholder="Search by user name/email"
                    onSearch={handleSearchChange}
                    value={searchQuery}
                  />
                  <Button 
                    onClick={handleExportCSV}
                    disabled={isLoading || !data?.submissions || data.submissions.length === 0}
                  >
                    Download as CSV
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4 my-4">
          <Button
            variant="ghost"
            className={`text-[#227C9D] ${
              activeComponent === "current"
                ? "bg-white rounded-t-lg rounded-b-none"
                : ""
            }`}
            onClick={() => setActiveComponent("current")}
          >
            Create Assessment Questions
          </Button>
          <Button
            variant="ghost"
            className={`text-[#227C9D] ${
              activeComponent === "edit"
                ? "bg-white rounded-t-lg rounded-b-none"
                : ""
            }`}
            onClick={() => setActiveComponent("edit")}
          >
            Edit Assessments
          </Button>
          <Button
            variant="ghost"
            className={`text-[#227C9D] ${
              activeComponent === "list"
                ? "bg-white rounded-t-lg rounded-b-none"
                : ""
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
