import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface TextQuestionProps {
  module: string;
  title: string;
  description?: string;
  instruction?: string;
  placeholder?: string;
  type: 'short_text' | 'long_text';
  maxLength?: number;
  minLength?: number;
  rows?: number;
  isRequired?: boolean;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: (value: string) => void;
  value: string;
  subText?: string;
}

export function TextQuestion({
  module,
  title,
  description,
  instruction,
  placeholder,
  type,
  maxLength,
  minLength,
  rows = 4,
  isRequired,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  value,
  subText,
}: TextQuestionProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRequired || (inputValue && inputValue.trim().length >= (minLength || 0))) {
      onNext(inputValue);
    }
  };

  const isValid = !isRequired || (inputValue && inputValue.trim().length >= (minLength || 0));

  return (
    <div className=" h-full max-h-fit w-full max-w-2xl mx-auto bg-white rounded-[16px]  flex items-start justify-center p-6">
      <Card className="w-full max-w-2xl shadow-none drop-shadow-none border-none">
        <CardHeader className="text-center space-y-4 pb-8">
          <p className="text-[#227C9D] text-sm font-medium">{module}</p>
          <h1 className="text-2xl font-bold text-[#227C9D]">{title}</h1>
          {description && <p className="text-[#5E5B5B] leading-relaxed">{description}</p>}
          {instruction && <p className="text-sm text-[#5E5B5B] italic">{instruction}</p>}
        </CardHeader>

        <CardContent className="space-y-6">
          {subText && <h2 className="text-sm text-[#8F8F8F] font-[600]">{subText}</h2>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text-input" className="text-sm text-[#706C6C]">
                {title}
              </Label>
              {type === 'short_text' ? (
                <Input
                  id="text-input"
                  type="text"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  maxLength={maxLength}
                  required={isRequired}
                />
              ) : (
                <Textarea
                  id="text-input"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  maxLength={maxLength}
                  rows={rows}
                  required={isRequired}
                />
              )}
              {maxLength && (
                <p className="text-xs text-[#8F8F8F]">
                  {inputValue.length} / {maxLength} characters
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 border-[#FF5C5C] bg-transparent"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                className="flex-1 bg-destructive hover:bg-destructive/90 text-primary"
              >
                Save and continue
              </Button>
            </div>
          </form>

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
