import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Globe, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { useGetBusinessProfile } from '@/app/api/profile/useGetBusinessProfile';
import { useRouter } from 'next/navigation';
import { useGetAssessmentHistorySubmissions } from '@/app/api/user/useGetAssessmentHistory';
import { cn } from '@/lib/utils';

const ProfileCard = () => {
  const { user } = useAuthStore();
  const { data: businessProfile, isLoading: isLoadingProfile } = useGetBusinessProfile();

  const router = useRouter();

  const {
    data: assessments,
    isLoading,
    error,
  } = useGetAssessmentHistorySubmissions() as {
    data: any;
    isLoading: boolean;
    error: any;
  };

  return (
    <div className="w-full max-w-[400px] sm:max-w-[450px] lg:max-w-[500px] max-md:max-w-full h-full">
      <Card className="shadow-lg">
        <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
          <div className="flex flex-col items-center text-center space-y-0 gap-4 sm:gap-6">
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
              <div className="relative">
                {user?.logo_url || user?.profile_picture || businessProfile?.logo_url ? (
                  <Image
                    src={
                      user?.logo_url ||
                      user?.profile_picture ||
                      businessProfile?.logo_url ||
                      '/about/team-placeholder-four.png'
                    }
                    alt={`${user?.first_name} ${user?.last_name}` || 'Profile'}
                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover ring-4 ring-green-100"
                    width={120}
                    height={120}
                  />
                ) : (
                  <div className="w-[80px] h-[80px] text-4xl sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover flex items-center justify-center bg-green-100">
                    {user?.first_name?.charAt(0) || '' + user?.last_name?.charAt(0) || ''}
                  </div>
                )}
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-xl sm:text-2xl lg:text-3xl capitalize">
                  {user?.first_name + ' ' + user?.last_name}
                </h3>
                <p className="text-xs sm:text-sm text-[#8F8F8F] capitalize">{user?.role.split('_').join(' ')}</p>
                <p className="bg-[#EBFFFC] text-[#076C61] px-4 sm:px-6 py-1 sm:py-2 rounded-lg w-full text-center text-xs sm:text-sm">
                  {user?.is_active ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>

            {/* Training Topic Section */}
            {false && (
              <div className="w-full max-w-[90%] bg-white border border-[#EBEBEB] rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  {/* Circular Progress */}
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      {/* Background circle */}
                      <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                      {/* Progress circle (20% progress for Level 1 of 5) */}
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#0891B2"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.2)}`} // 20% progress, 30% progress will be 0.3
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-in-out"
                      />
                    </svg>
                  </div>

                  {/* Training Info */}
                  <div className="flex flex-col">
                    <h4 className="text-lg font-medium text-[#5E5B5B] mb-1">Training Topic</h4>
                    <p className="text-sm text-[#5E5B5B]">Level 1 of 5</p>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-center flex flex-col items-center justify-start pt-6 sm:pt-8 lg:pt-10 w-full border-t border-[#D9D9D9]">
              <div className="flex items-center gap-2 w-full max-w-[85%] sm:max-w-[70%]">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" color="#B8B8B8" />
                <span className="truncate">{businessProfile?.email || user?.email}</span>
              </div>
              <div className="flex items-center gap-2 w-full max-w-[85%] sm:max-w-[70%]">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" color="#B8B8B8" />
                <span className="truncate">
                  {businessProfile?.phone_number || user?.phone_number || 'Not provided'}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full max-w-[85%] sm:max-w-[70%]">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" color="#B8B8B8" />
                <span className="truncate">
                  {businessProfile?.company_website || user?.company_website || user?.business_name || 'Not provided'}
                </span>
              </div>
              {/* {businessProfile && (
                <>
                  {businessProfile.industry && (
                    <div className="flex items-center gap-2 w-full max-w-[85%] sm:max-w-[70%]">
                      <span className="text-muted-foreground text-xs">Industry:</span>
                      <span className="truncate">{businessProfile.industry}</span>
                    </div>
                  )}
                  {(businessProfile.city || businessProfile.state || businessProfile.country) && (
                    <div className="flex items-center gap-2 w-full max-w-[85%] sm:max-w-[70%]">
                      <span className="text-muted-foreground text-xs">Location:</span>
                      <span className="truncate">
                        {[businessProfile.city, businessProfile.state, businessProfile.country]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </div>
                  )}
                </>
              )} */}
            </div>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-center flex flex-col items-center justify-start pt-6 sm:pt-8 lg:pt-10 pb-0 w-full border-t border-[#D9D9D9]">
              <div className="flex items-center justify-between gap-2 w-full max-w-[85%] sm:max-w-[70%]">
                <div className="flex flex-col items-start gap-0.5 w-full max-w-[98%]">
                  <span className="text-muted-foreground text-xs sm:text-sm">Assessment</span>
                  <p
                    className={cn(
                      'bg-[#FFF6D3] text-[#5E5B5B] px-4 sm:px-6 py-1 sm:py-2 rounded-lg w-full text-center text-xs sm:text-sm',
                      assessments && assessments?.data?.length > 0 && 'bg-[#ade9f8] text-[#017997]'
                    )}
                  >
                    {assessments?.data?.length > 0
                      ? 'Number: ' + assessments?.data?.length + ' completed'
                      : 'No Assessments'}
                  </p>
                </div>
                <button onClick={() => router.push('/user-dashboard/grades')}>
                  <ChevronRight color="#B8B8B8" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm w-full max-w-[70%]">
                <div className=" flex flex-col items-start gap-0.5 w-full max-w-[98%]">
                  <p className="text-muted-foreground">Policies</p>
                  <button
                    className=" "
                    onClick={() => {
                      window.open(
                        'https://www.8thgearpartners.com/terms-and-conditions',
                        '_blank',
                        'noopener,noreferrer'
                      );
                    }}
                  >
                    Read all Terms and conditions
                  </button>
                </div>
                <button
                  onClick={() => {
                    window.open(
                      'https://www.8thgearpartners.com/terms-and-conditions',
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                >
                  <ChevronRight color="#B8B8B8" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
