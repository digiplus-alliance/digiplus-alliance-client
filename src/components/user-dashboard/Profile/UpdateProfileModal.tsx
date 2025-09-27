'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProfile, UpdateProfileRequest, UpdateProfileRequestSchema } from '@/app/api/profile/useUpdateProfile';
import { useAuthStore } from '@/store/auth';
import ProfileImageUpload from './ProfileImageUpload';

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateProfileModal = ({ isOpen, onClose }: UpdateProfileModalProps) => {
  const { user, setUser } = useAuthStore();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

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
      email: '',
      phone: '',
      website: '',
      address: '',
      role: '',
    },
  });

  // Populate form with current user data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      reset({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        business_name: user.business_name || '',
        email: user.email || '',
        phone: (user as any).phone || '',
        website: (user as any).website || '',
        address: (user as any).address || '',
        role: user.role || '',
      });
    }
  }, [isOpen, user, reset]);

  const onSubmit = (data: UpdateProfileRequest) => {
    updateProfile(data, {
      onSuccess: (response) => {
        if (response.user) {
          setUser(response.user as any);
        }
        onClose();
      },
      onError: (error) => {
        console.error('Profile update failed:', error);
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const roleValue = watch('role');

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg w-full mx-auto bg-white rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-normal text-[#5E5B5B]">Update your profile</h2>

            {/* Profile Image */}
            <ProfileImageUpload
              onImageChange={(file) => {
                // TODO: Handle image upload
                console.log('Image selected:', file);
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

            {/* Company Name and Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-[#706C6C]">Company Name</label>
                <Input
                  {...register('business_name')}
                  placeholder="Registered Business Name"
                  className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
                />
                {errors.business_name && <p className="text-red-500 text-xs">{errors.business_name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#706C6C]">Your Role</label>
                <Select onValueChange={(value) => setValue('role', value)} value={roleValue}>
                  <SelectTrigger className="w-full h-11 border-[#EBEBEB] rounded-lg">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="business_owner">Business Owner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
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
                  {...register('phone')}
                  type="tel"
                  placeholder="+234 80 2121 2323"
                  className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Website and Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-[#706C6C]">Website</label>
                <Input
                  {...register('website')}
                  type="url"
                  placeholder="www.company.com"
                  className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
                />
                {errors.website && <p className="text-red-500 text-xs">{errors.website.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#706C6C]">Address</label>
                <Input
                  {...register('address')}
                  placeholder="adress,state,country"
                  className="h-11 py-3 border-[#EBEBEB] rounded-lg placeholder:text-[#8F8F8F]"
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-[#FF5C5C] mt-6 hover:bg-[#FF4444] text-white rounded-lg"
            >
              {isPending ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
