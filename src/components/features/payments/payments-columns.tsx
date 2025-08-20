import type { ColumnDef } from "@tanstack/react-table";

import type { Payment } from "./payment-types";

import { Button } from "@/components/ui/button";



import { MoreHorizontal } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => <span className="capitalize"> ID</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: () => <span className="capitalize">Name</span>,
    cell: ({ row }) => (
      <span className="text-black cursor-pointer hover:underline text-sm">
        {row.getValue("name")}
      </span>
    ),
  },

  {
    accessorKey: "amount",
    header: () => <span className="capitalize">Amount</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">
        ₹ {Number(row.getValue("amount")).toLocaleString()}
      </span>
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
            <MoreHorizontal className="h-4 w-4 text-black" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2 space-y-2 bg-zinc-800 text-white rounded-lg shadow-lg text-sm">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start bg-zinc-700 text-white text-sm hover:bg-zinc-600 gap-2"
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start bg-zinc-700 text-white text-sm hover:bg-zinc-600 gap-2"
          >
            Receipt
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="w-full justify-start text-white bg-red-600 hover:bg-red-500 gap-2"
          >
            Refund
          </Button>
        </PopoverContent>
      </Popover>
    ),
  },
];
