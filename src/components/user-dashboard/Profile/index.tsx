'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import PageHeader from '@/components/PageHeader';
import UpdateProfileCompo from './UpdateProfile';

const ProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 font-secondary w-full h-full">
      <div className="flex items-center justify-between ">
        <PageHeader title="Profile" />
        {!isEditing && (
          <div className="flex items-center gap-4">
            <Button onClick={handleEditProfile}>Edit Profile</Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <UpdateProfileCompo onClose={handleClose} />
      ) : (
        <div className=" flex flex-col justify-center items-center w-full">
          <ProfileCard />
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
