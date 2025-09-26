import React, { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import Image, { StaticImageData } from 'next/image';

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string | StaticImageData;
  onClick?: () => void;
}
const ServiceCard: FC<ServiceCardProps> = (props) => {
  const { id, title, description, price, image, onClick } = props;
  return (
    <Card
      key={id}
      onClick={onClick}
      className="overflow-hidden  cursor-pointer bg-transparent border-none shadow-none drop-shadow-none p-0"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 rounded-t-[24px]"
        />
      </div>
      <CardContent className="p-4 pt-0 space-y-4">
        <h3 className="font-semibold text-lg text-[#5E5B5B] mb-2">{title}</h3>
        <p className="text-[#171616] text-sm mb-4">{description}</p>
        <div className="text-lg text-end font-bold text-foreground">{price}</div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
