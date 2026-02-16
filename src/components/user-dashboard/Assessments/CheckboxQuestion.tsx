import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface CheckboxOption {
  id: string;
  _id: string;
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
  value: string[];
  onChange: (value: string[]) => void;
  index: number;
  isRequired?: boolean;
}

export function CheckboxQuestion({
  module,
  title,
  description,
  instruction,
  question,
  options,
  maxSelections,
  value,
  onChange,
  index,
  isRequired,
}: CheckboxQuestionProps) {
  const handleSelectionChange = (optionId: string, checked: boolean) => {
    const newSelections = checked ? [...value, optionId] : value.filter((id) => id !== optionId);
    onChange(newSelections);
  };

  return (
    <Card className="w-full shadow-none drop-shadow-none border-none bg-transparent p-0">
      <CardHeader className="text-left space-y-2 p-0 mb-4">
        <h2 className="text-sm font-medium  text-[#706C6C] ">
          {index + 1}. {question || title}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </h2>
        {description && <p className="text-sm text-[#5E5B5B]">{description}</p>}
        {instruction && <p className="text-sm text-[#5E5B5B]">{instruction}</p>}
      </CardHeader>
      <CardContent className="p-0 -mt-6">
        <div className="space-y-4">
          {options.map((option) => (
            <Label
              key={option._id}
              className="flex items-start space-x-3 text-[#3D3A3A] leading-relaxed cursor-pointer"
            >
              <Checkbox
                id={option._id}
                checked={value.includes(option._id)}
                onCheckedChange={(checked) => handleSelectionChange(option._id, checked as boolean)}
                disabled={!value.includes(option._id) && maxSelections ? value.length >= maxSelections : false}
              />
              <span className="flex-1">{option.text || option.label}</span>
            </Label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
