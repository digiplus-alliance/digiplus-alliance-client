import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const applications = [
  {
    id: 'AP/2030222',
    name: 'Digital Transformation Advisory',
    category: 'Ecosystem Building',
    submissionTime: '16 June 2021 • 1:20 pm',
    paid: '100,000 NGN',
    timetable: 'Null',
    startDate: 'Null',
    status: 'Submitted',
  },
  {
    id: 'PY/0934560',
    name: 'Market Access',
    category: 'Ecosystem Building',
    submissionTime: '16 June 2021 • 9:00 am',
    paid: '100,000 NGN',
    timetable: 'Null',
    startDate: 'Null',
    status: 'Being Processed',
  },
  {
    id: 'MM/3120CSAD',
    name: 'Capacity Building & Training',
    category: 'Skills & Development',
    submissionTime: '16 June 2021 • 9:30 am',
    paid: '200,000 NGN',
    timetable: 'Link',
    startDate: '16 Aug 2025',
    status: 'Approved',
  },
  {
    id: 'UP/89ASD98',
    name: 'Access to Finance',
    category: 'Access to Finance',
    submissionTime: '15 June 2021 • 5:40 pm',
    paid: '250,000 NGN',
    timetable: 'Null',
    startDate: 'Null',
    status: 'Rejected',
  },
  {
    id: 'LO/123090AS0',
    name: 'Hub Membership',
    category: 'Ecosystem Building',
    submissionTime: '15 June 2021 • 3:00 pm',
    paid: '350,000 NGN',
    timetable: 'Link',
    startDate: '16 Aug 2024',
    status: 'Completed',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Submitted':
      return (
        <Badge variant="secondary" className=" text-[#117D70] font-normal">
          Submitted
        </Badge>
      );
    case 'Being Processed':
      return (
        <Badge variant="secondary" className="bg-[#FFF6D3] text-[#5E5B5B] font-normal">
          Being Processed
        </Badge>
      );
    case 'Approved':
      return (
        <Badge variant="secondary" className="bg-[#EBFFFC] text-[#117D70] font-normal">
          Approved
        </Badge>
      );
    case 'Rejected':
      return (
        <Badge variant="secondary" className="bg-[#FFEBEB] text-[#850C0C] font-normal">
          Rejected
        </Badge>
      );
    case 'Completed':
      return (
        <Badge variant="secondary" className="bg-[#EBFBFF] text-[#227C9D] font-normal">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function ApplicationsTable() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader className=" bg-[#FBFBFD] text-[#B8B8B8] rounded-xl">
          <TableRow>
            <TableHead>Application ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Submission Time</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Timetable</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className=" hover:bg-[#EBFBFF] border-white">
              <TableCell className="font-medium text-[#06516C]">{app.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{app.name}</div>
                  <div className="text-sm text-muted-foreground">{app.category}</div>
                </div>
              </TableCell>
              <TableCell>{app.submissionTime}</TableCell>
              <TableCell>{app.paid}</TableCell>
              <TableCell>{app.timetable}</TableCell>
              <TableCell>{app.startDate}</TableCell>
              <TableCell>{getStatusBadge(app.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <div className="text-sm text-[#706C6C] bg-white px-2.5 py-1 pr-6 rounded-lg">5 List per Page</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className=" border border-white">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className=" px-4 py-2.5 bg-white text-[#706C6C] font-normal">
            1
          </Button>
          <Button variant="ghost" size="icon" className=" border border-white">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
