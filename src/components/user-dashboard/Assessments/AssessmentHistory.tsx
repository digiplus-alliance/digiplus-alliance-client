'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useGetAssessmentHistorySubmissions } from '@/app/api/user/useGetAssessmentHistory';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

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

const scoreRanges = [
  {
    min: 0,
    max: 20,
    value: '0-20',
  },
  {
    min: 21,
    max: 40,
    value: '21-40',
  },
  {
    min: 41,
    max: 60,
    value: '41-60',
  },
  {
    min: 61,
    max: 80,
    value: '61-80',
  },
  {
    min: 81,
    max: 100,
    value: '81-100',
  },
];

export function AssessmentHistoryTable() {
  const {
    data: assessments,
    isLoading,
    error,
  } = useGetAssessmentHistorySubmissions() as {
    data: any;
    isLoading: boolean;
    error: any;
  };

  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const [filters, setFilters] = useState<{
    score?: {
      min?: number;
      max?: number;
    };
    status?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }>({});

  const handleDateRangeChange = (from?: Date, to?: Date) => {
    setDateRange({ from, to });
    setFilters((prev) => ({
      ...prev,
      dateFrom: from,
      dateTo: to,
    }));
  };

  // Filter applications based on the provided filters
  const filteredAssessments = useMemo(() => {
    if (!assessments?.data) return [];

    return assessments?.data?.filter((assessment: any) => {
      // Score filter
      if (filters.score && assessment.user_score !== undefined) {
        const { min, max } = filters.score;
        if (min !== undefined && max !== undefined) {
          if (assessment.user_score < min || assessment.user_score > max) {
            return false;
          }
        }
      }

      // Status filter
      if (filters.status && assessment.status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom || filters.dateTo) {
        const submissionDate = new Date(assessment.completed_at ?? assessment.createdAt);

        if (filters.dateFrom && submissionDate < filters.dateFrom) {
          return false;
        }

        if (filters.dateTo) {
          const endOfDay = new Date(filters.dateTo);
          endOfDay.setHours(23, 59, 59, 999);
          if (submissionDate > endOfDay) {
            return false;
          }
        }
      }

      return true;
    });
  }, [assessments?.data, filters]);

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

  // if (!assessments || assessments?.data?.length === 0) {
  //   return (
  //     <div className="space-y-4">
  //       <div className="flex justify-center items-center py-8">
  //         <div className="text-sm text-gray-500">No assessments found.</div>
  //       </div>
  //     </div>
  //   );
  // }

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
        <Card className="bg-transparent border border-[#FFFFFF] rounded-[18px] mt-4 ">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-base sm:text-lg font-semibold text-[#706C6C] border-b border-[#FFFFFF] w-full pb-3 sm:pb-4">
                All Assessments
              </CardTitle>
            </div>
            {/* Filters Section - Responsive */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0 mt-4 bg-[#FBFBFD] rounded-lg p-3 sm:p-5 justify-between overflow-auto w-full ">
              {/* Filter Controls */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
                <Select
                  onValueChange={(value) => {
                    if (value === 'all') {
                      setFilters({ ...filters, score: undefined });
                    } else {
                      setFilters({
                        ...filters,
                        score: scoreRanges.find((score) => score.value === value),
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-white border-[#DDDDDD] text-sm sm:text-base">
                    <SelectValue placeholder="Filter by Score Range" className="text-[#706C6C]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Score Range</SelectItem>
                    {scoreRanges.map((score) => (
                      <SelectItem key={score.value} value={score.value}>
                        {score.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Date Range Filter */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto border-[#DDDDDD] bg-white text-[#b1afaf] hover:bg-[#FBFBFD] text-sm sm:text-base"
                    >
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(dateRange.from, 'LLL dd, y')
                        )
                      ) : (
                        'Filter Date Range'
                      )}
                      <Calendar className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-fit p-4 sm:p-6">
                    <DialogHeader>
                      <DialogTitle className="text-center sm:text-left">Select Date Range</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range) => {
                          if (range) {
                            handleDateRangeChange(range.from, range.to);
                          } else {
                            handleDateRangeChange(undefined, undefined);
                          }
                        }}
                        numberOfMonths={1}
                        className="sm:hidden"
                      />
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range) => {
                          if (range) {
                            handleDateRangeChange(range.from, range.to);
                          } else {
                            handleDateRangeChange(undefined, undefined);
                          }
                        }}
                        numberOfMonths={2}
                        className="hidden sm:block"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <>
              {/* Desktop Table View */}
              <div className="block mt-4 overflow-x-auto">
                <Table className="w-full min-w-[600px]">
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
                    {filteredAssessments.length > 0 ? (
                      filteredAssessments?.map((app: any) => (
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
                      ))
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-center items-center py-8 border max-w-[90%]">
                          <div className="text-sm text-gray-500">No assessments found.</div>
                        </div>
                      </div>
                    )}
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
