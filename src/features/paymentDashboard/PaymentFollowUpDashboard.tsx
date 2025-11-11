import { DataTable } from "@/components/data-table";

import { columns } from "@/table-columns/payment-follow-up-columns";

import FollowUpPaymentReminder from "@/components/FollowUpPaymentReminder.tsx";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getFollowupsByPaymentId } from "@/services/apiPaymentsFollowup.ts";

export default function PaymentFollowUpDashboard() {
  const { id } = useParams<{ id: string }>();

  const {
    data: followUps,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["followUps", id],
    queryFn: () => getFollowupsByPaymentId(id as string),
  });

  const sortedData = Array.isArray(followUps)
    ? [...followUps].sort((a, b) => a.id - b.id)
    : [];

    console.log("the sorted datas are ", sortedData)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading follow-ups</div>;

  return (
    <div className="p-4 md:p-8 min-h-screen w-full">
      <div className="max-w-7xl mx-auto mt-6 md:mt-10 p-4 md:p-8 shadow-md rounded-2xl bg-zinc-50">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 border-b pb-2 gap-3">
          <h2 className="text-lg md:text-xl font-bold text-zinc-800">
            Payment Follow-Up
          </h2>
          <FollowUpPaymentReminder paymentId={id} />
        </div>

        <div className="w-full overflow-x-auto">
          {sortedData.length > 0 && (
            <DataTable
              columns={columns}
              data={sortedData}
              enablePagination={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
