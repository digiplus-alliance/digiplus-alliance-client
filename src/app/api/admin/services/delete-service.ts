import useSend from "@/lib/useSend";

// Custom hook that takes the service ID as parameter
export const useDeleteService = (serviceId: string) => {
  return useSend({
    url: `services/${serviceId}`,
    method: "delete",
    hasAuth: true,
    successMessage: "Service deleted successfully",
    invalidateKeys: [
      "services",
      `services/${serviceId}`,
      "all-services",
      `service-by-${serviceId}`,
    ],
  });
};
