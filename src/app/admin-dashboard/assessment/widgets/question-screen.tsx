"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAssessmentStore, Question, QuestionType } from "@/store/assessment";
import MultipleChoice from "./multiple-choice";
import ShortText from "./short-text";
import LongTextQuestion from "./long-text-question";
import DropDownQuestion from "./drop-down-question";
import CheckboxQuestion from "./checkbox-question";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Edit2, Trash2, Eye } from "lucide-react";

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

type ActiveQuestionType = QuestionType | null;

interface ActiveQuestion {
  id: string;
  type: QuestionType;
  isLocked: boolean;
}

export default function QuestionScreen() {
  const { questions, addQuestion, removeQuestion, clearQuestions, getNextQuestionNumber } = useAssessmentStore();
  
  const [activeQuestions, setActiveQuestions] = useState<ActiveQuestion[]>([
    { id: generateId(), type: "multiple_choice", isLocked: false }
  ]);
  const [showPreview, setShowPreview] = useState(false);

  const questionTypes: {
    label: string;
    value: QuestionType;
  }[] = [
    { label: "Multiple Choice", value: "multiple_choice" },
    { label: "Checkbox", value: "checkbox_question" },
    { label: "Short Text", value: "short_text" },
    { label: "Long Text", value: "long_text" },
    { label: "Dropdown", value: "dropdown_question" },
  ];

  const handleQuestionSave = (questionId: string, questionData: any) => {
    // Add unique ID and save to store
    const questionWithId: Question = {
      ...questionData,
      id: questionId,
    };
    
    addQuestion(questionWithId);
    
    // Lock the current question
    setActiveQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, isLocked: true } : q
      )
    );
  };

  const handleQuestionTypeChange = (questionId: string, newType: QuestionType) => {
    setActiveQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, type: newType } : q
      )
    );
  };

  const addNewQuestion = () => {
    const newQuestion: ActiveQuestion = {
      id: generateId(),
      type: "multiple_choice",
      isLocked: false
    };
    setActiveQuestions(prev => [...prev, newQuestion]);
  };

  const unlockQuestion = (questionId: string) => {
    // Remove from store and unlock for editing
    removeQuestion(questionId);
    setActiveQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, isLocked: false } : q
      )
    );
  };

  const removeActiveQuestion = (questionId: string) => {
    // Remove from both active questions and store
    removeQuestion(questionId);
    setActiveQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const renderQuestionComponent = (questionId: string, type: QuestionType, isLocked: boolean, questionNumber: number) => {
    const commonProps = {
      questionNo: questionNumber,
      onSave: (data: any) => handleQuestionSave(questionId, data)
    };

    if (isLocked) {
      const savedQuestion = questions.find(q => q.id === questionId);
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-gray-100/80 z-10 rounded-lg flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
              <Lock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Question Saved</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => unlockQuestion(questionId)}
                className="ml-2"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => removeActiveQuestion(questionId)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
          {renderQuestionByType(type, commonProps)}
        </div>
      );
    }

    return renderQuestionByType(type, commonProps);
  };

  const renderQuestionByType = (type: QuestionType, props: any) => {
    switch (type) {
      case "multiple_choice":
        return <MultipleChoice {...props} />;
      case "checkbox_question":
        return <CheckboxQuestion {...props} />;
      case "short_text":
        return <ShortText {...props} />;
      case "long_text":
        return <LongTextQuestion {...props} />;
      case "dropdown_question":
        return <DropDownQuestion {...props} />;
      default:
        return <MultipleChoice {...props} />;
    }
  };

  const getQuestionTypeLabel = (type: QuestionType): string => {
    return questionTypes.find(qt => qt.value === type)?.label || "Multiple Choice";
  };

  const PreviewModal = () => {
    if (!showPreview) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Assessment Preview</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowPreview(false)}
              >
                Close
              </Button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {questions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No questions saved yet.</p>
            ) : (
              questions.map((question, index) => (
                <Card key={question.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        Question {question.question_no}
                      </CardTitle>
                      <Badge variant="outline">
                        {getQuestionTypeLabel(question.type)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{question.question}</h3>
                    {question.descriptions && (
                      <p className="text-gray-600 mb-4">{question.descriptions}</p>
                    )}
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p><strong>Module:</strong> {question.module}</p>
                      <p><strong>Required Score:</strong> {question.required_score}</p>
                      <p><strong>Required:</strong> {question.required_option ? 'Yes' : 'No'}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assessment Builder</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview ({questions.length})
          </Button>
          {questions.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearQuestions}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Active Questions */}
      <div className="space-y-8">
        {activeQuestions.map((activeQuestion, index) => {
          const questionNumber = index + 1;
          
          return (
            <div key={activeQuestion.id} className="space-y-4">
              {/* Question Type Selector */}
              {!activeQuestion.isLocked && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2 py-2">
                    Question {questionNumber} Type:
                  </span>
                  {questionTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={activeQuestion.type === type.value ? "default" : "outline"}
                      size="sm"
                      className="text-xs rounded-2xl"
                      onClick={() => handleQuestionTypeChange(activeQuestion.id, type.value)}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Question Component */}
              <div className="border rounded-lg p-1 bg-gray-50">
                {renderQuestionComponent(
                  activeQuestion.id, 
                  activeQuestion.type, 
                  activeQuestion.isLocked,
                  questionNumber
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add More Question Button */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={addNewQuestion}
          size="lg"
          className="bg-[#227C9D] hover:bg-[#1a5f7a]"
        >
          Add Another Question
        </Button>
      </div>

      {/* Preview Modal */}
      <PreviewModal />
    </div>
  );
}
