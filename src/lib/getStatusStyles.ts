export const getAssessmentStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "submitted":
      return "bg-[#EBFFFC] text-[#117D70]";
    case "being processed":
      return "bg-[#FFF6D3] text-[#5E5B5B]";
    case "completed":
      return "bg-[#EBFBFF] text-[#227C9D]";
    case "rejected":
      return "bg-[#FFEBEB] text-[#850C0C]";
    case "approved":
      return "bg-[#EBFFFC] text-[#117D70]";
    case "not started":
      return "bg-[#FFEBEB] text-[#850C0C]";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getApplicationStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "not paid":
      return "bg-[#FFEBEB] text-[#D63A3A]";
    case "paid":
      return "bg-[#EBFBFF] text-[#227C9D]";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
