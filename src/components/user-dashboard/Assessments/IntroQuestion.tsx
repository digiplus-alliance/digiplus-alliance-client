import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IntroQuestionProps {
  module: string;
  title: string;
  description: string;
  bulletPoints: string[];
  onBack?: () => void;
  onContinue: () => void;
  showBackButton?: boolean;
}

export function IntroQuestion({
  module,
  title,
  description,
  bulletPoints,
  onBack,
  onContinue,
  showBackButton = true,
}: IntroQuestionProps) {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center space-y-6 pb-8">
          <p className="text-primary font-medium text-lg">{module}</p>
          <h1 className="text-4xl font-bold text-primary">{title}</h1>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="space-y-6 text-muted-foreground">
            <p className="text-base leading-relaxed">
              {description}
            </p>
            
            <ul className="space-y-3">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-primary font-bold text-lg">•</span>
                  <span className="text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-4 pt-6">
            {showBackButton && onBack && (
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button 
              onClick={onContinue}
              className={`${showBackButton ? 'flex-1' : 'mx-auto px-8'} bg-destructive hover:bg-destructive/90 text-destructive-foreground`}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}