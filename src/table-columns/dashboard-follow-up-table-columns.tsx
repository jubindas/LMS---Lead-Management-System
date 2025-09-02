import type { ColumnDef } from "@tanstack/react-table";
import type { FollowUp } from "../table-types/dashboard-follow-up-table-types";
import DashboardFollowUpDropdown from "./DashboardFollowUpDropdown";

export const columns: ColumnDef<FollowUp>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "primary_phone_number",
    header: "Contact",
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <span className="text-sm text-black">{getValue<string>()}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;
      return <DashboardFollowUpDropdown task={task} />;
    },
  },
];
