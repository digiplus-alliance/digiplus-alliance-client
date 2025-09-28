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
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: (responses: Record<string, string>) => void;
  responses: Record<string, string>;
}

export function GridQuestion({
  module,
  title,
  description,
  instruction,
  columns,
  rows,
  isRequired,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  responses,
}: GridQuestionProps) {
  const handleResponseChange = (rowId: string, columnId: string) => {
    const newResponses = { ...responses, [rowId]: columnId };
    // Auto-advance when all required fields are filled
    if (isRequired && Object.keys(newResponses).length === rows.length) {
      onNext(newResponses);
    }
  };

  const handleSubmit = () => {
    onNext(responses);
  };

  const isValid = !isRequired || Object.keys(responses).length === rows.length;

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <Card className="w-full max-w-6xl shadow-none drop-shadow-none border-none bg-transparent">
        <CardHeader className="text-center space-y-4 pb-8">
          <p className="text-[#227C9D] text-sm">{module}</p>
          {description && <p className="text-[#5E5B5B] leading-relaxed max-w-4xl mx-auto text-sm">{description}</p>}
          <h1 className="text-2xl font-bold text-[#D63A3A]">{title}</h1>
          {instruction && <p className="text-sm text-[#5E5B5B]">{instruction}</p>}
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-6">
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
                    <div
                      key={row.id}
                      className={`grid gap-4 p-4 border border-border rounded-lg`}
                      style={{ gridTemplateColumns: `2fr ${columns.map(() => '1fr').join(' ')}` }}
                    >
                      <div className="text-sm text-foreground flex items-center">{row.text}</div>

                      <RadioGroup
                        value={responses[row.id] || ''}
                        onValueChange={(value) => handleResponseChange(row.id, value)}
                        className="contents"
                      >
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button variant="outline" onClick={onBack} className="flex-1">
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
