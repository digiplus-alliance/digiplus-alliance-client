import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetApplicationSubmissions } from '@/app/api/user/useGetApplicationSubmissions';
import { ApplicationSubmission } from '@/types/applications';
import { ApplicationFilters } from './index';
import { useMemo } from 'react';

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format date
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

// Helper function to format start/end dates
const formatStartDate = (dateString: string | null) => {
  if (!dateString) return 'Null';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

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

interface ApplicationsTableProps {
  filters?: ApplicationFilters;
}

export function ApplicationsTable({ filters = {} }: ApplicationsTableProps) {
  const { data: applications, isLoading, error } = useGetApplicationSubmissions();

  // Filter applications based on the provided filters
  const filteredApplications = useMemo(() => {
    if (!applications) return [];

    return applications.filter((app) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          app.service.toLowerCase().includes(searchTerm) ||
          app.service_type.toLowerCase().includes(searchTerm) ||
          app.name.toLowerCase().includes(searchTerm) ||
          app.email.toLowerCase().includes(searchTerm) ||
          app._id.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // Service filter
      if (filters.service && app.service !== filters.service) {
        return false;
      }

      // Status filter
      if (filters.status && app.status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom || filters.dateTo) {
        const submissionDate = new Date(app.submission_time);

        if (filters.dateFrom && submissionDate < filters.dateFrom) {
          return false;
        }

        if (filters.dateTo) {
          // Set end of day for dateTo to include the entire day
          const endOfDay = new Date(filters.dateTo);
          endOfDay.setHours(23, 59, 59, 999);
          if (submissionDate > endOfDay) {
            return false;
          }
        }
      }

      return true;
    });
  }, [applications, filters]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-gray-500">Loading applications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-red-500">Failed to load applications. Please try again.</div>
        </div>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-gray-500">No applications found.</div>
        </div>
      </div>
    );
  }

  if (filteredApplications.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-gray-500">No applications match your filters.</div>
        </div>
      </div>
    );
  }

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
              <TableHead className="text-xs xl:text-sm">Amount</TableHead>
              <TableHead className="text-xs xl:text-sm">Paid</TableHead>
              <TableHead className="text-xs xl:text-sm">Timetable</TableHead>
              <TableHead className="text-xs xl:text-sm">Start Date</TableHead>
              <TableHead className="text-xs xl:text-sm">End Date</TableHead>
              <TableHead className="text-xs xl:text-sm">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((app: ApplicationSubmission) => (
              <TableRow key={app._id} className="hover:bg-[#EBFBFF] border-white">
                <TableCell className="font-medium text-[#06516C] text-xs xl:text-sm">{app._id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-xs xl:text-sm">{app.service}</div>
                    <div className="text-xs text-muted-foreground">{app.service_type}</div>
                  </div>
                </TableCell>
                <TableCell className="text-xs xl:text-sm">{formatDate(app.submission_time)}</TableCell>
                <TableCell className="text-xs xl:text-sm">{formatCurrency(app.payment_amount)}</TableCell>

                <TableCell className="text-xs xl:text-sm capitalize">{app.payment_status}</TableCell>
                <TableCell className="text-xs xl:text-sm">
                  {app.timetable_url ? (
                    <a
                      href={app.timetable_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Link
                    </a>
                  ) : (
                    'Null'
                  )}
                </TableCell>
                <TableCell className="text-xs xl:text-sm">{formatStartDate(app.start_date)}</TableCell>
                <TableCell className="text-xs xl:text-sm">{formatStartDate(app.end_date)}</TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {filteredApplications.map((app: ApplicationSubmission) => (
          <div key={app._id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-sm">{app.service}</h4>
                <p className="text-xs text-muted-foreground">{app.service_type}</p>
                <p className="text-xs font-medium text-[#06516C] mt-1">{app._id}</p>
              </div>
              {getStatusBadge(app.status)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Submitted:</span>
                <p className="font-medium">{formatDate(app.submission_time)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <p className="font-medium">{formatCurrency(app.payment_amount)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Timetable:</span>
                <p className="font-medium">
                  {app.timetable_url ? (
                    <a
                      href={app.timetable_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Link
                    </a>
                  ) : (
                    'Null'
                  )}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Start Date:</span>
                <p className="font-medium">{formatStartDate(app.start_date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="text-xs sm:text-sm text-[#706C6C] bg-white px-2.5 py-1 pr-6 rounded-lg">
          {filteredApplications.length} Application{filteredApplications.length !== 1 ? 's' : ''}
          {applications && filteredApplications.length !== applications.length && (
            <span className="text-muted-foreground">of {applications.length}</span>
          )}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" className="border border-white h-8 w-8 sm:h-10 sm:w-10" disabled>
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-3 py-1.5 sm:px-4 sm:py-2.5 bg-white text-[#706C6C] font-normal text-xs sm:text-sm"
          >
            1
          </Button>
          <Button variant="ghost" size="icon" className="border border-white h-8 w-8 sm:h-10 sm:w-10" disabled>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
