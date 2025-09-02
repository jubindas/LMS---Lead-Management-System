import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, CheckCircle2 } from "lucide-react";

import type {TodoList } from "@/table-types/todo-dashboard-today-types";


export const todoColumns: ColumnDef<TodoList>[] = [
  {
    accessorKey: "id",
    header: () => <span className="capitalize">Id</span>,
    cell: ({ row }) => <span className="text-black text-sm">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: () => <span className="capitalize">Name</span>,
    cell: ({ row }) => <span className="text-black text-sm">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "content",
    header: () => <span className="capitalize">Content</span>,
    cell: ({ row }) => <span className="text-black text-sm">{row.getValue("content")}</span>,
  },
 
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-zinc-800 rounded-full">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-zinc-900" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg"
          >
            <DropdownMenuLabel className="text-xs text-zinc-400">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem
              className="flex items-center gap-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <Edit className="h-4 w-4 text-blue-400" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg px-2 py-1.5"
            >
              <Trash2 className="h-4 w-4 text-red-400" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
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
