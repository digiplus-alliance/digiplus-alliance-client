"use client";

import { Button } from "@/components/ui/button";

interface EditAssessmentFormProps {
  assessmentId: string;
  onBack: () => void;
}

export default function EditAssessmentForm({
  assessmentId,
  onBack,
}: EditAssessmentFormProps) {
  return (
    <div className="bg-white rounded-tl-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">Edit Assessment</h2>
          <p className="text-sm text-gray-600 mt-1">
            Assessment ID: <span className="font-mono">{assessmentId}</span>
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to List
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500 mb-4">
          Edit functionality will be implemented here
        </p>
        <p className="text-sm text-gray-400">
          This component will contain the assessment editing form
        </p>
      </div>
    </div>
  );
}