import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface MultipleChoiceOption {
  _id: string;
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
  value: string;
  onChange: (value: string) => void;
  index: number;
  isRequired?: boolean;
}

export function MultipleChoiceQuestion({
  module,
  title,
  description,
  instruction,
  options,
  value,
  onChange,
  index,
  isRequired,
}: MultipleChoiceQuestionProps) {
  return (
    <Card className="w-full shadow-none drop-shadow-none border-none bg-transparent p-0">
      <CardHeader className="text-left space-y-0 mb-0 p-0">
        <h2 className="text-sm font-medium  text-[#706C6C] ">
          {index + 1}. {title}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </h2>
        {description || instruction ? <p className="text-sm text-[#5E5B5B]">{description}</p> : null}
      </CardHeader>
      <CardContent className="p-0 -mt-2">
        <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
          {options.map((option) => (
            <div key={option._id} className="flex items-start space-x-3">
              <RadioGroupItem value={option._id} id={option._id} className="mt-1" />
              <Label htmlFor={option._id} className="text-[#3D3A3A] leading-relaxed cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
