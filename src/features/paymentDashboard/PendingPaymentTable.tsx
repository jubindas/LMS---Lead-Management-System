import {paymentColumns} from "@/table-columns/pending-payments-dashboard-table.columns";

import { DataTable } from "@/components/data-table";

import { getPaymentsFollowUpDashboard } from "@/services/apiDashboardPaymentFollowup";

import { useQuery } from "@tanstack/react-query";


export default function PendingPaymentTable() {
  const { data: payment_data, isLoading } = useQuery({
    queryKey: ["paymentFollowUp"],
    queryFn: getPaymentsFollowUpDashboard,
  });

  console.log("Payment Data:", payment_data);

  if (isLoading) return <div>Loading...</div>;

  return payment_data ? (
    <DataTable columns={paymentColumns} data={payment_data} enablePagination={true} />
  ) : (
    <div>No payments found.</div>
  );
}
