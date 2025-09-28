import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WelcomeScreenProps {
  title: string;
  message: string;
  buttonText: string;
  onStart: () => void;
}

export function WelcomeScreen({ title, message, buttonText, onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-[50vh] sm:min-h-screen flex items-start justify-center p-3 sm:p-6">
      <Card className="w-full max-w-4xl bg-transparent shadow-none drop-shadow-none border-none">
        <CardContent className="p-6 sm:p-8 lg:p-12 text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#227C9D]">{title}</h1>
          </div>

          <div className="space-y-4 sm:space-y-6 text-[#8F8F8F] max-w-3xl mx-auto">
            <p className="text-base sm:text-lg leading-relaxed">{message}</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Button variant="link" className="text-[#227C9D] hover:text-primary/80 text-sm sm:text-base">
              Read instructions
            </Button>

            <div>
              <Button
                onClick={onStart}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg w-full sm:w-auto"
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
