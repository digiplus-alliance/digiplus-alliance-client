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
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader className="bg-[#FBFBFD] text-[#B8B8B8] rounded-xl">
            <TableRow>
              <TableHead className="text-xs xl:text-sm">Application ID</TableHead>
              <TableHead className="text-xs xl:text-sm">Name</TableHead>
              <TableHead className="text-xs xl:text-sm">Submission Time</TableHead>
              <TableHead className="text-xs xl:text-sm">Paid</TableHead>
              <TableHead className="text-xs xl:text-sm">Timetable</TableHead>
              <TableHead className="text-xs xl:text-sm">Start Date</TableHead>
              <TableHead className="text-xs xl:text-sm">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id} className="hover:bg-[#EBFBFF] border-white">
                <TableCell className="font-medium text-[#06516C] text-xs xl:text-sm">{app.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-xs xl:text-sm">{app.name}</div>
                    <div className="text-xs text-muted-foreground">{app.category}</div>
                  </div>
                </TableCell>
                <TableCell className="text-xs xl:text-sm">{app.submissionTime}</TableCell>
                <TableCell className="text-xs xl:text-sm">{app.paid}</TableCell>
                <TableCell className="text-xs xl:text-sm">{app.timetable}</TableCell>
                <TableCell className="text-xs xl:text-sm">{app.startDate}</TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-sm">{app.name}</h4>
                <p className="text-xs text-muted-foreground">{app.category}</p>
                <p className="text-xs font-medium text-[#06516C] mt-1">{app.id}</p>
              </div>
              {getStatusBadge(app.status)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Submitted:</span>
                <p className="font-medium">{app.submissionTime}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <p className="font-medium">{app.paid}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Timetable:</span>
                <p className="font-medium">{app.timetable}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Start Date:</span>
                <p className="font-medium">{app.startDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="text-xs sm:text-sm text-[#706C6C] bg-white px-2.5 py-1 pr-6 rounded-lg">5 List per Page</div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" className="border border-white h-8 w-8 sm:h-10 sm:w-10">
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-3 py-1.5 sm:px-4 sm:py-2.5 bg-white text-[#706C6C] font-normal text-xs sm:text-sm"
          >
            1
          </Button>
          <Button variant="ghost" size="icon" className="border border-white h-8 w-8 sm:h-10 sm:w-10">
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
