import * as XLSX from 'xlsx';

interface SubmissionDetail {
  [key: string]: any;
}

interface MonthlyBreakdown {
  month: string;
  year: number;
  score: number;
  submissions: number;
  submission_details: SubmissionDetail[];
}

interface YearlyData {
  year: number;
  summary: {
    total_submissions: number;
    overall_average_score: number;
    months_active: number;
  };
  monthly_breakdown: MonthlyBreakdown[];
}

/**
 * Formats header text: converts snake_case to Title Case
 */
function formatHeader(header: string): string {
  return header
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Triggers download of an Excel file
 */
function downloadExcel(filename: string, workbook: XLSX.WorkBook): void {
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Exports yearly data as an Excel file with three separate sheets
 */
export function exportYearlyDataToExcel(data: YearlyData): void {
  const year = data.year;
  const workbook = XLSX.utils.book_new();

  // 1. Create Summary Sheet
  const summaryHeaders = ['year', 'total_submissions', 'overall_average_score', 'months_active'];
  const summaryData = [
    {
      [formatHeader('year')]: data.year,
      [formatHeader('total_submissions')]: data.summary.total_submissions,
      [formatHeader('overall_average_score')]: data.summary.overall_average_score,
      [formatHeader('months_active')]: data.summary.months_active,
    },
  ];

  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

  // 2. Create Monthly Breakdown Sheet
  const monthlyData = data.monthly_breakdown.map((month) => ({
    [formatHeader('year')]: month.year,
    [formatHeader('month')]: month.month,
    [formatHeader('score')]: month.score,
    [formatHeader('submissions')]: month.submissions,
  }));

  const monthlySheet = XLSX.utils.json_to_sheet(monthlyData);
  XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Monthly Breakdown');

  // 3. Create Submission Details Sheet
  const allSubmissionDetails: any[] = [];

  data.monthly_breakdown.forEach((month) => {
    if (month.submission_details && month.submission_details.length > 0) {
      month.submission_details.forEach((detail) => {
        // Create a copy without completed_at
        const { completed_at, ...detailWithoutCompletedAt } = detail;

        // Format all keys
        const formattedDetail: any = {
          [formatHeader('year')]: month.year,
          [formatHeader('month')]: month.month,
        };

        Object.keys(detailWithoutCompletedAt).forEach((key) => {
          formattedDetail[formatHeader(key)] = detailWithoutCompletedAt[key];
        });

        allSubmissionDetails.push(formattedDetail);
      });
    }
  });

  if (allSubmissionDetails.length > 0) {
    const detailsSheet = XLSX.utils.json_to_sheet(allSubmissionDetails);
    XLSX.utils.book_append_sheet(workbook, detailsSheet, 'Submission Details');
  } else {
    // Create empty sheet if no submission details
    const emptySheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, emptySheet, 'Submission Details');
  }

  // Download the Excel file
  downloadExcel(`yearly_data_${year}.xlsx`, workbook);
}

// Usage example:
// import { exportYearlyDataToExcel } from '@/utils/excelExport';
//
// const yearlyData = {
//   year: 2025,
//   summary: {
//     total_submissions: 2,
//     overall_average_score: 46,
//     months_active: 1
//   },
//   monthly_breakdown: [...]
// };
//
// exportYearlyDataToExcel(yearlyData);
