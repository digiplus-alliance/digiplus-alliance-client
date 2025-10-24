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
  footer: string | number;
}

export default function ServiceCard({
  image,
  title,
  body,
  footer,
}: CustomCardProps) {
  return (
    <Card className="md:w-[13rem] max-w-[400px] min-h-[10rem] overflow-hidden p-0 flex flex-col justify-between bg-transparent border-none shadow-none drop-shadow-none hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative w-full h-32">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Title */}
      <CardHeader>
        <CardTitle className="text-lg text-[#5E5B5B] font-medium">
          {title}
        </CardTitle>
      </CardHeader>

      {/* Body */}
      <CardContent className="flex-grow">
        <p className="text-base text-[#171616] font-normal">{body}</p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="justify-end py-4">
        <span className="text-lg text-[#171616] font-semibold">NGN {footer}</span>
      </CardFooter>
    </Card>
  );
}
