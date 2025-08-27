import type { ColumnDef } from "@tanstack/react-table";

import type { EnquiryFollowUp } from "../table-types/enquiry-follow-up-types";

export const columns: ColumnDef<EnquiryFollowUp>[] = [
  { accessorKey: "leadName", header: "Lead Name" },
  { accessorKey: "contact", header: "Contact" },
  {
    accessorKey: "lastRemark",
    header: "Last Remark",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.getValue("lastRemark") || "-"}</span>
    ),
  },
  {
    accessorKey: "nextFollowUpDate",
    header: "Next Follow-Up",
    cell: ({ row }) => {
      const date = row.getValue("nextFollowUpDate") as string;
      return (
        <span className="text-zinc-800">
          {date ? new Date(date).toLocaleDateString() : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-1 rounded text-xs ${
            status === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];
