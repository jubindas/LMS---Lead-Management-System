import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
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

type FollowUp = {
  sl: number;
  lead_name: string;
  contact: string;
  follow_up_date: string;
  stage: string;
  status: "Pending" | "Completed";
};

const follow_up_data: FollowUp[] = [
  {
    sl: 1,
    lead_name: "John Doe",
    contact: "john@example.com",
    follow_up_date: "2025-08-17",
    stage: "Cold",
    status: "Pending",
  },
  {
    sl: 2,
    lead_name: "Jane Smith",
    contact: "jane@example.com",
    follow_up_date: "2025-08-17",
    stage: "Warm",
    status: "Completed",
  },
  {
    sl: 3,
    lead_name: "Alice Johnson",
    contact: "alice@example.com",
    follow_up_date: "2025-08-18",
    stage: "Hot",
    status: "Pending",
  },
];

const columns: ColumnDef<FollowUp>[] = [
  { accessorKey: "sl", header: "Sl" },
  { accessorKey: "lead_name", header: "Lead Name" },
  { accessorKey: "contact", header: "Contact" },
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
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.getValue("stage") as string;
      const stageColors: Record<string, string> = {
        Cold: "bg-blue-200 text-blue-800",
        Warm: "bg-yellow-200 text-yellow-800",
        Hot: "bg-red-200 text-red-800",
      };
      const stageClass = stageColors[stage] || "bg-gray-200 text-gray-800";

      return (
        <Badge className={`text-xs px-2 py-1 rounded-md ${stageClass}`}>
          {stage}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <span className="text-black text-sm">{row.getValue("status")}</span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-zinc-800 rounded-full"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-zinc-900" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg"
          >
            <DropdownMenuLabel className="text-xs text-zinc-400">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem
              onClick={() => alert(`Editing ${task.lead_name}`)}
              className="flex items-center gap-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <Edit className="h-4 w-4 text-blue-400" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Deleting ${task.lead_name}`)}
              className="flex items-center gap-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <Trash2 className="h-4 w-4 text-red-400" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Marking ${task.lead_name} as done`)}
              className="flex items-center gap-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Mark as Done
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function FollowUpTable() {
  return (
    <DataTable
      columns={columns}
      data={follow_up_data}
      enablePagination={true}
    />
  );
}
