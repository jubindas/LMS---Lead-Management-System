import type { BusinessType } from "./business-types";

import type { ColumnDef } from "@tanstack/react-table";

import BusinessActionDropdown from "./BusinessActionDropdown";

export const columns: ColumnDef<BusinessType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-black font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Business Name",
    cell: ({ row }) => (
      <span className="text-black font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-black text-sm">
        {(row.getValue("description") as string) || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: ({ row }) => {
      const createdDate = row.getValue("created_at") as string;
      const formattedDate = createdDate
        ? new Date(createdDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A";
      return <span className="text-black text-sm">{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    header: () => <span className="capitalize">Actions</span>,
    cell: ({ row }) => <BusinessActionDropdown id={row.original.id} rowData={row.original} />,
  },
];
