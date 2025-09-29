import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface CustomCardProps {
  image: string;
  title: string;
  body: string;
  footer: string;
}

export function MoreOptionCard({ image, title, body, footer }: CustomCardProps) {
  return (
    <Card className="md:w-xs max-w-[400px] min-h-[28rem] overflow-hidden p-0 flex flex-col justify-between">
      {/* Image */}
      <div className="relative w-full h-32">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <CardHeader>
        <CardTitle className="text-lg text-[#171616] font-semibold">{title}</CardTitle>
      </CardHeader>

      {/* Body */}
      <CardContent className="flex-grow">
        <p className="text-base text-[#5E5B5B]">{body}</p>
      </CardContent>

      {/* Footer */}
  <CardFooter className="justify-end py-4">
        <span className="text-lg text-[#171616] font-semibold">{footer}</span>
      </CardFooter>
    </Card>
  );
}
