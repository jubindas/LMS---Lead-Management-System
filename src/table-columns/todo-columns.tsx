import type { ColumnDef } from "@tanstack/react-table";
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

export type Todo = {
  id: number;
  name: string;
  content?: string;
  is_complete: boolean;
};

export const columns: ColumnDef<Todo>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Task Name" },
  { accessorKey: "content", header: "Content" },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-zinc-900" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40 rounded-xl bg-zinc-900 border border-zinc-700 shadow-lg">
          <DropdownMenuLabel className="text-xs text-zinc-400">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-700" />

          <DropdownMenuItem onClick={() => alert("Edit clicked")} className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800">
            <Edit className="h-4 w-4 text-blue-500" /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => alert("Delete clicked")} className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800">
            <Trash2 className="h-4 w-4 text-red-500" /> Delete
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => alert("Marked as done!")} className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800">
            <CheckCircle2 className="h-4 w-4 text-green-500" /> Mark as Done
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
