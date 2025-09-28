'use client';

import { Button } from '@/components/ui/button';
import { RecentApplications } from './Applications/RecentApplications';
import { AssessmentChart } from './AssessmentChart';
import ProfileCard from './Profile/ProfileCard';
import PageHeader from '../PageHeader';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useGetApplicationStatusCounts } from '@/app/api/user/useGetApplicationStatusCounts';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  return (
    <div className="space-y-4 sm:space-y-6 font-secondary">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 flex-wrap gap-y-3">
        <PageHeader title={`Welcome ${user?.first_name}`} description="What would you like to do today?" />
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
          <Button
            className="w-full sm:w-auto text-sm sm:text-base"
            onClick={() => router.push('/user-dashboard/assessment')}
          >
            Take Assessments
          </Button>
          <Link href="/user-dashboard/applications/apply" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              className="w-full sm:w-auto border border-[#FF5C5C] font-normal text-sm sm:text-base"
            >
              Apply to services and trainings
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards - Commented out but made responsive for future use */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Applications Submitted', value: 10 },
          { label: 'Applications Pending', value: 10 },
          { label: 'Applications Approved', value: 10 },
          { label: 'Applications Denied', value: 10 },
        ].map((card, i) => (
          <div key={i} className="bg-transparent shadow-sm rounded-lg p-3 sm:p-4 text-center border border-gray-200">
            <p className="text-xs sm:text-sm text-[#706C6C] font-semibold">{card.label}</p>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#171616]">{card.value}</h2>
          </div>
        ))}
      </div> */}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4 sm:space-y-6 order-2 xl:order-1">
          {/* Recent Applications */}
          <RecentApplications />
          {/* <AssessmentChart /> */}
        </div>
        <div className="order-1 xl:order-2">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}
