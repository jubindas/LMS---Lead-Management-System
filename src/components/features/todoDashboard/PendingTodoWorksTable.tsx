
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

import { MoreHorizontal } from "lucide-react";

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
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <span className="text-black text-sm">{date.toLocaleDateString()}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TodoList["status"];
      const bgColor = status === "Completed" ? "bg-green-500" : "bg-yellow-500";
      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${bgColor} text-black shadow-sm`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4 text-zinc-900" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert(`Viewing: ${task.task}`)}>
              View Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Editing: ${task.task}`)}>
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Deleting: ${task.task}`)}
              className="text-red-500"
            >
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function PendingTodoWorksTable() {


  return (
    <div className="space-y-4">
     

      {/* Data Table */}
      <DataTable columns={columns} data={todoData} enablePagination={true} />
    </div>
  );
}
