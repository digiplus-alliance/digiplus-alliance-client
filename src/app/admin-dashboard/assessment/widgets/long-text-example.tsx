"use client";

import { useState } from "react";
import LongTextQuestion from "./long-text-question";

type LongTextData = {
  question_no: number;
  question: string;
  descriptions: string;
  answer_placeholder: string;
  min_characters?: number;
  max_characters?: number;
  rows?: number;
  required_score: number;
  module: string;
  required_option: boolean;
  type: "long_text";
};

export default function LongTextExample() {
  const [savedData, setSavedData] = useState<LongTextData | null>(null);

  const handleLongTextSave = (data: LongTextData) => {
    setSavedData(data);
    console.log("Received data from LongTextQuestion component:", data);
    
    // Here you would typically send the data to your API
    // Example: await saveAssessmentQuestion(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Long Text Question Builder</h1>
      
      <LongTextQuestion 
        questionNo={5} // Custom question number
        onSave={handleLongTextSave}
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
