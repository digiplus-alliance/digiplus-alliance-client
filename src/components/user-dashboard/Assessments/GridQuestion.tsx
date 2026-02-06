import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface GridColumn {
  id: string;
  text: string;
  value?: number;
  points?: number;
  points_description?: string;
}

interface GridRow {
  id: string;
  text: string;
  weight?: number;
}

interface GridQuestionProps {
  module: string;
  title: string;
  description?: string;
  instruction?: string;
  columns: GridColumn[];
  rows: GridRow[];
  isRequired?: boolean;
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  index: number;
}

export function GridQuestion({
  module,
  title,
  description,
  instruction,
  columns,
  rows,
  value,
  onChange,
  index,
  isRequired,
}: GridQuestionProps) {
  const handleResponseChange = (rowId: string, columnId: string) => {
    onChange({ ...value, [rowId]: columnId });
  };

  return (
    <Card className="w-full max-w-6xl shadow-none drop-shadow-none border-none bg-transparent p-0">
      <CardHeader className="text-left space-y-2 p-0 mb-4">
        <h2 className="text-sm font-medium  text-[#706C6C] ">
          {index + 1}. {title}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </h2>
        {description && <p className="text-sm text-[#5E5B5B] leading-relaxed">{description}</p>}
        {instruction && <p className="text-sm text-[#5E5B5B]">{instruction}</p>}
      </CardHeader>

      <CardContent className="p-0 -mt-6">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div
              className={`grid gap-4 mb-4 p-4 bg-muted/50 rounded-lg`}
              style={{ gridTemplateColumns: `2fr ${columns.map(() => '1fr').join(' ')}` }}
            >
              <div className="font-medium text-foreground"></div>
              {columns.map((column) => (
                <div key={column.id} className="font-medium text-foreground text-center text-sm">
                  {column.text}
                </div>
              ))}
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              {rows.map((row) => (
                <RadioGroup
                  key={row.id}
                  value={value[row.id] || ''}
                  onValueChange={(columnId) => handleResponseChange(row.id, columnId)}
                  className={`grid gap-4 p-4 border border-border rounded-lg`}
                  style={{ gridTemplateColumns: `2fr ${columns.map(() => '1fr').join(' ')}` }}
                >
                  <div className="text-sm text-foreground flex items-center">{row.text}</div>
                  {columns.map((column) => (
                    <div key={column.id} className="flex justify-center">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={column.id} id={`${row.id}-${column.id}`} />
                        <Label htmlFor={`${row.id}-${column.id}`} className="sr-only">
                          {row.text} - {column.text}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
