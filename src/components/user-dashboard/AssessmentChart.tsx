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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-normal text-[#A3A3A3]">Assessment Scores</CardTitle>
        <Button
          variant="default"
          size="sm"
          className=" bg-transparent hover:bg-transparent hover:underline hover:text-[#0E5F7D] underline-offset-4 shadow-none drop-shadow-none text-[#0E5F7D]"
        >
          <Download className="w-4 h-4" color="#0E5F7D" />
          Download Reports →
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#B8B8B8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#B8B8B8' }} domain={[0, 100]} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#D63A3A"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
