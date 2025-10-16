import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "@/services/apiPayments";
import { paymentColumns } from "@/table-columns/pending-payments-dashboard-table-columns";

export default function PendingPaymentTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  console.log("Payments data:", data);

  if (isLoading) {
    return <div>Loading payments...</div>;
  }

  if (error) {
    return <div>Error loading payments. Please try again.</div>;
  }

  // Ensure data is an array before passing to DataTable
  const tableData = Array.isArray(data) ? data : [];

  return tableData.length > 0 ? (
    <DataTable columns={paymentColumns} data={tableData} enablePagination={true} />
  ) : (
    <div>No payments found.</div>
  );
}
