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
  const { _id: id, price, image, onClick, short_description, name, discounted_price } = props;
  const show = short_description?.length > 80 ? short_description?.slice(0, 80) + '...' : short_description;
  return (
    <Card
      key={id}
      onClick={onClick}
      className="overflow-hidden cursor-pointer bg-transparent border-none shadow-none drop-shadow-none p-0 hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105 rounded-t-[16px] sm:rounded-t-[20px] lg:rounded-t-[24px]"
          width={400}
          height={400}
        />
      </div>
      <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
        <div className="space-y-3 sm:space-y-4 min-h-[130px] max-h-[130px] max-sm:max-h-[100px] max-sm:min-h-[70px]">
          <h3 className="font-semibold text-base sm:text-lg text-[#5E5B5B] mb-1 sm:mb-2 line-clamp-2">{name}</h3>
          <p className="text-[#171616] text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{show}</p>
        </div>
        <div className="text-end">
          <div className="text-base sm:text-lg font-bold text-foreground">
            NGN {(discounted_price || price)?.toLocaleString()}
          </div>
          {discounted_price && (
            <div className="text-sm text-red-600 line-through">
              NGN {price?.toLocaleString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
