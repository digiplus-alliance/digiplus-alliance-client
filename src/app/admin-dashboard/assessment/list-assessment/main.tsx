import AssessmentListTable from "./widgets/assessment-list-table";

interface ListAssessmentProps {
  searchQuery?: string;
}

export default function ListAssessment({ searchQuery = "" }: ListAssessmentProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <AssessmentListTable searchQuery={searchQuery} />
    </div>
  );
}
