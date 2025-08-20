import { DataTable } from "../../data-table";

import { enquiryColumns } from "./enquiry-columns";

import AddEnquiryDialog from "../../EnquiryDialog.tsx";

import EnquiryBussines from "@/components/EnquiryBussines.tsx";

import EnquiryStatus from "@/components/EnquieyStatus";

import MainRequirementsForm from "@/components/MainRequirementsForm";

import { enquiryData } from "./enquiry-data.ts";

import EnquirySource from "@/components/EnquirySource.tsx";

import SubRequirementForm from "../../SubRequirementForm.tsx";

import EnquiryLocation from "@/components/EnquiryLocation.tsx";
export default function Enquiries() {
  return (
    <div className="p-8 min-h-screen w-full ">
    <div className="max-w-7xl mx-auto mt-10 p-8 shadow-md rounded-2xl bg-zinc-50">
        {/* Title + Buttons */}
        <div className="flex justify-between items-center  mb-6 border-b border-zinc-700/60 pb-4">
          <h2 className="text-3xl font-bold tracking-wide text-black">
            Enquiries
          </h2>
          <div className="flex items-center gap-3 flex-wrap overflow-x-auto">
            <AddEnquiryDialog />
            <EnquiryBussines />
            <EnquiryStatus />
            <MainRequirementsForm />
            <SubRequirementForm />
            <EnquirySource />
            <EnquiryLocation />
          </div>
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

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={enquiryColumns}
            data={enquiryData}
            enablePagination={true}
          />
        </div>
      </div>
    </div>
  );
}

