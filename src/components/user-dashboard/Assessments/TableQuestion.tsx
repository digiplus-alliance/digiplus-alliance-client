import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TableRow {
  id: string;
  label: string;
}

interface TableColumn {
  id: string;
  label: string;
}

interface TableQuestionProps {
  module: string;
  title: string;
  description?: string;
  question: string;
  rows: TableRow[];
  columns: TableColumn[];
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: (responses: Record<string, string>) => void;
  responses: Record<string, string>;
  onResponseChange: (rowId: string, columnId: string) => void;
}

export function TableQuestion({
  module,
  title,
  description,
  question,
  rows,
  columns,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  responses,
  onResponseChange,
}: TableQuestionProps) {
  const handleSubmit = () => {
    onNext(responses);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-6xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <p className="text-primary font-medium text-lg">{module}</p>
          {description && (
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-sm">
              {description}
            </p>
          )}
          <h1 className="text-2xl font-bold text-destructive">{title}</h1>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-foreground">
              {question}
            </h2>
            
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
                  <div className="font-medium text-foreground"></div>
                  {columns.map((column) => (
                    <div key={column.id} className="font-medium text-foreground text-center">
                      {column.label}
                    </div>
                  ))}
                </div>
                
                {/* Table Rows */}
                <div className="space-y-2">
                  {rows.map((row) => (
                    <div key={row.id} className="grid grid-cols-4 gap-4 p-4 border border-border rounded-lg">
                      <div className="text-sm text-foreground flex items-center">
                        {row.label}
                      </div>
                      
                      <RadioGroup
                        value={responses[row.id] || ''}
                        onValueChange={(value) => onResponseChange(row.id, value)}
                        className="contents"
                      >
                        {columns.map((column) => (
                          <div key={column.id} className="flex justify-center">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={column.id}
                                id={`${row.id}-${column.id}`}
                              />
                              <Label htmlFor={`${row.id}-${column.id}`} className="sr-only">
                                {row.label} - {column.label}
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
          
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleSubmit}
              className="px-8 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
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
                  index + 1 === currentStep
                    ? 'bg-primary'
                    : index + 1 < currentStep
                    ? 'bg-primary/60'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}