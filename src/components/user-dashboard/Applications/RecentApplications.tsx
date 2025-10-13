import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useGetApplicationSubmissions } from '@/app/api/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .replace(',', ' •');
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Submitted':
      return (
        <Badge variant="secondary" className="bg-[#EBFBFF] text-[#227C9D] h-8 rounded-[8px] font-normal">
          Submitted
        </Badge>
      );
    case 'Processing':
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-700 h-8 rounded-[8px] font-normal">
          Processing
        </Badge>
      );
    case 'Completed':
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-700 h-8 rounded-[8px] font-normal">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function RecentApplications() {
  const { data: applications, isLoading, error } = useGetApplicationSubmissions();

  const [recentApplications, setRecentApplications] = useState(applications?.slice(0, 3));
  const [fetching, setFetching] = useState(false);

  const fetchRecentApplications = async () => {
    try {
      setFetching(true);
      const request = await fetch('/api/user/submissions');
      const response = await request.json();
      if (request.ok) {
        setRecentApplications(response?.slice(0, 3));
      } else {
        toast.error(response.message || 'An error occurred fetching recent applications');
        setRecentApplications([]);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred fetching recent applications');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchRecentApplications();
  }, []);

  useEffect(() => {
    setRecentApplications(applications);
  }, [applications]);

  const router = useRouter();

  if (fetching) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-gray-500">Loading recent applications...</div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl font-normal">Applications Submitted</CardTitle>
        <Button
          variant="default"
          size="sm"
          onClick={() => router.push('/user-dashboard/applications')}
          className="w-full sm:w-auto border-[#227C9D] rounded-md text-[#8F8F8F] bg-transparent border hover:bg-transparent hover:text-[#227C9D] text-sm"
        >
          See all →
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        {recentApplications && recentApplications?.length > 0 ? (
          recentApplications.map((app) => (
            <div key={app._id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b">
              <Image
                src={app.service_image || ''}
                alt={app.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                width={48}
                height={48}
              />
              <div className="flex-1  w-full">
                <div className="flex flex-wrap w-full  sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 justify-between">
                  <h4 className="font-medium text-sm sm:text-base">{app.service}</h4>
                  <div className="flex-shrink-0">{getStatusBadge(app.status)}</div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  <span className="text-[#D63A3A]">N{app.payment_amount}</span> • {formatDate(app.submission_time)}
                </p>
                {/* <p className="text-xs sm:text-sm text-muted-foreground font-medium text-right">Qty: {app.quantity}</p> */}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center items-center py-8">
              <div className="text-sm text-gray-500">No recent applications</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
