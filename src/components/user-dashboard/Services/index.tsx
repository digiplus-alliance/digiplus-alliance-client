'use client';
import service1 from './assets/service-1.jpg';
import service2 from './assets/service-2.jpg';
import service3 from './assets/service-3.jpg';
import service4 from './assets/service-4.jpg';
import { StaticImageData } from 'next/image';
import ServiceCard from './ServiceCard';
import ServiceDetail from './ServiceDetail';
import PageHeader from '@/components/PageHeader';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const services: {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string | StaticImageData;
}[] = [
  {
    id: 1,
    title: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service1,
  },
  {
    id: 2,
    title: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service2,
  },
  {
    id: 3,
    title: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service3,
  },
  {
    id: 4,
    title: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service4,
  },
  {
    id: 5,
    title: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service1,
  },
  {
    id: 6,
    title: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service2,
  },
  {
    id: 7,
    title: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service3,
  },
  {
    id: 8,
    title: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service4,
  },
];

export default function ServicesComponent() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

  const handleServiceClick = (service: (typeof services)[0]) => {
    setSelectedService(service);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
  };

  const handleApply = () => {
    // Handle apply logic here
    console.log('Apply for service:', selectedService?.title);
    router.push('/user-dashboard/applications/apply');
  };

  // Get related services (exclude the selected one)
  const getRelatedServices = (currentServiceId: number) => {
    return services.filter((service) => service.id !== currentServiceId);
  };

  if (selectedService) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={handleBackToServices}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Button>
        </div>

        <ServiceDetail
          service={selectedService}
          relatedServices={getRelatedServices(selectedService.id)}
          onApply={handleApply}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Services" />

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} onClick={() => handleServiceClick(service)} />
        ))}
      </div>
    </div>
  );
}
