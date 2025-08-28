import type { ColumnDef } from "@tanstack/react-table";

import type { EnquiryFollowUp } from "../table-types/enquiry-follow-up-types";

import { Button } from "@/components/ui/button";


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MoreHorizontal } from "lucide-react";

import EnquiryReminder from "@/components/EnquiryReminder.tsx";


export const columns: ColumnDef<EnquiryFollowUp>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-black font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "lastRemark",
    header: "Last Remark",
    cell: ({ row }) => (
      <span className="text-zinc-800">
        {row.getValue("lastRemark") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "nextFollowUpDate",
    header: "Next Follow-Up",
    cell: ({ row }) => {
      const date = row.getValue("nextFollowUpDate") as string;
      return (
        <span className="text-zinc-800">
          {date ? new Date(date).toLocaleDateString() : "-"}
        </span>
      );
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
            className="h-7 w-7 p-0 text-zinc-900"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2 space-y-2 bg-zinc-800 text-white rounded-lg shadow-lg text-sm">
          <Button
            variant="ghost"
            size="sm"
            className="w-35 justify-start bg-white/10 text-white hover:bg-white/20 gap-2"
          >
            <EnquiryReminder />
          </Button>
        </PopoverContent>
      </Popover>
    ),
  },
];
