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
import { useAuthStore } from '@/store/auth';

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

export enum PricingUnit {
  PER_HOUR = 'per_hour',
  PER_PROJECT = 'per_project',
  ONE_TIME = 'one_time',
  PER_DAY = 'per_day',
  PER_MONTH = 'per_month',
}

interface ServiceCard {
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
}

const getPricingUnit = (unit: string) => {
  switch (unit) {
    case 'per_hour':
      return 'Per Hour';
    case 'per_project':
      return 'Per Project';
    case 'one_time':
      return 'One Time';
    case 'per_day':
      return 'Per Day';
    case 'per_month':
      return 'Per Month';
    default:
      return '';
  }
};

export default function ServicesComponent() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
  const { data, isLoading } = useGetServices();

  const [servicesAvailable, setServicesAvailable] = useState<ServiceCard[]>([]);
  const { suggestedServices, setSuggestedServices } = useAuthStore();

  const [currentSuggestedServices, setCurrentSuggestedServices] = useState<string[]>(suggestedServices);

  console.log(currentSuggestedServices);

  useEffect(() => {
    if (data) {
      if (currentSuggestedServices.length > 0) {
        const filteredServices = data.filter((service) => currentSuggestedServices.includes(service.name));
        setSuggestedServices([]);
        setServicesAvailable(filteredServices as any);
      } else {
        setServicesAvailable(data as any);
      }
    }
  }, [isLoading, data]);

  const handleServiceClick = (service: ServiceCard) => {
    setSelectedService(service);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
  };

  const handleApply = () => {
    // Handle apply logic here
    console.log('Apply for service:', selectedService?.name);
    router.push('/user-dashboard/applications/apply');
  };

  // Get related services (exclude the selected one)
  const getRelatedServices = (currentServiceId: string) => {
    return servicesAvailable.filter((service) => service._id !== currentServiceId);
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
          relatedServices={getRelatedServices(selectedService._id)}
          onApply={handleApply}
          pricing_unit={getPricingUnit(selectedService.pricing_unit)}
          handleClick={handleServiceClick}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] sm:min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <PageHeader title={currentSuggestedServices.length > 0 ? 'Suggested Services' : 'Services'} />

      {/* Services Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {servicesAvailable && servicesAvailable?.length > 0 ? (
          servicesAvailable.map((service) => (
            <ServiceCard key={service._id} {...service} onClick={() => handleServiceClick(service)} />
          ))
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center items-center py-8">
              <div className="text-sm text-gray-500">No services available</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
