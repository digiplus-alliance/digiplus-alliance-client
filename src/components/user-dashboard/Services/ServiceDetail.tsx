import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image, { StaticImageData } from 'next/image';
import ServiceCard from './ServiceCard';

interface ServiceDetailProps {
  service: {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string | StaticImageData;
    fullDescription?: string;
  };
  relatedServices: {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string | StaticImageData;
  }[];
  onApply?: () => void;
}

const ServiceDetail: FC<ServiceDetailProps> = ({ service, relatedServices, onApply }) => {
  const defaultFullDescription = `Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent! Vivamus adipiscing nisl ut dolor dignissim semper.
Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent! Vivamus adipiscing nisl ut dolor dignissim semper.
Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent! Vivamus adipiscing nisl ut dolor dignissim semper.
Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent! Vivamus adipiscing nisl ut dolor dignissim semper.`;

  return (
    <div className=" space-y-12 p-6">
      {/* Header Section */}
      <div className=" flex flex-col lg:flex-row items-center gap-6">
        <Image src={service.image} alt={service.title} width={400} height={400} className="rounded-lg " />
        <div className="text-start space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{service.title}</h1>

          <p className="text-[#706C6C]  leading-relaxed">
            Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti
            sociosqu ad litora torquent! Vivamus adipiscing nisl ut dolor dignissim semper.
          </p>

          <div className="text-4xl font-bold text-[#D63A3A] mb-6">{service.price.replace('NGN', '').trim()} NGN</div>

          <button
            onClick={onApply}
            className="bg-[#FF5C5C] cursor-pointer hover:bg-red-600 text-white px-10 py-4 rounded-lg text-lg font-medium max-sm:w-full"
          >
            Apply now
          </button>

          {/* Description Section */}
          <div className="space-y-4 mt-4">
            <h2 className="text-2xl font-semibold text-[#171616]">Description</h2>
            <div className="text-[#706C6C] leading-relaxed space-y-1">
              <p>{service.fullDescription || defaultFullDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* More like this Section */}
      <div className="space-y-6 mt-10">
        <h2 className="text-4xl text-center font-semibold text-[#171616]">More like this</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedServices.slice(0, 4).map((relatedService) => (
            <ServiceCard key={relatedService.id} {...relatedService} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
