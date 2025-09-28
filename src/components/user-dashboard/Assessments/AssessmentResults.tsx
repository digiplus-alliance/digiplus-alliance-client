import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface AssessmentResultsProps {
  score: number;
  maxScore: number;
  level: string;
  onSuggestions: () => void;
  onRestart?: () => void;
}

export function AssessmentResults({ score, maxScore, level, onSuggestions, onRestart }: AssessmentResultsProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const percentage = Math.round((score / maxScore) * 100);

  // Calculate stroke-dasharray for the circular progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center space-y-6 pb-8">
          <h1 className="text-4xl font-bold text-primary">Open Digital Maturity Assessment</h1>
          <h2 className="text-2xl text-primary font-medium">(SMEs & MSMEs)</h2>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Circular Progress Chart */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <svg width="280" height="280" viewBox="0 0 280 280" className="transform -rotate-90">
                {/* Background circle */}
                <circle cx="140" cy="140" r={radius} stroke="hsl(var(--muted))" strokeWidth="20" fill="none" />
                {/* Progress circle */}
                <circle
                  cx="140"
                  cy="140"
                  r={radius}
                  stroke="hsl(var(--primary))"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Score display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-sm text-muted-foreground">Your Score</p>
                <p className="text-4xl font-bold text-foreground">
                  {score}-{maxScore}
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-destructive">{level}</h3>
          </div>

          {/* Congratulations Card */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-destructive" />
                </div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    Congratulations on completing the assessment
                  </h4>
                  <p className="text-muted-foreground">
                    Based on your score, we would suggest you take the following services so that you can get better at
                    doing business.
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dont-show"
                        checked={dontShowAgain}
                        onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
                      />
                      <label htmlFor="dont-show" className="text-sm text-muted-foreground cursor-pointer">
                        Don&apos;t show again
                      </label>
                    </div>

                    <Button
                      onClick={onSuggestions}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                      See suggestions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {onRestart && (
            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={onRestart}>
                Take Assessment Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
