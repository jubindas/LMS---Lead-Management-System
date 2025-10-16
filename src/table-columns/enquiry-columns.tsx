import type { Enquiry } from "../table-types/enquiry-types";
import type { ColumnDef } from "@tanstack/react-table";
import EnquiryActionDropdown from "./EnquiryActionDropdown";

export const enquiryColumns: ColumnDef<Enquiry>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-text text-sm w-2 font-medium">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "company_name",
    header: "Name",
    cell: ({ row }) => (
      <span className="truncate block w-15 text-sm">
        {row.getValue("company_name")}
      </span>
    ),
  },
  {
    accessorKey: "primary_phone_number",
    header: "Phone",
    cell: ({ row }) => (
      <span className="truncate block w-15 text-sm">
        {row.getValue("primary_phone_number")}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="truncate block w-15 text-sm">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="truncate block w-13 text-sm">{row.getValue("status")}</span>
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => (
      <span className="truncate block w-13 text-sm">{row.getValue("stage")}</span>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <span className="truncate block w-9 text-sm">{row.getValue("budget")}</span>
    ),
  },
  {
    accessorKey: "business_type",
    header: "Business Type",
    cell: ({ row }) => (
      <span className="truncate block w-20 text-sm">{row.getValue("business_type")}</span>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <span className="truncate block w-25 text-sm">{row.getValue("source")}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <EnquiryActionDropdown id={row.original.id} />,
  },
];
