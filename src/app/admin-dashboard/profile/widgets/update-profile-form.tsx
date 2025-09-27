"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { usePatchProfile } from "@/app/api/admin/profile/patchProfile";
import SpinnerIcon from "@/components/icons/spinner";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  website: z.string().url("Invalid website URL"),
  address: z.string().min(1, "Address is required"),
  avatar: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Invalid file"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function UpdateProfileForm() {
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const { mutate: updateProfile, isPending } = usePatchProfile(); 
  const onSubmit = (data: ProfileFormData) => {
    console.log("Form data:", data);
    updateProfile({
      email: data.email,
      phone_number: data.phone,
      website: data.website
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file); 
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm space-y-6"
    >
      <h2 className="text-xl font-normal text-center text-[#5E5B5B]">Update your profile</h2>

      {/* Avatar Upload */}
      <div className="flex justify-center mt-8">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarPreview || "/avatar.png"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <label className="absolute bottom-0 right-0 bg-gray-100 border rounded-full p-2 cursor-pointer">
            <Camera className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-sm text-[#706C6C] mb-1 font-normal">First name</Label>
          <Input id="firstName" placeholder="First Name" {...register("firstName")} />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName" className="text-sm text-[#706C6C] mb-1 font-normal">Last name</Label>
          <Input id="lastName" placeholder="Last name" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="companyName" className="text-sm text-[#706C6C] mb-1 font-normal">Company name</Label>
          <Input id="companyName" placeholder="Registered Business Name" {...register("companyName")} />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="role" className="text-sm text-[#706C6C] mb-1 font-normal">Role</Label>
          <Select onValueChange={(val) => setValue("role", val)}>
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Founder">Founder</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email" className="text-sm text-[#706C6C] mb-1 font-normal">Email</Label>
          <Input id="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm text-[#706C6C] mb-1 font-normal">Phone</Label>
          <Input id="phone" placeholder="+234 80 2121 2323" {...register("phone")} />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="website" className="text-sm text-[#706C6C] mb-1 font-normal">Website</Label>
          <Input id="website" placeholder="www.company.com" {...register("website")} />
          {errors.website && (
            <p className="text-red-500 text-sm">{errors.website.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="address" className="text-sm text-[#706C6C] mb-1 font-normal">Address</Label>
          <Input id="address" placeholder="address,state,country" {...register("address")} />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <Button
        type="submit"
        className="font-normal w-full"
      >
        {isPending ? <SpinnerIcon /> : "Save Profile"}
      </Button>
    </form>
  );
}
