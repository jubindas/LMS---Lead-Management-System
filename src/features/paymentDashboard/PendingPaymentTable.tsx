/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "@/services/apiPayments";
import { paymentColumns } from "@/table-columns/pending-payments-dashboard-table-columns";
import Loading from "@/components/Loading";

export default function PendingPaymentTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading payments. Please try again.</div>;

  const payments = Array.isArray(data) ? data : [];

  const today = new Date().toISOString().split("T")[0];

  const todaysPayments = payments.filter((payment: any) => {
    if (!payment.created_at) return false;
    const createdDate = payment.created_at.split("T")[0];
    return createdDate === today;
  });

  console.log("the dahsboard", todaysPayments)

  return (
    <>
      {todaysPayments.length > 0 ? (
        <DataTable
          columns={paymentColumns}
          data={todaysPayments}
          enablePagination={true}
        />
      ) : (
        <div>No payments found for today.</div>
      )}
    </>
  );
}
