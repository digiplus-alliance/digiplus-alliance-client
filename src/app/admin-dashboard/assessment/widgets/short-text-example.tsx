"use client";

import { useState } from "react";
import ShortText from "./short-text";

type ShortTextData = {
  question_no: number;
  question: string;
  descriptions: string;
  answer_placeholder: string;
  max_characters?: number;
  required_score: number;
  module: string;
  required_option: boolean;
  type: "short_text";
};

export default function ShortTextExample() {
  const [savedData, setSavedData] = useState<ShortTextData | null>(null);

  const handleShortTextSave = (data: ShortTextData) => {
    setSavedData(data);
    console.log("Received data from ShortText component:", data);
    
    // Here you would typically send the data to your API
    // Example: await saveAssessmentQuestion(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Short Text Question Builder</h1>
      
      <ShortText 
        questionNo={4} // Custom question number
        onSave={handleShortTextSave}
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
