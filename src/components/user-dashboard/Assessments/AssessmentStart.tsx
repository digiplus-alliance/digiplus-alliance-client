import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AssessmentStartProps {
  onStart: () => void;
}

export function AssessmentStart({ onStart }: AssessmentStartProps) {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardContent className="p-12 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-primary">
              Open Digital Maturity Assessment
            </h1>
            <h2 className="text-2xl text-primary font-medium">
              (SMEs & MSMEs)
            </h2>
          </div>
          
          <div className="space-y-6 text-muted-foreground max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed">
              The Digital Maturity Assessment (DMA) framework, derived from the 
              European Digital Innovation Hub (EDIH) ecosystem, serves as a tool 
              to evaluate an entity's digital maturity level and its progression over 
              time, such as assessing its condition before and after the DIH 
              intervention.
            </p>
            
            <p className="text-base leading-relaxed">
              This assessment highlights the impact of the DIH's initiatives and policy measures.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              variant="link" 
              className="text-primary hover:text-primary/80"
            >
              Read instructions
            </Button>
            
            <div>
              <Button 
                onClick={onStart}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8 py-3 text-lg"
              >
                Take Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}