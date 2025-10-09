'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useGetApplicationSubmissions } from '@/app/api/user/useGetApplicationSubmissions';
import { ApplicationSubmission } from '@/types/applications';
import { useMemo } from 'react';
import { useGetAssessmentHistorySubmissions } from '@/app/api/user/useGetAssessmentHistory';
import { AssessmentSubmission } from '@/types/assessment';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '@/components/ui/input';

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

interface AssessmentHistoryTableProps {
  filters?: any;
}

export function AssessmentHistoryTable({ filters = {} }: AssessmentHistoryTableProps) {
  const {
    data: assessments,
    isLoading,
    error,
  } = useGetAssessmentHistorySubmissions() as {
    data: any;
    isLoading: boolean;
    error: any;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-gray-500">Loading assessments...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-red-500">Failed to load assessments. Please try again.</div>
        </div>
      </div>
    );
  }

  if (!assessments || assessments?.data?.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-gray-500">No assessments found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex mb-4 flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 flex-wrap gap-y-3">
        <PageHeader title="Assessment Grades" />
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
          <Button className="w-full sm:w-auto text-sm sm:text-base">Take Assessments</Button>
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
      <div className="col-span-1 mt-8 sm:mt-6">
        <Card className="bg-transparent border border-[#FFFFFF] rounded-[18px] mt-4">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-base sm:text-lg font-semibold text-[#706C6C] border-b border-[#FFFFFF] w-full pb-3 sm:pb-4">
                All Assessments
              </CardTitle>
            </div>
            {/* Filters Section - Responsive */}
            {/* <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0 mt-4 bg-[#FBFBFD] rounded-lg p-3 sm:p-5 justify-between">
              <div className="relative flex-1 max-w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search assessments..."
                  className="pl-10 bg-muted border-0 text-sm sm:text-base"
                  onChange={(e) => {}}
                />
              </div>
            </div> */}

            <>
              {/* Desktop Table View */}
              <div className="block mt-4">
                <Table>
                  <TableHeader className="bg-[#FBFBFD] text-[#B8B8B8] rounded-xl">
                    <TableRow>
                      <TableHead className="text-xs xl:text-sm">Date</TableHead>
                      <TableHead className="text-xs xl:text-sm">Submission Time</TableHead>
                      <TableHead className="text-xs xl:text-sm">Score</TableHead>
                      <TableHead className="text-xs xl:text-sm">Status</TableHead>
                      {/* <TableHead className="text-xs xl:text-sm"></TableHead>
              <TableHead className="text-xs xl:text-sm"></TableHead>
              <TableHead className="text-xs xl:text-sm"></TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assessments?.data?.map((app: any) => (
                      <TableRow key={app._id} className="hover:bg-[#EBFBFF] border-white">
                        <TableCell className="font-medium text-[#06516C] text-xs xl:text-sm">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-xs xl:text-sm">{formatDate(app.completed_at)}</TableCell>

                        <TableCell className="text-xs xl:text-sm">{app.user_score}</TableCell>
                        <TableCell>{getStatusBadge(app?.status || 'Submitted')}</TableCell>
                        {/* 
                <TableCell className="text-xs xl:text-sm capitalize"></TableCell>
                <TableCell className="text-xs xl:text-sm"></TableCell>
                <TableCell className="text-xs xl:text-sm"></TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-3"></div>

              {/* Pagination */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
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
            </>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
