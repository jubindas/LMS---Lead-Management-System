import type { MainCategory } from "./main-requirements-types";

import type { ColumnDef } from "@tanstack/react-table";

import { FiEdit } from "react-icons/fi";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export const columns: ColumnDef<MainCategory>[] = [
  {
    accessorKey: "sl",
    header: () => <span className="capitalize">Sl</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("sl")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: () => <span className="capitalize">Name</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("name")}</span>
    ),
  },
   {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("description")}</span>
    ),
  },
{
  id: "actions",
  header: () => <span className="capitalize">Actions</span>,
  cell: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 p-0 text-white"
        >
          <MoreHorizontal className="h-4 w-4 text-zinc-900" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36 p-2 space-y-2 bg-zinc-800 text-white rounded-lg shadow-lg text-sm">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start bg-white/10 text-white text-sm hover:bg-white/20 gap-2"
          onClick={() => alert("Edit button clicked!")}
        >
          <FiEdit className="mr-1.5" /> Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="w-full justify-start text-white bg-red-600 hover:bg-red-500 gap-2"
          onClick={() => alert("Delete button clicked!")}
        >
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  ),
},
];
