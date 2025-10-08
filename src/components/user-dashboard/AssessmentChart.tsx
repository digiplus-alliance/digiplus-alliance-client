import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import { useGetAvailableAssessments } from '@/app/api/assessments';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const YEARS = [
  { label: '2025', value: 2025 },
  { label: '2026', value: 2026 },
  { label: '2027', value: 2027 },

  { label: '2028', value: 2028 },

  { label: '2029', value: 2029 },
];
export function AssessmentChart() {
  const [fetching, setFetching] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState<
    {
      month: string;
      score: number;
    }[]
  >([]);
  const { user } = useAuthStore();

  const fetchStats = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/assessments/stats?id=${user?._id}&year=${year}`);
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        console.log(data.data);
        setChartData(data.data);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred fetching chart');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [year]);

  useEffect(() => {
    fetchStats();
  }, []);

  if (fetching) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-8">
          <div className="text-sm text-gray-500">Loading assessment chart...</div>
        </div>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 p-4 sm:p-6 flex-wrap gap-y-2">
        <CardTitle className="text-base sm:text-lg font-normal text-[#A3A3A3]">Assessment Scores</CardTitle>

        <div className=" flex items-center gap-2 justify-end flex- w-full">
          <Select
            onValueChange={(value) => {
              setYear(parseInt(value));
            }}
          >
            <SelectTrigger className="w-min  bg-white border-[#DDDDDD] text-sm sm:text-base">
              <SelectValue placeholder={new Date().getFullYear()} className="text-[#706C6C]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={new Date().getFullYear().toString()}>Year</SelectItem>
              {YEARS.map((year) => (
                <SelectItem key={year.value} value={year.value.toString()}>
                  {year.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="default"
            size="sm"
            className="w-auto bg-transparent hover:bg-transparent hover:underline hover:text-[#0E5F7D] underline-offset-4 shadow-none drop-shadow-none text-[#0E5F7D] text-sm"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" color="#0E5F7D" />
            <span className="hidden sm:inline">Download Reports →</span>
            <span className="sm:hidden">Download →</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {chartData.length > 0 ? (
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#B8B8B8' }}
                  className="sm:text-xs"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#B8B8B8' }}
                  domain={[0, 100]}
                  className="sm:text-xs"
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#D63A3A"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 2 }}
                  activeDot={{ r: 3, fill: 'hsl(var(--primary))' }}
                  className="sm:stroke-[3px]"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center items-center py-8">
              <div className="text-sm text-gray-500">Assessment chart not found</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
