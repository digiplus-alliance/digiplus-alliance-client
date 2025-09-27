'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Calendar, Filter, Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { ApplicationsTable } from './ApplicationsTable';
import PageHeader from '@/components/PageHeader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';
import StatsCards from '@/app/admin-dashboard/widgets/stats-card';
import { useGetApplicationStatusCounts } from '@/app/api/user/useGetApplicationStatusCounts';

const Applications = () => {
  const { data: statusCounts, isLoading: isLoadingStats } = useGetApplicationStatusCounts();

  // Transform API data to display format
  const statsData = statusCounts
    ? [
        { label: 'Applications Submitted', value: statusCounts.Submitted },
        { label: 'Applications Being Processed', value: statusCounts['Being Processed'] },
        { label: 'Applications Approved', value: statusCounts.Approved },
        { label: 'Applications Rejected', value: statusCounts.Rejected },
        { label: 'Applications Completed', value: statusCounts.Completed },
      ]
    : [];
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 flex-wrap gap-y-3">
        <PageHeader title="Applications" />
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

      {/* Stats Cards */}
      <div className="p-3 sm:p-4">
        {!isLoadingStats && statusCounts ? (
          <StatsCards stats={statsData} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-sm rounded-lg p-4 text-center border border-gray-200 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Applications Table */}
      <div className="col-span-1 mt-4 sm:mt-6">
        <Card className="bg-transparent border border-[#FFFFFF] rounded-[18px]">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-base sm:text-lg font-semibold text-[#706C6C] border-b border-[#FFFFFF] w-full pb-3 sm:pb-4">
                Application submission
              </CardTitle>
            </div>
            {/* Filters Section - Responsive */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0 mt-4 bg-[#FBFBFD] rounded-lg p-3 sm:p-5 justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search something..." className="pl-10 bg-muted border-0 text-sm sm:text-base" />
              </div>
              {/* Filter Controls */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
                <Select>
                  <SelectTrigger className="w-full sm:w-[150px] bg-white border-[#DDDDDD] text-sm sm:text-base">
                    <SelectValue placeholder="Filter Status" className="text-[#706C6C]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto border-[#DDDDDD] bg-white text-[#b1afaf] hover:bg-[#FBFBFD] text-sm sm:text-base"
                    >
                      Filter Date Range
                      <Calendar className="w-4 h-4 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">{/* Date picker component */}</PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <ApplicationsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Applications;
