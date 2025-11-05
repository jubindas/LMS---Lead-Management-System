import type { ColumnDef } from "@tanstack/react-table";
import type { Payment } from "../table-types/payment-types";
import PaymentActionDropdown from "./PaymentActionDropdown";

export const createColumns = (onEdit: (payment: Payment) => void): ColumnDef<Payment>[] => [
  {
    accessorKey: "id",
    header: () => <span className="capitalize">ID</span>,
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
    accessorKey: "remarks",
    header: () => <span className="capitalize">Remarks</span>,
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("remarks") || "N/A"}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <PaymentActionDropdown
          id={payment.id}
          name={payment.name}
          amount={payment.amount}
          onEdit={() => onEdit(payment)} 
        />
      );
    },
  },
];