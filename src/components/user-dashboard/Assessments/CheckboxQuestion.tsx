import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface CheckboxOption {
  id: string;
  text?: string;
  label?: string;
  points?: number;
  points_description?: string;
}

interface CheckboxQuestionProps {
  module: string;
  title: string;
  description?: string;
  instruction?: string;
  question?: string;
  options: CheckboxOption[];
  minSelections?: number;
  maxSelections?: number;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: (selectedOptions: string[]) => void;
  selectedOptions: string[];
  onSelectionChange?: (optionId: string, checked: boolean) => void;
  submitLabel?: string;
}

export function CheckboxQuestion({
  module,
  title,
  description,
  instruction,
  question,
  options,
  minSelections,
  maxSelections,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  selectedOptions,
  onSelectionChange,
  submitLabel = 'Save and continue',
}: CheckboxQuestionProps) {
  const [localSelections, setLocalSelections] = useState<string[]>(selectedOptions);

  const handleSelectionChange = (optionId: string, checked: boolean) => {
    const newSelections = checked ? [...localSelections, optionId] : localSelections.filter((id) => id !== optionId);

    setLocalSelections(newSelections);
    if (onSelectionChange) {
      onSelectionChange(optionId, checked);
    }
  };

  const handleSubmit = () => {
    onNext(localSelections);
  };

  return (
    <div className="min-h-screen  flex items-start justify-center p-6">
      <Card className="w-full max-w-3xl shadow-none drop-shadow-none border-none bg-transparent">
        <CardHeader className="text-center space-y-4 pb-8">
          <p className="text-[#227C9D]">{module}</p>
          <h1 className="text-2xl font-bold text-[#D63A3A]">{title}</h1>
          {description && <p className="text-[#5E5B5B] leading-relaxed max-w-2xl mx-auto">{description}</p>}
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-6">
            {question && <h2 className="text-lg font-medium text-[#D63A3A]">{question}</h2>}
            {instruction && <p className="text-sm text-[#5E5B5B]">{instruction}</p>}

            <div className="space-y-4">
              {options.map((option) => (
                <div key={option.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={localSelections.includes(option.id)}
                    onCheckedChange={(checked) => handleSelectionChange(option.id, checked as boolean)}
                  />
                  <Label htmlFor={option.id} className=" text-[#3D3A3A] leading-relaxed cursor-pointer">
                    {option.text || option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button variant="outline" onClick={onBack} className="flex-1 border-[#FF5C5C] bg-transparent">
              Back
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-destructive hover:bg-destructive/90 text-primary">
              {submitLabel}
            </Button>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center items-center gap-2 pt-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index + 1 === currentStep ? 'bg-[#0E5F7D]' : index + 1 < currentStep ? 'bg-[#D6D4D4]' : 'bg-[#D6D4D4]'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-[#706C6C]">
            Step {currentStep} of {totalSteps}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
