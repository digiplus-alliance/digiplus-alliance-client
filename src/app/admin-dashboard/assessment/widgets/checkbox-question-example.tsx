"use client";

import { useState } from "react";
import CheckboxQuestion from "./checkbox-question";

type CheckboxQuestionData = {
  question_no: number;
  question: string;
  descriptions: string;
  options: Array<{
    option: string;
    optiondesc: string;
    point_value: number;
  }>;
  required_score: number;
  module: string;
  required_option: boolean;
  type: "checkbox_question";
};

export default function CheckboxQuestionExample() {
  const [savedData, setSavedData] = useState<CheckboxQuestionData | null>(null);

  const handleCheckboxQuestionSave = (data: CheckboxQuestionData) => {
    setSavedData(data);
    console.log("Received data from CheckboxQuestion component:", data);
    
    // Here you would typically send the data to your API
    // Example: await saveAssessmentQuestion(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Checkbox Question Builder</h1>
      
      <CheckboxQuestion 
        questionNo={2} // Custom question number
        onSave={handleCheckboxQuestionSave}
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
