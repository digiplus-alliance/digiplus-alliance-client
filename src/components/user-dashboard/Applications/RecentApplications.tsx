import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const recentApplications = [
  {
    id: 1,
    name: 'Service Name',
    price: '100,000 NGN',
    date: 'April 20, 2022 at 04:00 PM',
    quantity: 1,
    status: 'Submitted',
    image: '/services/services_image_four.png',
  },
  {
    id: 2,
    name: 'Service Name',
    price: '100,000 NGN',
    date: 'April 20, 2022 at 04:00 PM',
    quantity: 1,
    status: 'Processing',
    image: '/services/services_image_three.png',
  },
  {
    id: 3,
    name: 'Service Name',
    price: '100,000 NGN',
    date: 'April 20, 2022 at 04:00 PM',
    quantity: 1,
    status: 'Completed',
    image: '/services/services_image_three.png',
  },
];

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
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl font-normal">Applications Submitted</CardTitle>
        <Button
          variant="default"
          size="sm"
          className="w-full sm:w-auto border-[#227C9D] rounded-md text-[#8F8F8F] bg-transparent border hover:bg-transparent hover:text-[#227C9D] text-sm"
        >
          See all →
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        {recentApplications.map((app) => (
          <div key={app.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b">
            <Image
              src={app.image}
              alt={app.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
              width={48}
              height={48}
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 sm:justify-between">
                <h4 className="font-medium text-sm sm:text-base truncate">{app.name}</h4>
                <div className="flex-shrink-0">{getStatusBadge(app.status)}</div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                <span className="text-[#D63A3A]">#D63A3A</span> • {app.date}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium text-right">Qty: {app.quantity}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
