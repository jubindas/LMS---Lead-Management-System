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

type PendingFollowUp = {
  sl: number;
  lead_name: string;
  contact: string;
  last_follow_up_date: string;
  next_follow_up_date: string;
  stage: string;
  status: "Pending" | "Completed";
};

const pending_follow_up_data: PendingFollowUp[] = [
  {
    sl: 1,
    lead_name: "John Doe",
    contact: "john@example.com",
    last_follow_up_date: "2025-08-14",
    next_follow_up_date: "2025-08-17",
    stage: "Cold",
    status: "Pending",
  },
  {
    sl: 2,
    lead_name: "Jane Smith",
    contact: "jane@example.com",
    last_follow_up_date: "2025-08-13",
    next_follow_up_date: "2025-08-17",
    stage: "Warm",
    status: "Pending",
  },
  {
    sl: 3,
    lead_name: "Alice Johnson",
    contact: "alice@example.com",
    last_follow_up_date: "2025-08-12",
    next_follow_up_date: "2025-08-18",
    stage: "Hot",
    status: "Pending",
  },
];

const columns: ColumnDef<PendingFollowUp>[] = [
  { accessorKey: "sl", header: "SL" },
  { accessorKey: "lead_name", header: "Lead Name" },
  { accessorKey: "contact", header: "Contact" },
  {
    accessorKey: "last_follow_up_date",
    header: () => <span className="capitalize">Last Follow-Up</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("last_follow_up_date")}</span>
    ),
  },
  {
    accessorKey: "next_follow_up_date",
    header: () => <span className="capitalize">Next Follow-Up</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("next_follow_up_date")}</span>
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
              className="h-8 w-8 p-0 rounded-full text-white hover:bg-zinc-700"
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
              onClick={() => {
                task.status =
                  task.status === "Completed" ? "Pending" : "Completed";
                console.log(
                  `${task.lead_name} follow-up is now ${task.status}`
                );
              }}
              className="flex items-center gap-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Mark as done
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function PendingFollowUpTable() {
  return (
    <DataTable
      columns={columns}
      data={pending_follow_up_data}
      enablePagination={true}
    />
  );
}
