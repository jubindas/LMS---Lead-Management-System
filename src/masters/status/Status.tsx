import { DataTable } from "@/components/data-table";

import EnquiryStatus from "@/components/EnquieyStatus";

import { columns } from "./status-columns";

import type { StatusType } from "./status-types";

import { useQuery } from "@tanstack/react-query";

import { getStatus } from "@/services/apiStatus";

export default function Status() {
  
  const { data, isLoading, isError } = useQuery<StatusType[]>({
    queryKey: ["statusTypes"],
    queryFn: getStatus,
  });

  console.log("Fetched statuses:", data);

  return (
    <div className="p-8 min-h-screen w-full">
      <div className="max-w-7xl mx-auto mt-10 p-8 shadow-md rounded-2xl bg-zinc-50">
        <div className="flex flex-wrap justify-between items-center mb-4 border-b border-zinc-700/60 pb-2">
          <h2 className="text-xl font-bold tracking-wide text-black">
            Status Type
          </h2>
          <EnquiryStatus />
        </div>

        <div className="flex flex-wrap justify-between items-center mb-3 gap-3 text-sm">
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

          <div className="flex items-center gap-2 text-black text-xs">
            <span className="text-black">Search:</span>
            <input
              type="text"
              placeholder="Type to search..."
              className="border border-zinc-400 rounded-lg px-2 py-1 bg-zinc-400 placeholder-zinc-900  focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm transition-all"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="text-center py-4">Loading data...</div>
        ) : isError ? (
          <div className="text-center text-red-500 py-4">
            Failed to load data.
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={data || []}
            enablePagination={true}
          />
        )}
      </div>
    </div>
  );
}
