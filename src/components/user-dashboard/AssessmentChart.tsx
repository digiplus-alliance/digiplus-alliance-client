import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

const data = [
  { month: 'Jan', score: 32 },
  { month: 'Feb', score: 45 },
  { month: 'Mar', score: 42 },
  { month: 'Apr', score: 48 },
  { month: 'May', score: 65 },
  { month: 'Jun', score: 58 },
];

export function AssessmentChart() {
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg font-normal text-[#A3A3A3]">Assessment Scores</CardTitle>
        <Button
          variant="default"
          size="sm"
          className="w-full sm:w-auto bg-transparent hover:bg-transparent hover:underline hover:text-[#0E5F7D] underline-offset-4 shadow-none drop-shadow-none text-[#0E5F7D] text-sm"
        >
          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" color="#0E5F7D" />
          <span className="hidden sm:inline">Download Reports →</span>
          <span className="sm:hidden">Download →</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="h-48 sm:h-56 lg:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
      </CardContent>
    </Card>
  );
}
