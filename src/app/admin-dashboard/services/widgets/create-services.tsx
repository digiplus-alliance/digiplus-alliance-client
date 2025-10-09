"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

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
  image: z.instanceof(File, { message: "Image file is required" }).optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export default function CreateService() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      price: "",
      discountedPrice: "",
    },
  });

  const watchAll = watch();

  const onSubmit = (data: ServiceFormData) => {
    console.log("Form Data:", data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-10 gap-8 py-6 rounded-xl">
      {/* Left Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 space-y-4 bg-white p-6 rounded-2xl shadow-sm"
      >
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

        <div className="grid grid-cols-2 gap-4">
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

        <div className="flex gap-3 pt-4 items-center justify-center">
          <Button type="submit" className="w-32">
            Save
          </Button>
          {/* <Button type="button" variant="outline" className="bg-transparent">
            Add another service
          </Button> */}
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
                <p className="font-bold mt-2 flex justify-end text-[#171616]">
                  {watchAll.price
                    ? `NGN ${Number(watchAll.price).toLocaleString()}`
                    : "NGN 0"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
