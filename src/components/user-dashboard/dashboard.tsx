'use client';

import { Button } from '@/components/ui/button';
import { RecentApplications } from './Applications/RecentApplications';
import { AssessmentChart } from './AssessmentChart';
import ProfileCard from './Profile/ProfileCard';
import PageHeader from '../PageHeader';
import Link from 'next/link';

export default function UserDashboard() {
  return (
    <div className=" space-y-6 font-secondary">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <PageHeader title="Welcome Opeyemi" description="What would you like to do today?" />
        <div className="flex items-center gap-4">
          <Button>Take Assessments</Button>
          <Link href="/user-dashboard/applications/apply">
            <Button variant="ghost" className="border border-[#FF5C5C] font-normal">
              Apply to services and trainings
            </Button>
          </Link>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Applications Submitted', value: 10 },
          { label: 'Applications Pending', value: 10 },
          { label: 'Applications Approved', value: 10 },
          { label: 'Applications Denied', value: 10 },
        ].map((card, i) => (
          <div key={i} className="bg-transparent shadow-sm rounded-lg p-4 text-center border border-gray-200">
            <p className="text-sm text-[#706C6C] font-semibold">{card.label}</p>
            <h2 className="text-2xl font-semibold text-[#171616]">{card.value}</h2>
          </div>
        ))}
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Recent Applications */}
          <RecentApplications />
          <AssessmentChart />
        </div>
        <ProfileCard />
      </div>
    </div>
  );
}
