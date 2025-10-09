import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image, { StaticImageData } from 'next/image';
import ServiceCard from './ServiceCard';

interface ServiceDetailProps {
  service: {
    _id: string;
    name: string;
    service_type: string;
    image: string;
    images: string[];
    price: number;
    discounted_price: number;
    short_description: string;
    long_description: string;
    createdAt: string;
    updatedAt: string;
    formatted_price: string;
    formatted_discounted_price: string;
  };
  relatedServices: {
    _id: string;
    name: string;
    service_type: string;
    image: string;
    images: string[];
    price: number;
    discounted_price: number;
    short_description: string;
    long_description: string;
    createdAt: string;
    updatedAt: string;
    formatted_price: string;
    formatted_discounted_price: string;
    pricing_unit: string;
  }[];
  pricing_unit: string;
  onApply?: () => void;
  handleClick?: (service: {
    _id: string;
    name: string;
    service_type: string;
    image: string;
    images: string[];
    price: number;
    discounted_price: number;
    short_description: string;
    long_description: string;
    createdAt: string;
    updatedAt: string;
    formatted_price: string;
    formatted_discounted_price: string;
    pricing_unit: string;
  }) => void;
}

const ServiceDetail: FC<ServiceDetailProps> = ({ service, relatedServices, onApply, pricing_unit, handleClick }) => {
  const defaultFullDescription = `Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent! Vivamus adipiscing nisl ut dolor dignissim semper.
Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent! Vivamus adipiscing nisl ut dolor dignissim semper.
Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent! Vivamus adipiscing nisl ut dolor dignissim semper.
Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent! Vivamus adipiscing nisl ut dolor dignissim semper.`;

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12 p-3 sm:p-4 lg:p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6">
        <div className="w-full lg:w-auto flex justify-center lg:justify-start">
          <Image
            src={service.image}
            alt={service.name}
            width={400}
            height={400}
            className="rounded-lg w-full max-w-sm sm:max-w-md lg:max-w-lg object-cover"
          />
        </div>
        <div className="text-start space-y-3 sm:space-y-4 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">{service.name}</h1>

          <p className="text-[#706C6C] text-sm sm:text-base leading-relaxed">{service.short_description}</p>

          <div className="text-2xl sm:text-3xl lg:text-4xl flex items-center font-bold text-[#D63A3A] mb-4 sm:mb-6">
            NGN {service.price.toLocaleString()}
            <p className="text-[#706C6C] text-base "> {pricing_unit ? `/${pricing_unit}` : ''}</p>
          </div>

          <button
            onClick={onApply}
            className="bg-[#FF5C5C] cursor-pointer hover:bg-red-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium w-full sm:w-auto"
          >
            Apply now
          </button>

          {/* Description Section */}
          <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#171616]">Description</h2>
            <div className="text-[#706C6C] text-sm sm:text-base leading-relaxed space-y-1">
              <p>{service.long_description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* More like this Section */}
      <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold text-[#171616]">More like this</h2>
        {relatedServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {relatedServices.slice(0, 4).map((relatedService) => (
              <ServiceCard
                key={relatedService._id}
                {...relatedService}
                onClick={() => {
                  if (handleClick) handleClick(relatedService);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center items-center py-8">
              <div className="text-sm text-gray-500">No related services</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
