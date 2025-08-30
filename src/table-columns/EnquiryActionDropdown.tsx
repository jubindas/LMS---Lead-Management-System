
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



type EnquiryActionDropdownProps = {
  id: string | number; 
};

export default function EnquiryActionDropdown({ id }: EnquiryActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
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

        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800"
        >
          <Link to={`/follow-up/${id}`} className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-zinc-100" />
            Follow Up
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800"
        >
          <Link to={`/enquiry-view-details/${id}`} className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-zinc-100" />
            View Details
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
