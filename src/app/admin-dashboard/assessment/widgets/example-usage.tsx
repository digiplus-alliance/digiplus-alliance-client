"use client";

import { useState } from "react";
import MultipleChoice from "./multiple-choice";

type MultipleChoiceData = {
  question_no: number;
  question: string;
  descriptions: string;
  options: Array<{
    option: string;
    optiondesc: string;
    point_value: number;
  }>;
  max_selections: number;
  required_score: number;
  module: string;
  required_option: boolean;
  type: "multiple_choice";
};

export default function ExampleUsage() {
  const [savedData, setSavedData] = useState<MultipleChoiceData | null>(null);

  const handleMultipleChoiceSave = (data: MultipleChoiceData) => {
    setSavedData(data);
    console.log("Received data from MultipleChoice component:", data);
    
    // Here you would typically send the data to your API
    // Example: await saveAssessmentQuestion(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assessment Question Builder</h1>
      
      <MultipleChoice 
        questionNo={3} // Custom question number
        onSave={handleMultipleChoiceSave}
      />

      {/* Display saved data for demonstration */}
      {savedData && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Saved Data:</h3>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(savedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
