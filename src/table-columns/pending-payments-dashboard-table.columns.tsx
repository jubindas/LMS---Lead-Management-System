import type { ColumnDef } from "@tanstack/react-table";
import type { Payment } from "@/table-types/pending-payments-dashboard-table-types";

import DashboardPendingPaymentDropdown from "@/table-columns/DashboardPendingPaymentDropdown";

export const paymentColumns: ColumnDef<Payment>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "name",
    header: "Lead Name",
    cell: ({ row }) => (
      <span className="text-black">{row.original.payment.name}</span>
    ),
  },
  { accessorKey: "total_amount", header: "Total Amount" },
  {
    accessorKey: "next_payment_date",
    header: "Next Payment Date",
    cell: ({ row }) => {
      const date = new Date(row.original.next_payment_date);
      return <span className="text-black">{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => < DashboardPendingPaymentDropdown payment={row.original} />,
  },
];
