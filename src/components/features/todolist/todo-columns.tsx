import type { ColumnDef } from "@tanstack/react-table";
import type { Todo } from "./todo-data";

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

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "task",
    header: "Task",
    cell: ({ row }) => (
      <span className={row.original.completed ? "line-through text-zinc-500" : ""}>
        {row.getValue("task")}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Due Date",
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
              className="h-8 w-8 p-0 "
            >
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
            <DropdownMenuItem
              onClick={() => alert(`Editing "${task.task}"`)}
              className="flex items-center gap-2 text-sm text-zinc-900 hover:bg-zinc-900 rounded-lg px-2 py-1.5"
            >
              <Edit className="h-4 w-4 text-blue-700" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Deleting "${task.task}"`)}
              className="flex items-center gap-2 text-sm text-zinc-900 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <Trash2 className="h-4 w-4 text-red-700" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Marking "${task.task}" as done`)}
              className="flex items-center gap-2 text-sm text-zinc-900 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <CheckCircle2 className="h-4 w-4 text-green-700" />
              Mark as Done
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
