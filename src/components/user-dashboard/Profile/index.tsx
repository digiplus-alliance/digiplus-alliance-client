'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import PageHeader from '@/components/PageHeader';
import UpdateProfileModal from './UpdateProfileModal';

const ProfileComponent = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="space-y-6 font-secondary w-full h-full">
      <div className="flex items-center justify-between ">
        <PageHeader title="Profile" />
        <div className="flex items-center gap-4">
          <Button onClick={handleEditProfile}>Edit Profile</Button>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center w-full">
        <ProfileCard />
      </div>

      {/* Update Profile Modal */}
      <UpdateProfileModal isOpen={isUpdateModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProfileComponent;
