import type { ColumnDef } from "@tanstack/react-table";

import type { PendingFollowUp } from "../table-types/pending-dashboard-followup-table-types";

import DashboardPendingFollowUpDropdown from "./DashboardPendingFollowUpDropdown";

export const pendingColumns: ColumnDef<PendingFollowUp>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "company_name", header: "Company Name" },
  { accessorKey: "main_category", header: "Main Category" },
  { accessorKey: "primary_phone_number", header: "Contact" },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="text-black text-sm">{row.getValue("status")}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;

      return <DashboardPendingFollowUpDropdown task={task} />;
    },
  },
];
