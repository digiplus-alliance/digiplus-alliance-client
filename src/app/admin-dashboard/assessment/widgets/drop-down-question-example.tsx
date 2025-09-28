"use client";

import { useState } from "react";
import DropDownQuestion from "./drop-down-question";

type DropDownQuestionData = {
  question_no: number;
  question: string;
  descriptions: string;
  options: Array<{
    option: string;
    optiondesc: string;
    point_value: number;
  }>;
  dropdown_placeholder: string;
  required_score: number;
  module: string;
  required_option: boolean;
  type: "dropdown_question";
};

export default function DropDownQuestionExample() {
  const [savedData, setSavedData] = useState<DropDownQuestionData | null>(null);

  const handleDropDownQuestionSave = (data: DropDownQuestionData) => {
    setSavedData(data);
    console.log("Received data from DropDownQuestion component:", data);
    
    // Here you would typically send the data to your API
    // Example: await saveAssessmentQuestion(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dropdown Question Builder</h1>
      
      <DropDownQuestion 
        questionNo={6} // Custom question number
        onSave={handleDropDownQuestionSave}
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
