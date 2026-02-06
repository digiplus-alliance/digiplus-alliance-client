'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProfile, UpdateProfileRequest, UpdateProfileRequestSchema } from '@/app/api/profile/useUpdateProfile';
import { useGetBusinessProfile } from '@/app/api/profile/useGetBusinessProfile';
import { useAuthStore } from '@/store/auth';
import ProfileImageUpload from './ProfileImageUpload';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useUpload } from '@/app/api/profile/useUpload';

interface UpdateProfileModalProps {
  onClose: () => void;
}

const UpdateProfileCompo = ({ onClose }: UpdateProfileModalProps) => {
  const { user, setUser } = useAuthStore();
  const { data: businessProfile, isLoading: isLoadingProfile } = useGetBusinessProfile();
  const { mutate: uploadImage } = useUpload();

  const handleImageUpload = async (file: File) => {
    // try {
    //   const formData = new FormData();
    //   formData.append('orgLogo', file);
    //   uploadImage(formData, {
    //     onSuccess: (data) => {
    //       toast.success('Image uploaded successfully');
    //     },
    //     onError: (error) => {
    //       console.error('Image upload failed:', error);
    //       toast.error('Image upload failed');
    //     },
    //   });
    // } catch (error) {
    //   console.error('Image upload failed:', error);
    //   toast.error('Image upload failed');
    // }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileRequest>({
    resolver: zodResolver(UpdateProfileRequestSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      business_name: '',
      industry: '',
      email: '',
      phone_number: '',
      company_website: '',
      company_address: '',
      city: '',
      state: '',
      country: '',
    },
  });

  // Populate form with current user data when modal opens
  useEffect(() => {
    // Prioritize business profile data over user data for form initialization
    if (businessProfile) {
      reset({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        business_name: businessProfile.business_name || '',
        industry: businessProfile.industry || '',
        email: businessProfile.email || '',
        phone_number: businessProfile.phone_number || '',
        company_website: businessProfile.company_website || '',
        company_address: businessProfile.company_address || '',
        city: businessProfile.city || '',
        state: businessProfile.state || '',
        country: businessProfile.country || '',
      });
    } else if (user && !isLoadingProfile) {
      // Fallback to user data if business profile is not available
      reset({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        business_name: user.business_name || '',
        industry: user.industry || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        company_website: user.company_website || '',
        company_address: user.company_address || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
      });
    }
  }, [user, businessProfile, isLoadingProfile, reset]);

  const onSubmit = async (data: UpdateProfileRequest) => {
    setIsSubmitting(true);

    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Append all form fields
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('business_name', data.business_name);
      formData.append('industry', data.industry);
      // formData.append('email', data.email);

      if (data.phone_number) formData.append('phone_number', data.phone_number);
      if (data.company_website) formData.append('company_website', data.company_website);
      if (data.company_address) formData.append('company_address', data.company_address);
      if (data.city) formData.append('city', data.city);
      if (data.state) formData.append('state', data.state);
      if (data.country) formData.append('country', data.country);

      // Handle file upload if org_logo is present
      if (data.org_logo && data.org_logo instanceof File) {
        formData.append('org_logo', data.org_logo);
      }

      const response = await fetch('/api/profile/business', {
        method: 'PATCH',
        body: formData, // Don't set Content-Type header, let browser set it with boundary
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success('Profile updated successfully');
        onClose();
      } else {
        toast.error(responseData.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Profile update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Remove roleValue since role is not in the new schema

  // Show loading state while fetching profile data
  if (isLoadingProfile) {
    return (
      <div className="max-w-lg w-full mx-auto bg-white rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-normal text-[#5E5B5B]">Loading profile...</h2>
            <div className="animate-pulse space-y-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg w-full mx-auto bg-white rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
      {/* Back button */}
      <div className="p-4 text-start">
        <Button
          type="button"
          variant="ghost"
          className="w-min h-11 bg-transparent text-[#5E5B5B] hover:bg-[#EBEBEB] rounded-lg"
          onClick={handleClose}
        >
          <ChevronLeft /> Back
        </Button>
      </div>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-xl font-normal text-[#5E5B5B]">Update your profile</h2>

          {/* Profile Image */}
          <ProfileImageUpload
            onImageChange={(file) => {
              console.log('Image selected:', file);
              setValue('org_logo', file);
              // Also handle the upload for immediate feedback
              handleImageUpload(file);
            }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">First Name</label>
              <Input
                {...register('first_name')}
                placeholder="First Name"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">Last Name</label>
              <Input
                {...register('last_name')}
                placeholder="Last name"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
            </div>
          </div>

          {/* Business Name and Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">Business Name</label>
              <Input
                {...register('business_name')}
                placeholder="The name of the organization"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.business_name && <p className="text-red-500 text-xs">{errors.business_name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">Industry</label>
              <Input
                {...register('industry')}
                placeholder="Information Technology"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.industry && <p className="text-red-500 text-xs">{errors.industry.message}</p>}
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">Email</label>
              <Input
                {...register('email')}
                type="email"
                placeholder="Registered Business Name"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">Phone Number</label>
              <Input
                {...register('phone_number')}
                type="tel"
                placeholder="+1-800-555-1234"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.phone_number && <p className="text-red-500 text-xs">{errors.phone_number.message}</p>}
            </div>
          </div>

          {/* Website and Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">Company Website</label>
              <Input
                {...register('company_website')}
                placeholder="digiplus.africa or https://www.digiplus.africa"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.company_website && <p className="text-red-500 text-xs">{errors.company_website.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">Company Address</label>
              <Input
                {...register('company_address')}
                placeholder="11 Collin Onabule"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.company_address && <p className="text-red-500 text-xs">{errors.company_address.message}</p>}
            </div>
          </div>

          {/* City, State, Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">City</label>
              <Input
                {...register('city')}
                placeholder="Ikeja"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">State</label>
              <Input
                {...register('state')}
                placeholder="Lagos State"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#706C6C]">Country</label>
              <Input
                {...register('country')}
                placeholder="Nigeria"
                className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
              />
              {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#FF5C5C] mt-6 hover:bg-[#FF4444] text-white rounded-lg"
          >
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileCompo;
