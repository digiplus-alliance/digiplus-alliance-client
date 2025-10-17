"use client";

import { useState } from "react";
import AssessmentTable from "../widgets/assessment-table";
import EditAssessmentForm from "../widgets/edit-assessment-form";

interface EditAssessmentProps {
  toggleComponent: (component: "current" | "edit" | "list") => void;
}

export default function EditAssessment({
  toggleComponent,
}: EditAssessmentProps) {
  const [view, setView] = useState<"table" | "edit">("table");
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>("");

  const handleEdit = (id: string) => {
    setSelectedAssessmentId(id);
    setView("edit");
  };

  const handleBackToTable = () => {
    setView("table");
    setSelectedAssessmentId("");
  };

  return (
    <div>
      {view === "table" ? (
        <AssessmentTable onEdit={handleEdit} />
      ) : (
        <EditAssessmentForm
          assessmentId={selectedAssessmentId}
          onBack={handleBackToTable}
        />
      )}
    </div>
  );
}
