import type { Enquiry } from "../table-types/completed-enquiries-types";

import type { ColumnDef } from "@tanstack/react-table";

export const pendingEnquiry: ColumnDef<Enquiry>[] = [
  {
    accessorKey: "sl",
    header: "Sl",
    cell: ({ row }) => (
      <span className="text-text text-sm w-3 font-medium">
        {row.getValue("sl")}
      </span>
    ),
  },
  {
    accessorKey: "Name",
    header: "Name",
    cell: ({ row }) => (
      <span className="truncate block w-20 text-sm">
        {row.getValue("Name")}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="truncate block w-25 text-sm">
        {row.getValue("phone")}
      </span>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <span className="truncate block w-20 text-sm">
        {row.getValue("user")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="truncate block w-15 text-sm">
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <span className="truncate block w-10 text-sm">
        {row.getValue("budget")}
      </span>
    ),
  },
  {
    accessorKey: "businessType",
    header: "Business Type",
    cell: ({ row }) => (
      <span className="truncate block w-20 text-sm">
        {row.getValue("businessType")}
      </span>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <span className="truncate block w-25 text-sm">
        {row.getValue("source")}
      </span>
    ),
  },
];
