import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface MultipleChoiceOption {
  id: string;
  text: string;
  value?: number;
  points?: number;
  points_description?: string;
}

interface MultipleChoiceQuestionProps {
  module: string;
  title: string;
  description?: string;
  instruction?: string;
  options: MultipleChoiceOption[];
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: (selectedOption: string) => void;
  selectedOption: string;
}

export function MultipleChoiceQuestion({
  module,
  title,
  description,
  instruction,
  options,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  selectedOption,
}: MultipleChoiceQuestionProps) {
  const handleSubmit = () => {
    if (selectedOption) {
      onNext(optionSelected);
    }
  };

  const [optionSelected, setOptionSelected] = useState('');

  const isValid = !!selectedOption;

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <Card className="w-full max-w-3xl shadow-none drop-shadow-none border-none bg-transparent">
        <CardHeader className="text-center space-y-4 pb-8 ">
          <p className="text-[#227C9D]">{module}</p>
          <h1 className="text-2xl font-bold text-[#D63A3A]">{title}</h1>
          {description && <p className="text-[#5E5B5B] leading-relaxed max-w-2xl mx-auto">{description}</p>}
          {instruction && <p className="text-sm text-[#5E5B5B] italic">{instruction}</p>}
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-6">
            <RadioGroup
              value={selectedOption}
              onValueChange={(value: any) => setOptionSelected(value)}
              className="space-y-4"
            >
              {options.map((option) => (
                <div key={option.id} className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="mt-1"
                    onClick={() => setOptionSelected(option.id)}
                  />
                  <Label htmlFor={option.id} className=" text-[#3D3A3A] leading-relaxed cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-4 pt-6">
            <Button variant="outline" onClick={onBack} className="flex-1 border-[#FF5C5C]">
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              // disabled={!selectedOption}
              className="flex-1 bg-destructive hover:bg-destructive/90 text-primary"
            >
              Save and continue
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
