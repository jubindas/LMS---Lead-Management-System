import { DataTable } from "@/components/data-table";

import { pendingColumns } from "../../table-columns/pending-dashboard-followup-table-columns";

import { getEnquiries } from "@/services/apiEnquiries";

import { useQuery } from "@tanstack/react-query";

export default function PendingFollowUpTable() {
  const { data: enquiries } = useQuery({
    queryKey: ["enquiries"],
    queryFn: getEnquiries,
  });

  console.log("Enquiries Data:", enquiries);

  const formatDate = ( date : any) =>
    date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); 

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayStr = formatDate(today);


  const pendingEnquiries =
  enquiries?.filter((enquiry: any) => {
    if (!enquiry?.created_at) return false;
    const createdDate = formatDate(new Date(enquiry.created_at));
    return createdDate !== todayStr;
  }) || [];



  return (
    <DataTable
      columns={pendingColumns}
      data={pendingEnquiries}
      enablePagination={true}
    />
  );
}
