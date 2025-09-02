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

import type { Payment } from "@/table-types/pending-payments-dashboard-table-types";

type PaymentActionCellProps = {
  payment: Payment;
};

export default function DashboardPendingPaymentDropdown({ payment }: PaymentActionCellProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4 text-zinc-900" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-zinc-900 text-white rounded-xl shadow-lg"
      >
        <DropdownMenuLabel className="text-xs text-zinc-400">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />

        <DropdownMenuItem asChild>
          <Link
            to={`/payment-follow-up-dashboard/${payment.id}`}
            className="flex items-center w-full gap-2 text-red-400"
          >
            <PlusCircle className="h-4 w-4" />
            Add Follow Up
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log(`${payment.name ?? "Payment"} marked as done`);
          }}
          className="flex items-center gap-2 text-green-400"
        >
          <CheckCircle2 className="h-4 w-4" />
          Mark as Done
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

