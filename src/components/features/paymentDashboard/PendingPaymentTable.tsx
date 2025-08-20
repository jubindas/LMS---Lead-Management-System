import { DataTable } from "@/components/data-table";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { MoreHorizontal, CheckCircle2, PlusCircle } from "lucide-react";

import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Payment = {
  id: number;
  lead_name: string;
  total_amount: number;
  paid_amount: number;
  due_date: string;
};

const payment_data: Payment[] = [
  { id: 1, lead_name: "John Doe", total_amount: 1000, paid_amount: 500, due_date: "2025-08-20" },
  { id: 2, lead_name: "Jane Doe", total_amount: 2000, paid_amount: 2000, due_date: "2025-08-18" },
];

const columns: ColumnDef<Payment>[] = [
  { accessorKey: "lead_name", header: "Lead Name" },
  { accessorKey: "total_amount", header: "Total Amount" },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("due_date"));
      return <span className="text-black">{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const payment = row.original;
      const status = payment.paid_amount >= payment.total_amount ? "Completed" : "Pending";
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            status === "Completed" ? "bg-green-400 text-black" : "bg-red-400 text-black"
          }`}
        >
          {status}
        </span>
      );
    },
  },
 {
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const payment = row.original;
    const remaining = payment.total_amount - payment.paid_amount;

    if (remaining <= 0) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4 text-zinc-900" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-zinc-900 text-white rounded-xl shadow-lg">
          <DropdownMenuLabel className="text-xs text-zinc-400">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-800" />

          {/* Add Follow Up (red) */}
          <DropdownMenuItem asChild>
            <Link to="/payment-follow-up" className="flex items-center w-full gap-2 text-red-400">
              <PlusCircle className="h-4 w-4" />
              Add Follow Up
            </Link>
          </DropdownMenuItem>

          {/* Mark as Done (green) */}
          <DropdownMenuItem
            onClick={() => {
              payment.paid_amount = payment.total_amount;
              console.log(`${payment.lead_name} payment marked as done`);
            }}
            className="flex items-center gap-2 text-green-400"
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark as Done
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
},

];

export default function PendingPaymentTable() {
  return <DataTable columns={columns} data={payment_data} enablePagination={true} />;
}
