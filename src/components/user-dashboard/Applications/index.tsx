import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Calendar, Filter, Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { RecentApplications } from './RecentApplications';
import { Badge } from '../../ui/badge';
import { ApplicationsTable } from './ApplicationsTable';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';

const Applications = () => {
  return (
    <div className="grid grid-cols-1  gap-3">
      <div className="flex items-center justify-between ">
        <PageHeader title="Applications" />
        <div className="flex items-center gap-4">
          <Button>Take Assessments</Button>
          <Link href="/user-dashboard/applications/apply">
            <Button variant="ghost" className="border border-[#FF5C5C] font-normal">
              Apply to services and trainings
            </Button>
          </Link>
        </div>
      </div>
      {/* Applications Table */}
      <div className="col-span-1 mt-6">
        <Card className=" bg-transparent border border-[#FFFFFF] rounded-[18px]">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-lg font-semibold text-[#706C6C] border-b border-[#FFFFFF] w-full pb-4">
                Application submission
              </CardTitle>
            </div>
            <div className="flex items-center gap-4 mt-4 bg-[#FBFBFD] rounded-lg p-5 justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search something..." className="pl-10 bg-muted border-0" />
              </div>
              <div className=" flex items-center gap-4">
                <Select>
                  <SelectTrigger className="w-[150px] bg-white  border-[#DDDDDD]">
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
                      className="border-[#DDDDDD] bg-white text-[#b1afaf] hover:bg-[#FBFBFD]"
                    >
                      Filter Date Range
                      <Calendar className="w-4 h-4 mr-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">{/* < /> */}</PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent className=" ">
            <ApplicationsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Applications;
