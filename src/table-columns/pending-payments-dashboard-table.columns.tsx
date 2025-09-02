import type { ColumnDef } from "@tanstack/react-table";
import DashboardPendingPaymentDropdown from "./DashboardPendingPaymentDropdown";

export type Payment = {
  id: string;
  name?: string;
  amount: number;
  remarks: string;
  total_amount?: number;
  paid_amount?: number;
};

export const paymentColumns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    header: " Name",
    accessorKey: "name",
    cell: ({ row }) => <span>{row.original.name || "N/A"}</span>,
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => <span>₹{row.original.amount}</span>,
  },
 
  {
    header: "Remarks",
    accessorKey: "remarks",
    cell: ({ row }) => <span>{row.original.remarks || "N/A"}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DashboardPendingPaymentDropdown payment={row.original} />,
  },
];
