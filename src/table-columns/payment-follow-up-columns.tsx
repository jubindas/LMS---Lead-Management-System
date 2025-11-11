// import { Button } from "@/components/ui/button";

import type { ColumnDef } from "@tanstack/react-table";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import { MoreHorizontal } from "lucide-react";

// import ReminderPayment from "../components/ReminderPayment.tsx";

import type { Payment } from "../table-types/payment-follow-up-types.ts";

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "id", header: "ID" },

  { accessorKey: "total_amount", header: "Total Amount" },

  { accessorKey: "paid_amount", header: "Paid Amount" },

  {
    id: "remaining",
    header: "Remaining",
    cell: ({ row }) => {
      const total = row.original.total_amount || 0;
      const paid = row.original.paid_amount || 0;
      const remaining = total - paid;
      return <span className="text-zinc-800">{remaining}</span>;
    },
  },

  { accessorKey: "remarks", header: "Remark" },

  {
    accessorKey: "next_payment_date",
    header: "Next Payment Date",
    cell: ({ row }) => {
      const date = row.getValue("next_payment_date") as string;
      return (
        <span className="text-zinc-800">
          {date ? new Date(date).toLocaleDateString() : "-"}
        </span>
      );
    },
  },

  { accessorKey: "N/A", header: "Time" },
  // {
  //   id: "actions",
  //   header: () => <span className="capitalize">Actions</span>,
  //   cell: () => (
  //     <Popover>
  //       <PopoverTrigger asChild>
  //         <Button
  //           size="icon"
  //           variant="ghost"
  //           className="h-7 w-7 p-0 text-zinc-900"
  //         >
  //           <MoreHorizontal className="h-4 w-4" />
  //         </Button>
  //       </PopoverTrigger>
  //       <PopoverContent className="w-36 p-2 space-y-2 bg-zinc-800 text-white rounded-lg shadow-lg text-sm">
  //         <Button
  //           variant="ghost"
  //           size="sm"
  //           className="w-full justify-start bg-white/10 text-white hover:bg-white/20 gap-2"
  //         >
  //           <ReminderPayment />
  //         </Button>
  //       </PopoverContent>
  //     </Popover>
  //   ),
  // },
];
