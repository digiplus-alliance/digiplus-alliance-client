import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type FilterButtonProps = {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function FilterButton({
  options,
  placeholder = "Filter",
  onChange,
  className,
}: FilterButtonProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={`w-[150px] bg-white ${className || ""}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
