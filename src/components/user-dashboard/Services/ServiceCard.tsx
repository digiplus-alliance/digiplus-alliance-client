import React, { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import Image, { StaticImageData } from 'next/image';

interface ServiceCardProps {
  _id: string;
  service_type: string;
  image: string;
  images: string[];
  price: number;
  discounted_price: number;
  short_description: string;
  long_description: string;
  createdAt: string;
  updatedAt: string;
  onClick?: () => void;
  name: string;
}
const ServiceCard: FC<ServiceCardProps> = (props) => {
  const { _id: id, price, image, onClick, short_description, name } = props;
  const show = short_description?.length > 100 ? short_description?.slice(0, 100) + '...' : short_description;
  return (
    <Card
      key={id}
      onClick={onClick}
      className="overflow-hidden  cursor-pointer bg-transparent border-none shadow-none drop-shadow-none p-0"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105 rounded-t-[24px]"
          width={400}
          height={400}
        />
      </div>
      <CardContent className="p-4 pt-0 space-y-4">
        <h3 className="font-semibold text-lg text-[#5E5B5B] mb-2">{name}</h3>
        <p className="text-[#171616] text-sm mb-4">{show}</p>
        <div className="text-lg text-end font-bold text-foreground">NGN {price}</div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
