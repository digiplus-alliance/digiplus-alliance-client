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
    <div className="min-h-screen flex items-start justify-center p-6">
      <Card className="w-full max-w-4xl bg-transparent shadow-none drop-shadow-none">
        <CardContent className="p-12 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-[#227C9D]">{title}</h1>
          </div>

          <div className="space-y-6 text-[#8F8F8F] max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed ">{message}</p>
          </div>

          <div className="space-y-4">
            <Button variant="link" className="text-[#227C9D] hover:text-primary/80">
              Read instructions
            </Button>

            <div>
              <Button
                onClick={onStart}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8 py-3 text-lg"
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
