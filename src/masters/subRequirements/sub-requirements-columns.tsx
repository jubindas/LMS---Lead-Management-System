
import type { ColumnDef } from "@tanstack/react-table";



import type {SubCategory } from "./sub-requirements-types"

import StatusActionDropdown from "./StatusActionDropdown";



export const columns: ColumnDef<SubCategory>[] = [
  {
    accessorKey: "id",
    header: () => <span className="capitalize">ID</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: () => <span className="capitalize">Sub Category</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "mainCategory",
    header: () => <span className="capitalize">Main Category</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("mainCategory")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-black text-sm">
        {row.getValue("description")}
      </span>
    ),
  },
 {
  id: "actions",
  header: () => <span className="capitalize">Actions</span>,
  cell: ({ row }) => <StatusActionDropdown id={row.original.id} />
},
];