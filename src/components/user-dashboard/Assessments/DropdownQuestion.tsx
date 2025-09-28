import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
  subText?: string;
  value: string;
  onChange: (value: string) => void;
  index: number;
}

export function DropdownQuestion({
  module,
  title,
  description,
  placeholder,
  options,
  isRequired,
  value,
  onChange,
  subText,
  index,
}: DropdownQuestionProps) {
  return (
    <Card className="w-full shadow-none drop-shadow-none border-none bg-transparent">
      {/* <CardHeader className="text-left space-y-2 p-0 mb-4">
        <Label htmlFor="dropdown" className="text-lg font-bold text-[#227C9D]">
          {title}
        </Label>
        {description && <p className="text-sm text-[#5E5B5B] leading-relaxed">{description}</p>}
        {subText && <h2 className="text-sm text-[#8F8F8F] font-[600]">{subText}</h2>}
      </CardHeader> */}
      <CardContent className="p-0">
        <Label htmlFor="dropdown" className="text-sm  text-[#706C6C] font-medium">
          {index + 1}. {title}
        </Label>
        <Select value={value} onValueChange={onChange} required={isRequired}>
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
      </CardContent>
    </Card>
  );
}
