import type { ColumnDef } from "@tanstack/react-table";
import { FiEdit } from "react-icons/fi";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import type { StatusType } from "./status-types";

export const columns: ColumnDef<StatusType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-black font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="text-black font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-black text-sm">
        {(row.getValue("description") as string) || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: ({ row }) => {
      const createdDate = row.getValue("created_at") as string;
      const formattedDate = createdDate
        ? new Date(createdDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A";
      return <span className="text-black text-sm">{formattedDate}</span>;
    },
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
          {/* Edit Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start bg-white/10 text-white text-sm hover:bg-white/20 gap-2"
            onClick={() => alert("Edit button clicked!")}
          >
            <FiEdit className="mr-1.5" /> Edit
          </Button>

          {/* Disable Button */}
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
