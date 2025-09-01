import type { MainCategory } from "./main-requirements-types";

import type { ColumnDef } from "@tanstack/react-table";

import MainReqDropdown from "./MainReqDropdown";



export const columns: ColumnDef<MainCategory>[] = [
  {
    accessorKey: "id",
    header: () => <span className="capitalize">ID</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: () => <span className="capitalize">Name</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("name")}</span>
    ),
  },
   {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("description") || "N/A"}</span>
    ),
  },
{
  id: "actions",
  header: () => <span className="capitalize">Actions</span>,
  cell: ({row}) => (
    <MainReqDropdown id={row.original.id} />
  ),
},
];
