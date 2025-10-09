import { useGetAllServices } from "@/app/api/admin/services/get-all-services";
import ServiceCard from "./service-card";

export default function AllServices() {
  const { data: services, isLoading, error } = useGetAllServices();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {services?.map((it) => (
        <ServiceCard
          key={it._id}
          image={it.image}
          title={it.name}
          body={it.short_description ?? ""}
          footer={it.price ?? ""}
        />
      ))}
    </div>
  );
}
