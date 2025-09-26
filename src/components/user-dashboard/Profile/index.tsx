import { Button } from '@/components/ui/button';
import React from 'react';
import ProfileCard from './ProfileCard';
import PageHeader from '@/components/PageHeader';

const ProfileComponent = () => {
  return (
    <div className="space-y-6 font-secondary w-full h-full">
      <div className="flex items-center justify-between ">
        <PageHeader title="Profile" />
        <div className="flex items-center gap-4">
          <Button>Edit Profile</Button>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center w-full">
        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfileComponent;
