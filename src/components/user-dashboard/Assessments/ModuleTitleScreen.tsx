import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ModuleTitleScreenProps {
  module: string;
  title: string;
  description: string;
  onBack?: () => void;
  onContinue: () => void;
  showBackButton?: boolean;
}

export function ModuleTitleScreen({
  module,
  title,
  description,
  onBack,
  onContinue,
  showBackButton = true,
}: ModuleTitleScreenProps) {
  return (
    <div className="min-h-screen  flex items-start justify-center p-6">
      <Card className="w-full max-w-4xl shadow-none drop-shadow-none border-none bg-transparent">
        <CardHeader className="text-center space-y-6 pb-8">
          <p className="text-primary font-medium text-lg">{module}</p>
          <h1 className="text-4xl font-bold text-primary">{title}</h1>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-6 text-muted-foreground">
            <p className="text-base leading-relaxed">{description}</p>
          </div>

          <div className="flex gap-4 pt-6">
            {showBackButton && onBack && (
              <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
                Back
              </Button>
            )}
            <Button
              onClick={onContinue}
              className={`${
                showBackButton ? 'flex-1' : 'mx-auto px-8'
              } bg-destructive hover:bg-destructive/90 text-destructive-foreground`}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
