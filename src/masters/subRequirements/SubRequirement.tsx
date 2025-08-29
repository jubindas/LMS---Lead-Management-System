import { DataTable } from "@/components/data-table";

import { columns } from "./sub-requirements-columns.tsx";

import SubRequirementForm from "../../components/SubRequirementForm.tsx";

import { getSubCategories } from "@/services/apiSubCategories.ts";

import { getMainCategories } from "@/services/apiMainCategories.ts";

import { useQuery } from "@tanstack/react-query";

export default function SubRequirement() {
  const { data: subCategoriesData } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: getSubCategories,
  });

  const { data: mainCategoriesData } = useQuery({
    queryKey: ["mainCategories"],
    queryFn: getMainCategories,
  });

  console.log("Sub Categories Data:", subCategoriesData);
  console.log("Main Categories Data:", mainCategoriesData);

  const mappedData =
    subCategoriesData?.map(
      (sub: { id: number; name: string; main_category_id: number }) => ({
        ...sub,
        mainCategory:
          mainCategoriesData?.find(
            (main: { id: number; name: string }) =>
              main.id === sub.main_category_id
          )?.name || "N/A",
      })
    ) || [];

  console.log("Mapped Data:", mappedData);

  return (
    <div className="p-8 min-h-screen w-full  ">
      <div className="max-w-7xl mx-auto mt-10 p-8 shadow-md rounded-2xl bg-zinc-50">
        <div className="flex flex-wrap justify-between items-center mb-4 border-b border-zinc-700/60 pb-2">
          <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r text-black">
            Sub Categories
          </h2>
          <SubRequirementForm />
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

        {mappedData && (
          <DataTable
            columns={columns}
            data={mappedData}
            enablePagination={true}
          />
        )}
      </div>
    </div>
  );
}
