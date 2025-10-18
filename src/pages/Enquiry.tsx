import { useState } from "react";

import { DataTable } from "../components/data-table.tsx";

import { enquiryColumns } from "../table-columns/enquiry-columns.tsx";

import { Button } from "../components/ui/button.tsx";

import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getEnquiries } from "@/services/apiEnquiries.ts";

export default function Enquiries() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: enquiries, isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: getEnquiries,
  });

  if (isLoading) return <div>Loading...</div>;

  const sortedEnquiries = [...(enquiries || [])].sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  const filteredEnquiries = sortedEnquiries.filter(
    (enquiry) =>
      enquiry.id.toString().includes(searchTerm) ||
      enquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen w-full">
      <div className="max-w-7xl mx-auto mt-10 p-8 shadow-md rounded-2xl bg-zinc-50">
        <div className="flex justify-between items-center mb-6 border-b border-zinc-700/60 pb-4">
          <h2 className="text-3xl font-bold tracking-wide text-black">
            Enquiries
          </h2>
          <Link to="/add-enquiry">
            <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
              Add Enquiry
            </Button>
          </Link>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          {filteredEnquiries && (
            <DataTable
              data={filteredEnquiries || []}
              columns={enquiryColumns}
              enablePagination={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
