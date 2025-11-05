import { DataTable } from "@/components/data-table";

import { columns } from "../table-columns/payment-follow-up-columns";

import FollowUpPaymentReminder from "../components/FollowUpPaymentReminder.tsx";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getFollowupsByPaymentId } from "@/services/apiPaymentsFollowup.ts";

import Loading from "@/components/Loading.tsx";

export default function PaymentFollowUp() {
  const { id } = useParams<{ id: string }>();

  const {
    data: followUps,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["followUps", id],
    queryFn: () => getFollowupsByPaymentId(id as string),
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading follow-ups</div>;

  console.log("Follow-ups data:", followUps);

  const sortedData = Array.isArray(followUps)
    ? [...followUps].sort((a, b) => b.id - a.id)
    : [];

  return (
    <div className="p-4 md:p-8 min-h-screen w-full">
      <div className="max-w-7xl mx-auto mt-6 md:mt-10 p-4 md:p-8 shadow-md rounded-2xl bg-zinc-50">
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-start md:items-center mb-4 border-b border-zinc-700/60 pb-2 gap-3">
          <h2 className="text-lg md:text-xl font-bold tracking-wide text-zinc-800">
            Payment Follow-Up
          </h2>
          <FollowUpPaymentReminder paymentId={id} />
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center mb-3 gap-3 text-sm">
          <div className="flex items-center gap-2 text-black text-xs">
            <span>Show</span>
            <select className="rounded-lg px-2 py-1 bg-zinc-400 text-zinc-100 border border-zinc-400">
              {[10, 25, 50].map((size) => (
                <option
                  key={size}
                  value={size}
                  className="bg-zinc-700 text-white text-sm"
                >
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 text-black text-xs w-full sm:w-auto">
            <span className="text-black">Search:</span>
            <input
              type="text"
              placeholder="Type to search..."
              className="flex-1 sm:flex-none border border-zinc-400 rounded-lg px-2 py-1 bg-zinc-400 placeholder-zinc-900 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm transition-all"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          {sortedData && (
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
