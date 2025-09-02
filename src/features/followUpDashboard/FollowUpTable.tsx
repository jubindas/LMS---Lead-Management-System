import { DataTable } from "@/components/data-table";

import { columns } from "../../table-columns/dashboard-follow-up-table-columns";

import { getEnquiries } from "@/services/apiEnquiries";

import { useQuery } from "@tanstack/react-query";

export default function FollowUpTable() {
  const { data: enquiries } = useQuery({
    queryKey: ["enquiries"],
    queryFn: getEnquiries,
  });

  console.log("Enquiries Data:", enquiries);

  const today = new Date().toISOString().split("T")[0];

  const todaysEnquiries = enquiries?.filter((enquiry) => {
    if (!enquiry?.created_at) return false; 
    const createdDate = new Date(enquiry.created_at).toISOString().split("T")[0];
    return createdDate === today;
  }) || [];

  return (
    <DataTable
      columns={columns}
      data={todaysEnquiries}
      enablePagination={true}
    />
  );
}
