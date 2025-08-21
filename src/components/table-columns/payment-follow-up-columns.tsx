import { Button } from "@/components/ui/button";

import type { ColumnDef } from "@tanstack/react-table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MoreHorizontal } from "lucide-react";

import ReminderPayment from "../ReminderPayment.tsx"



import type { Payment } from "../table-types/payment-follow-up-types";


export const columns: ColumnDef<Payment>[] = [
    { accessorKey: "leadName", header: "Lead Name" },
    { accessorKey: "totalAmount", header: "Total Amount" },
    { accessorKey: "paidAmount", header: "Paid Amount" },
    {
      id: "remaining",
      header: "Remaining",
      cell: ({ row }) => (
        <span className="text-zinc-800">
          {(row.original.totalAmount || 0) - (row.original.paidAmount || 0)}
        </span>
      ),
    },
    { accessorKey: "reason", header: "Remark" },
    {
      accessorKey: "nextPaymentDate",
      header: "Next Payment Date",
      cell: ({ row }) => {
        const date = row.getValue("nextPaymentDate") as string;
        return (
          <span className="text-zinc-800">
            {date ? new Date(date).toLocaleDateString() : "-"}
          </span>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const payment = row.original;
        const completed = payment.paidAmount === payment.totalAmount;
        return (
          <span
            className={`px-2 py-1 rounded text-xs ${
              completed
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {completed ? "Completed" : "Pending"}
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
          <PopoverContent className="w-36 p-2 space-y-2 bg-zinc-800 text-white rounded-lg shadow-lg text-sm">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start bg-white/10 text-white hover:bg-white/20 gap-2"
             
            >
              <ReminderPayment />
            </Button>
          </PopoverContent>
        </Popover>
      ),
    },
  ];