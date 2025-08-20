import type { Enquiry } from "./enquiry-types";


import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { MoreHorizontal, Repeat, Eye } from "lucide-react";

import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export const enquiryColumns: ColumnDef<Enquiry>[] = [
  {
    accessorKey: "sl",
    header: "Sl",
    cell: ({ row }) => (
      <span className="text-text text-sm w-3 font-medium">{row.getValue("sl")}</span>
    ),
  },
  {
    accessorKey: "Name",
    header: "Name",
    cell: ({ row }) => (
      <span className="truncate block w-20 text-sm">{row.getValue("Name")}</span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="truncate block w-25 text-sm">{row.getValue("phone")}</span>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <span className="truncate block w-20 text-sm">{row.getValue("user")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="truncate block w-15 text-sm">{row.getValue("status")}</span>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <span className="truncate block w-10 text-sm">{row.getValue("budget")}</span>
    ),
  },
  {
    accessorKey: "businessType",
    header: "Business Type",
    cell: ({ row }) => (
      <span className="truncate block w-20 text-sm">{row.getValue("businessType")}</span>
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
  cell: () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-zinc-900" />
          </Button>
        </DropdownMenuTrigger>
       
<DropdownMenuContent
  align="end"
  className="w-40 rounded-xl bg-zinc-900 border border-zinc-700 shadow-lg"
>
  <DropdownMenuLabel className="text-xs text-zinc-400">
    Actions
  </DropdownMenuLabel>
  <DropdownMenuSeparator className="bg-zinc-700" />

  {/* Follow Up */}
  <DropdownMenuItem
    asChild
    className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800"
  >
    <Link to="/follow-up" className="flex items-center gap-2">
      <Repeat className="h-4 w-4 text-zinc-100" />
      Follow Up
    </Link>
  </DropdownMenuItem>

  {/* View Details */}
  <DropdownMenuItem
    asChild
    className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800"
  >
    <Link to="/view-details" className="flex items-center gap-2">
      <Eye className="h-4 w-4 text-zinc-100" />
      View Details
    </Link>
  </DropdownMenuItem>
</DropdownMenuContent>
      </DropdownMenu>
    );
  },
},



];
