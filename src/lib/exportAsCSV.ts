/**
 * Converts an array of objects to CSV format and triggers a download
 * @param data - Array of objects to export
 * @param filename - Name of the CSV file (without extension)
 * @param columns - Optional array of column configurations. If not provided, all keys from the first object will be used
 */
export function exportAsCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns?: {
    key: keyof T;
    header: string;
  }[]
) {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // If columns not provided, use all keys from first object
  const cols = columns || Object.keys(data[0]).map(key => ({
    key: key as keyof T,
    header: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
  }));

  // Create CSV header
  const headers = cols.map(col => col.header).join(',');

  // Create CSV rows
  const rows = data.map(item => {
    return cols.map(col => {
      const value = item[col.key];
      // Handle values that might contain commas, quotes, or newlines
      if (value === null || value === undefined) {
        return '';
      }
      const stringValue = String(value);
      // Escape quotes and wrap in quotes if necessary
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(',');
  });

  // Combine headers and rows
  const csv = [headers, ...rows].join('\n');

  // Create blob and trigger download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  URL.revokeObjectURL(url);
}
