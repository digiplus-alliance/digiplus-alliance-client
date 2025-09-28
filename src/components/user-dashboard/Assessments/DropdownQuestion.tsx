import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface DropdownOption {
  id: string;
  text: string;
  value?: number;
}

interface DropdownQuestionProps {
  module: string;
  title: string;
  description?: string;
  placeholder?: string;
  options: DropdownOption[];
  isRequired?: boolean;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: (selectedValue: string) => void;
  selectedValue: string;
  subText?: string;
}

export function DropdownQuestion({
  module,
  title,
  description,
  placeholder,
  options,
  isRequired,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  selectedValue,
  subText,
}: DropdownQuestionProps) {
  const [value, setValue] = useState(selectedValue);

  const handleSubmit = () => {
    if (!isRequired || value) {
      onNext(value);
    }
  };

  const isValid = !isRequired || !!value;

  return (
    <div className="h-full max-h-fit w-full max-w-2xl mx-auto bg-white flex items-start rounded-[16px] justify-center p-6">
      <Card className="w-full max-w-2xl shadow-none drop-shadow-none border-none">
        <CardHeader className="text-center space-y-4 pb-8">
          <p className="text-[#227C9D] text-sm font-medium">{module}</p>
          <h1 className="text-2xl font-bold text-[#227C9D]">{title}</h1>
          {description && <p className="text-[#5E5B5B] leading-relaxed">{description}</p>}
        </CardHeader>

        <CardContent className="space-y-6">
          {subText && <h2 className="text-sm text-[#8F8F8F] font-[600]">{subText}</h2>}
          <div className="space-y-4">
            <Label htmlFor="dropdown" className="text-sm text-[#706C6C]">
              {title}
            </Label>
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger className="w-full h-14 border-[#EBEBEB] rounded-lg py-5">
                <SelectValue placeholder={placeholder || 'Select an option'} className="text-[#5E5B5B] " />
              </SelectTrigger>
              <SelectContent className="text-[#5E5B5B]">
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 border-[#FF5C5C] bg-transparent">
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
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
