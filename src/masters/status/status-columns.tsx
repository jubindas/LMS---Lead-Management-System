import type { ColumnDef } from "@tanstack/react-table";

import StatusActionsDropdown from "./StatusActionsDropdown";

import type { StatusType } from "./status-types";

export const columns: ColumnDef<StatusType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-black font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="text-black font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: ({ row }) => {
      const createdDate = row.getValue("created_at") as string;
      const formattedDate = createdDate
        ? new Date(createdDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A";
      return <span className="text-black text-sm">{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    header: () => <span className="capitalize">Actions</span>,
    cell: ({ row }) => (
      <StatusActionsDropdown id={row.original.id} rowData={row.original} />
    ),
  },
];
