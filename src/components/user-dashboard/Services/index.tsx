'use client';
import service1 from './assets/service-1.jpg';
import service2 from './assets/service-2.jpg';
import service3 from './assets/service-3.jpg';
import service4 from './assets/service-4.jpg';
import { StaticImageData } from 'next/image';
import ServiceCard from './ServiceCard';
import ServiceDetail from './ServiceDetail';
import PageHeader from '@/components/PageHeader';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGetServices } from '@/app/api/services/useGetServices';

const services: {
  id: number;
  subTitle: string;
  description: string;
  price: string;
  image: string | StaticImageData;
  serviceType: string;
  name: string;
}[] = [
  {
    id: 1,
    subTitle: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service1,
    serviceType: 'Ecosystem Building',
    name: 'Digital Transformation Advisory',
  },
  {
    id: 2,
    subTitle: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service2,
    serviceType: 'Ecosystem Building',
    name: 'Market Access',
  },
  {
    id: 3,
    subTitle: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service3,
    serviceType: 'Ecosystem Building',
    name: 'Capacity Building & Training',
  },
  {
    id: 4,
    subTitle: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service4,
    serviceType: 'Ecosystem Building',
    name: 'Access to Finance',
  },
  {
    id: 5,
    subTitle: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service1,
    serviceType: 'Ecosystem Building',
    name: 'Hub Membership',
  },
  {
    id: 6,
    subTitle: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service2,
    serviceType: 'Ecosystem Building',
    name: 'Hub Membership',
  },
  {
    id: 7,
    subTitle: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service3,
    serviceType: 'Ecosystem Building',
    name: 'Hub Membership',
  },
  {
    id: 8,
    subTitle: 'Ecosystem Building',
    description: 'Customised digital adoption plans',
    price: 'NGN 100 000',
    image: service4,
    serviceType: 'Ecosystem Building',
    name: 'Hub Membership',
  },
];

export default function ServicesComponent() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);
  const { data, isLoading } = useGetServices();

  useEffect(() => {}, []);
  const handleServiceClick = (service: (typeof services)[0]) => {
    setSelectedService(service);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
  };

  const handleApply = () => {
    // Handle apply logic here
    console.log('Apply for service:', selectedService?.subTitle);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
