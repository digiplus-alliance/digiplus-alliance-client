import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'email' | 'tel' | 'number';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  value?: string;
  gridColumn?: 'full' | 'half';
}

interface FormQuestionProps {
  module: string;
  title: string;
  subtitle?: string;
  description?: string;
  fields: FormField[];
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: (data: Record<string, string>) => void;
  values: Record<string, string>;
  onValueChange: (fieldId: string, value: string) => void;
}

export function FormQuestion({
  module,
  title,
  subtitle,
  description,
  fields,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  values,
  onValueChange,
}: FormQuestionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(values);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <p className="text-primary font-medium text-lg">{module}</p>
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          {subtitle && (
            <h2 className="text-xl text-muted-foreground">{subtitle}</h2>
          )}
          {description && (
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={field.gridColumn === 'half' ? 'md:col-span-1' : 'col-span-full'}
                >
                  <Label htmlFor={field.id} className="text-sm font-medium text-foreground">
                    {field.label}
                  </Label>
                  {field.type === 'select' ? (
                    <Select
                      value={values[field.id] || ''}
                      onValueChange={(value) => onValueChange(field.id, value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder={field.placeholder || 'Select'} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={values[field.id] || ''}
                      onChange={(e) => onValueChange(field.id, e.target.value)}
                      className="mt-2"
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
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