import type { ColumnDef } from "@tanstack/react-table";

import type { Payment } from "./payment-types";

import { Button } from "@/components/ui/button";

import { MoreHorizontal, Repeat } from "lucide-react";

import { Link } from "react-router-dom";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  header: "Actions",
  cell: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
        
            <MoreHorizontal className="h-4 w-4 text-zinc-900" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40 rounded-xl bg-zinc-900 border border-zinc-700 shadow-lg"
        >
          <DropdownMenuLabel className="text-xs text-zinc-400">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-700" />

          <DropdownMenuItem asChild className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800">
            <Link to="/follow-up">
             <Repeat className="h-4 w-4 text-green-500" />Follow Up</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
}
];
