import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
  value: string;
  onChange: (value: string) => void;
  subText?: string;
  index: number;
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
  value,
  onChange,
  subText,
  index,
}: TextQuestionProps) {
  return (
    <div className="w-full shadow-none drop-shadow-none border-none bg-transparent space-y-2">
      {/* <CardHeader className="text-left space-y-2 p-0 mb-4"> */}
      {/* <Label htmlFor="text-input" className="text-lg font-bold text-[#227C9D]">
          {title}
        </Label>
        {description && <p className="text-sm text-[#5E5B5B]">{description}</p>}
        {instruction && <p className="text-sm text-[#5E5B5B] italic">{instruction}</p>} */}
      {/* </CardHeader> */}
      <div className="p-0 space-y-2">
        <Label htmlFor="text-input" className="text-sm  text-[#706C6C]">
          {index + 1}. {title}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {type === 'short_text' ? (
          <Input
            id="text-input"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={maxLength}
            required={isRequired}
          />
        ) : (
          <Textarea
            id="text-input"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={maxLength}
            rows={rows}
            required={isRequired}
            className=" bg-transparent"
          />
        )}
        {maxLength && (
          <p className="text-xs text-[#8F8F8F] mt-2">
            {value.length} / {maxLength} characters
          </p>
        )}
      </div>
    </div>
  );
}
