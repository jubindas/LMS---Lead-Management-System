import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Repeat, Trash, Pencil, Eye } from "lucide-react"; // Added Eye icon
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { deleteEnquiry } from "@/services/apiEnquiries";

type EnquiryActionDropdownProps = {
  id: string | number;
};

export default function EnquiryActionDropdown({ id }: EnquiryActionDropdownProps) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (enquiryId: string | number) => deleteEnquiry(enquiryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Enquiry deleted successfully!");
      setOpenDialog(false);
    },
    onError: (error: any) => {
      console.error("Failed to delete enquiry:", error);
      toast.error("Failed to delete enquiry");
    },
  });

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
        className="w-44 rounded-xl bg-zinc-900 border border-zinc-700 shadow-lg"
      >
        <DropdownMenuLabel className="text-xs text-zinc-400">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-700" />

        {/* View Details */}
        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800"
        >
          <Link to={`/enquiry-view-details/${id}`} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Details
          </Link>
        </DropdownMenuItem>

        {/* Follow Up */}
        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800"
        >
          <Link to={`/follow-up/${id}`} className="flex items-center gap-2">
            <Repeat className="h-4 w-4" />
            Follow Up
          </Link>
        </DropdownMenuItem>

        {/* Edit */}
        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800"
        >
          <Link to={`/enquiry-edit/${id}`} className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>

        {/* Delete */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 w-full justify-start text-sm text-red-400 hover:bg-zinc-800"
            >
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[400px] bg-zinc-100">
            <DialogHeader>
              <DialogTitle>Delete Enquiry</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-black my-2">
              Are you sure you want to delete this enquiry? This action cannot be undone.
            </p>
            <DialogFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="bg-zinc-500 hover:bg-zinc-600"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(id)}
              >
                {deleteMutation.isPending ? "Deleting..." : "Yes, Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
