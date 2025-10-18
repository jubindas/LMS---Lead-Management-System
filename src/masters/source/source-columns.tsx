import type { Source } from "./source-types";

import type { ColumnDef } from "@tanstack/react-table";

import SourcesActionDropdown from "./SourcesActionDropdown";

export const columns: ColumnDef<Source>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-black font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Source Name",
    cell: ({ row }) => (
      <span className="text-black font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-black text-sm">
        {row.getValue("description") || "N/A"}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <span className="capitalize">Actions</span>,
    cell: ({ row }) => <SourcesActionDropdown rowData={row.original} />,
  },
];
