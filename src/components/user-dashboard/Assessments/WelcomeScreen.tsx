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
    <div className="min-h-[50vh] sm:min-h-screen flex items-start justify-centerpx-0 sm:p-6 ">
      <Card className="w-full max-w-5xl px-0 bg-transparent shadow-none drop-shadow-none border-none">
        <CardContent className="p-6 px-0 sm:p-8 lg:p-12 text-center space-y-6 sm:space-y-8">
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
                className="bg-[#FF5C5C] hover:bg-destructive/90 text-black hover:text-white px-6 sm:px-8 py-3 sm:py-6 cursor-pointer text-base sm:text-lg w-min sm:w-auto"
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
