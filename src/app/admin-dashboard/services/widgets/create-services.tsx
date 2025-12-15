"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateService } from "@/app/api/admin/services/create-service";
import { useUpdateService } from "@/app/api/admin/services/update-services";
import { useGetServiceById } from "@/app/api/admin/services/get-service-by-id";
import SpinnerIcon from "@/components/icons/spinner";
import { ArrowLeft } from "lucide-react";

const serviceSchema = z.object({
  name: z.string().min(2, "Service name is required"),
  shortDescription: z.string().min(5, "Short description is required"),
  longDescription: z.string().min(10, "Long description is required"),
  price: z
    .string()
    .min(1, "Product price is required")
    .regex(/^\d+$/, "Price must be a number"),
  discountedPrice: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "Discounted price must be a number",
    }),
  serviceType: z.string().min(1, "Service type is required"),
  pricingUnit: z.string().min(1, "Pricing unit is required"),
  image: z.instanceof(File, { message: "Image file is required" }).optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

const serviceTypes = [
  { value: "Ecosystem Building", label: "Ecosystem Building" },
  { value: "Digital Skills & Training", label: "Digital Skills & Training" },
  {
    value: "Digital Infrastructure / Tools",
    label: "Digital Infrastructure / Tools",
  },
  {
    value: "Business Advisory & Ecosystem Support",
    label: "Business Advisory & Ecosystem Support",
  },
  { value: "Research & Insights", label: "Research & Insights" },
  {
    value: "Innovation & Co-creation Labs",
    label: "Innovation & Co-creation Labs",
  },
];

const pricingUnits = [
  { value: "per_hour", label: "Per Hour" },
  { value: "per_project", label: "Per Project" },
  { value: "one_time_payment", label: "One Time Payment" },
  { value: "per_day", label: "Per Day" },
  { value: "per_month", label: "Per Month" },
];

interface CreateServiceProps {
  serviceId?: string | null;
  onBack?: () => void;
}

export default function CreateService({
  serviceId,
  onBack,
}: CreateServiceProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<string>("");
  const [selectedPricingUnit, setSelectedPricingUnit] = useState<string>("");
  const { mutate: createService, isPending: isCreating } = useCreateService();
  const { mutate: updateService, isPending: isUpdating } = useUpdateService(
    serviceId || ""
  );

  const isPending = isCreating || isUpdating;

  // Fetch service data if editing
  const { data: serviceData, isLoading: isLoadingService } = useGetServiceById(
    serviceId || "",
    !!serviceId
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      price: "",
      discountedPrice: "",
      serviceType: "",
      pricingUnit: "",
    },
  });

  // Prefill form when editing
  useEffect(() => {
    if (serviceData && serviceId) {
      // Find matching service type from the array
      const matchingServiceType = serviceTypes.find(
        (type) => type.value === serviceData.service_type
      );

      // Find matching pricing unit from the array
      const matchingPricingUnit = pricingUnits.find(
        (unit) => unit.value === serviceData.pricing_unit
      );

      const serviceTypeValue = matchingServiceType?.value || "";
      const pricingUnitValue = matchingPricingUnit?.value || "";

      // Update states
      setSelectedServiceType(serviceTypeValue);
      setSelectedPricingUnit(pricingUnitValue);

      // Reset form with all values
      reset({
        name: serviceData.name,
        shortDescription: serviceData.short_description,
        longDescription: serviceData.long_description,
        price: serviceData.price.toString(),
        discountedPrice: serviceData.discounted_price?.toString() || "",
        serviceType: serviceTypeValue,
        pricingUnit: pricingUnitValue,
      });

      // Set preview image
      if (serviceData.image) {
        setPreview(serviceData.image);
      }
    }
  }, [serviceData, serviceId, reset]);

  const watchAll = watch();

  const onSubmit = (data: ServiceFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("service_type", data.serviceType);
    formData.append("short_description", data.shortDescription);
    formData.append("long_description", data.longDescription);
    formData.append("price", data.price);

    if (data.discountedPrice) {
      formData.append("discounted_price", data.discountedPrice);
    }

    formData.append("pricing_unit", data.pricingUnit);

    if (data.image) {
      formData.append("images", data.image);
    }

    const onSuccessCallback = () => {
      reset();
      setPreview(null);
      if (onBack) {
        onBack();
      }
    };

    if (serviceId) {
      // Update existing service
      updateService(formData as any, {
        onSuccess: onSuccessCallback,
      });
    } else {
      // Create new service
      createService(formData as any, {
        onSuccess: onSuccessCallback,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  // Show loading state when fetching service data
  if (isLoadingService && serviceId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <SpinnerIcon className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:space-x-10 gap-8 py-6 rounded-xl">
      {/* Left Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 space-y-4 bg-white p-6 rounded-2xl shadow-sm"
      >
        {/* Back button and title */}
        {serviceId && onBack && (
          <div className="flex items-center gap-2 mb-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">Edit Service</h2>
          </div>
        )}
        {/* Image Upload */}
        <div className="flex flex-col md:flex-row items-start gap-4">
          <label className="relative w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover rounded-xl"
              />
            ) : (
              <span className="text-2xl text-gray-500">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          <div className="flex-1 space-y-3">
            <div>
              <label className="text-sm font-medium text-[#706C6C]">
                Product Name
              </label>
              <Input placeholder="Name of Service" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-[#706C6C]">
                Short Description
              </label>
              <Input
                placeholder="Describe the service"
                {...register("shortDescription")}
              />
              {errors.shortDescription && (
                <p className="text-red-500 text-sm">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#706C6C]">
            Long Description
          </label>
          <Textarea
            placeholder="Describe the service"
            rows={4}
            {...register("longDescription")}
            className="bg-white"
          />
          {errors.longDescription && (
            <p className="text-red-500 text-sm">
              {errors.longDescription.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-[#706C6C]">
              Product Price
            </label>
            <Input placeholder="Price" {...register("price")} />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-[#706C6C]">
              Discounted Price
            </label>
            <Input placeholder="Price" {...register("discountedPrice")} />
            {errors.discountedPrice && (
              <p className="text-red-500 text-sm">
                {errors.discountedPrice.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-[#706C6C]">
              Service Type
            </label>
            <Controller
              name="serviceType"
              control={control}
              render={({ field }) => (
                <Select
                  key={`serviceType-${field.value || selectedServiceType}`}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedServiceType(value);
                  }}
                  value={field.value || selectedServiceType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.serviceType && (
              <p className="text-red-500 text-sm">
                {errors.serviceType.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-[#706C6C]">
              Pricing Unit
            </label>
            <Controller
              name="pricingUnit"
              control={control}
              render={({ field }) => (
                <Select
                  key={`pricingUnit-${field.value || selectedPricingUnit}`}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedPricingUnit(value);
                  }}
                  value={field.value || selectedPricingUnit}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select pricing unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.pricingUnit && (
              <p className="text-red-500 text-sm">
                {errors.pricingUnit.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 items-center justify-center">
          <Button type="submit" className="w-32">
            {isPending ? (
              <SpinnerIcon className="animate-spin" />
            ) : serviceId ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>

      {/* Right Preview */}
      <div className="w-full md:w-64 my-10">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 space-y-3">
            <p className="font-semibold text-center mb-2">Preview</p>

            <div className="border border-gray-200 rounded-xl p-3">
              <div className="relative w-full h-40 bg-gray-100 rounded-t-xl overflow-hidden">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="pt-3 space-y-1">
                <p className="font-medium text-[#5E5B5B]">
                  {watchAll.name || "Service Name"}
                </p>
                <p className="text-sm text-[#171616]">
                  {watchAll.shortDescription || "Short description here"}
                </p>
                <div className="mt-2 flex flex-col items-end gap-1">
                  <p className="font-bold text-[#171616]">
                    {watchAll.discountedPrice
                      ? `NGN ${Number(watchAll.discountedPrice).toLocaleString()}`
                      : watchAll.price
                      ? `NGN ${Number(watchAll.price).toLocaleString()}`
                      : "NGN 0"}
                  </p>
                  {watchAll.discountedPrice && watchAll.price && (
                    <p className="text-sm text-red-600 line-through">
                      NGN {Number(watchAll.price).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
