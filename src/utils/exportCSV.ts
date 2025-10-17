export const exportToCSV = (data: any[], filename: string, headers?: string[]) => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from the first object if not provided
  const csvHeaders = headers || Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    csvHeaders.join(','), // Header row
    ...data.map((row) =>
      csvHeaders
        .map((header) => {
          let cell = row[header] || '';

          // Handle nested objects and arrays
          if (typeof cell === 'object') {
            cell = JSON.stringify(cell);
          }

          // Escape commas and quotes in cell content
          if (typeof cell === 'string') {
            cell = cell.replace(/"/g, '""'); // Escape quotes
            if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
              cell = `"${cell}"`;
            }
          }

          return cell;
        })
        .join(',')
    ),
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
