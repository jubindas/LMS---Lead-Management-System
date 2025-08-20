import type { TrashData } from "../table-types/trash-bin-types";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { MoreHorizontal, Edit, Trash2, CheckCircle2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-zinc-900" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 rounded-xl bg-zinc-100 border border-zinc-800 shadow-lg"
          >
            <DropdownMenuLabel className="text-xs text-zinc-900">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="flex items-center gap-2 text-sm text-zinc-900 hover:bg-zinc-900 rounded-lg px-2 py-1.5">
              <Edit className="h-4 w-4 text-blue-700" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-sm text-zinc-900 hover:bg-zinc-800 rounded-lg px-2 py-1.5">
              <Trash2 className="h-4 w-4 text-red-700" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-sm text-zinc-900 hover:bg-zinc-800 rounded-lg px-2 py-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-700" />
              Mark as Done
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
