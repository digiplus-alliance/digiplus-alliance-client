'use client'

import { useCreateService, CreateServicePayload } from "@/app/api/admin/services/create-service";
import UpdateServiceForm from "./update-service";

export default function ServicesPage() {
  const { mutate: createService, isPending, error } = useCreateService();

  const handleSubmit = (formData: CreateServicePayload) => {
    createService({
      name: "Web Development Training 2",
      service_type: "Digital Skills & Training",
      image: "https://example.com/image.jpg",
      price: 1500,
      subtitle: "Professional web development services",
      description: "We provide comprehensive web development services including frontend, backend, and database design."
    });
  };

  return (
    <div>
      <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({
        name: "Web Development",
        service_type: "Digital Skills & Training",
        image: "https://example.com/image.jpg",
        price: 1500,
        subtitle: "Professional web development services",
        description: "We provide comprehensive web development services including frontend, backend, and database design."
      });
    }}>
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Service"}
      </button>
    </form>

    <UpdateServiceForm serviceId="68d813620b0ae7e088467348" />
    </div>
  );
}