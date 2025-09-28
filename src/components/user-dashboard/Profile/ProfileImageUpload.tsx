'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useGetBusinessProfile } from '@/app/api/profile';

interface ProfileImageUploadProps {
  onImageChange?: (file: File) => void;
  className?: string;
}

const ProfileImageUpload = ({ onImageChange, className = '' }: ProfileImageUploadProps) => {
  const { user } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data } = useGetBusinessProfile();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Call the callback if provided
      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  // Get the image source - use preview if available, otherwise user's profile picture or default
  const getImageSrc = () => {
    if (previewUrl) return previewUrl;
    if (user?.profile_picture) return user.profile_picture;
    if (user?.logo_url) return user.logo_url;
    if (data?.logo_url) return data.logo_url;
    return '/about/team-placeholder-four.png';
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative cursor-pointer" onClick={handleImageClick}>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
          <Image src={getImageSrc()} alt="Profile" className="w-full h-full object-cover" width={80} height={80} />
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border hover:bg-gray-50 transition-colors">
          <Camera className="w-3 h-3 text-gray-600" />
        </div>

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
};

export default ProfileImageUpload;
