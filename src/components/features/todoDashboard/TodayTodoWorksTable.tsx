import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../data-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { MoreHorizontal, Edit, Trash2, CheckCircle2 } from "lucide-react";

type TodoList = {
  sl: number;
  task: string;
  status: "Completed" | "Pending";
  date: string;
};

const todoData: TodoList[] = [
  {
    sl: 1,
    task: "Call Client A",
    status: "Pending",
    date: "2025-08-16",
  },
  {
    sl: 2,
    task: "Send Invoice for Project X",
    status: "Completed",
    date: "2025-08-16",
  },
  {
    sl: 3,
    task: "Team Meeting",
    status: "Pending",
    date: "2025-08-16",
  },
  {
    sl: 4,
    task: "Prepare Presentation",
    status: "Completed",
    date: "2025-08-16",
  },
  {
    sl: 5,
    task: "Follow Up with Supplier",
    status: "Pending",
    date: "2025-08-16",
  },
];

const columns: ColumnDef<TodoList>[] = [
  {
    accessorKey: "sl",
    header: () => <span className="capitalize">Sl</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("sl")}</span>
    ),
  },
  {
    accessorKey: "task",
    header: () => <span className="capitalize">Task</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("task")}</span>
    ),
  },
  {
    accessorKey: "date",
    header: () => <span className="capitalize">Date</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("date")}</span>
    ),
  },
 {
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.getValue("status") as TodoList["status"];

    return (
      <span className="inline-block px-3 py-1 text-base font-semibold text-zinc-800">
        {status}
      </span>
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
              onClick={() => alert(`Editing ${task.task}`)}
              className="flex items-center gap-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <Edit className="h-4 w-4 text-blue-400" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Deleting ${task.task}`)}
              className="flex items-center gap-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <Trash2 className="h-4 w-4 text-red-400" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Marking ${task.task} as done`)}
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

export default function TodayTodoWorksTable() {
  return (
    <DataTable columns={columns} data={todoData} enablePagination={true} />
  );
}
