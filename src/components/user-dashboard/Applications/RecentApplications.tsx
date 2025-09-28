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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-normal ">Applications Submitted</CardTitle>
        <Button
          variant="default"
          size="sm"
          className=" border-[#227C9D] rounded-md text-[#8F8F8F] bg-transparent border hover:bg-transparent hover:text-[#227C9D] "
        >
          See all →
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentApplications.map((app) => (
          <div key={app.id} className="flex items-center gap-4 p-4 border-b">
            <Image
              src={app.image}
              alt={app.name}
              className="w-12 h-12 rounded-lg object-cover"
              width={48}
              height={48}
            />
            <div className="flex-1 ">
              <div className="flex items-center gap-2 mb-1 justify-between">
                <h4 className="font-medium">{app.name}</h4>
                {getStatusBadge(app.status)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className=" text-[#D63A3A]">#D63A3A</span> • {app.date}
              </p>
              <p className="text-sm text-muted-foreground font-medium w-full text-end">Qty: {app.quantity}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
