
import type { ColumnDef } from "@tanstack/react-table";

import DashboardPendingPaymentDropdown from "./DashboardPendingPaymentDropdown";

import type { Payment } from "@/table-types/pending-payments-dashboard-table-types";

export const paymentColumns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <span>{row.original.name || "N/A"}</span>,
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => <span>₹{row.original.total_amount}</span>,
  },
  {
    header: "Remarks",
    accessorKey: "remarks",
    cell: ({ row }) => <span>{row.original.remarks || "N/A"}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (  <DashboardPendingPaymentDropdown payment={row.original} />

    ),
  },
];
