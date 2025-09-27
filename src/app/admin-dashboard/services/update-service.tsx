import { useUpdateService, UpdateServicePayload } from "@/app/api/admin/services/update-services";

export default function UpdateServiceForm({ serviceId }: { serviceId: string }) {
  const { mutate: updateService, isPending, error } = useUpdateService(serviceId);

  const handleSubmit = (formData: UpdateServicePayload) => {
    updateService({
      name: "Web Development Changed Name Version 2",
      service_type: "Digital Skills & Training",
      image: "https://example.com/image.jpg",
      price: 1500,
      subtitle: "Professional web development services",
      description: "We provide comprehensive web development services including frontend, backend, and database design."
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({
        name: "Web Development Changed Name Version 2",
        service_type: "Digital Skills & Training", 
        image: "https://example.com/image.jpg",
        price: 1500,
        subtitle: "Professional web development services",
        description: "We provide comprehensive web development services including frontend, backend, and database design."
      });
    }}>
      <button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update Service"}
      </button>
    </form>
  );
}