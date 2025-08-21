import type { TrashData } from "../table-types/trash-bin-types";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TrashData>[] = [
  {
    accessorKey: "sl",
    header: "Sl",
  },
  {
    accessorKey: "lead_name",
    header: "Lead Name",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "follow_up_date",
    header: () => <span className="capitalize">Date</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">
        {row.getValue("follow_up_date")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TrashData["status"];
      return (
        <Badge
          className={`text-black text-xs ${
            status === "Completed" ? "bg-green-300" : "bg-red-300"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
 
];
