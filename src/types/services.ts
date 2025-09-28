export interface Service {
  _id: string;
  name: string;
  service_type: string;
  image: string;
  price: number;
  subtitle: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ServicesCountResponse {
  count: number;
}

export interface ServiceTypesResponse {
  service_types: string[];
}

export interface ServicesResponse {
  services: Service[];
  total: number;
  page: number;
  limit: number;
}
