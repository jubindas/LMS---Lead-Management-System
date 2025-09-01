import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/data-table";

import type { EnquiryFollowUp } from "../table-types/enquiry-follow-up-types";

import { columns } from "../table-columns/enquiry-follow-up-columns";

import EnquiryFollowUpForm from "../components/EnquiryFollowUpForm";

import { getFollowUpsByEnquiryId } from "@/services/apiFollowUp";

export default function EnquiryFollowUp() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<EnquiryFollowUp[]>({
    queryKey: ["follow-ups", id],
    queryFn: () => getFollowUpsByEnquiryId(id!),
    enabled: !!id,
  });

  const filteredData = data?.filter(item => item.enquiry_id === Number(id)) || [];

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading follow-ups...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load follow-ups.</p>;
  }

  return (
    <div className="p-8 min-h-screen w-full">
      <div className="max-w-7xl mx-auto mt-10 p-8 shadow-md rounded-2xl bg-zinc-50">
        <div className="flex flex-wrap justify-between items-center mb-4 border-b border-zinc-700/60 pb-2">
          <h2 className="text-xl font-bold tracking-wide text-zinc-800">
            Enquiry Follow-Up
          </h2>
          <EnquiryFollowUpForm enquiryId={id!} />
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
              className="border border-zinc-400 rounded-lg px-2 py-1 bg-zinc-400 placeholder-zinc-900 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm transition-all"
            />
          </div>
        </div>

        <DataTable columns={columns} data={filteredData} enablePagination />
      </div>
    </div>
  );
}
