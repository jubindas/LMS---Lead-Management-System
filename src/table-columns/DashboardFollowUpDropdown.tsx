import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle2, Trash2, Repeat } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
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
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

type DashboardFollowUpDropdownProps = {
  task: {
    id: string | number;
    lead_name: string;
  };
};

export default function DashboardFollowUpDropdown({
  task,
}: DashboardFollowUpDropdownProps) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const [openDoneDialog, setOpenDoneDialog] = useState(false);

  const [budget, setBudget] = useState("");

  const deleteMutation = useMutation({
    mutationFn: (enquiryId: string | number) => deleteEnquiry(enquiryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success(`${task.lead_name} deleted successfully!`);
      setOpenDialog(false);
    },
    onError: (error) => {
      console.error("Failed to delete follow-up:", error);
      toast.error(`Failed to delete ${task.lead_name}`);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-zinc-800 rounded-full"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-zinc-900" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg"
      >
        <DropdownMenuLabel className="text-xs text-zinc-400">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 w-full justify-start text-sm text-red-400 hover:bg-zinc-800"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[400px] bg-zinc-100">
            <DialogHeader>
              <DialogTitle>Delete Follow-Up</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-black my-2">
              Are you sure you want to delete the follow-up for{" "}
              <strong>{task.lead_name}</strong>? This action cannot be undone.
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
                onClick={() => deleteMutation.mutate(task.id)}
              >
                {deleteMutation.isPending ? "Deleting..." : "Yes, Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800"
        >
          <Link
            to={`/follow-up/${task.id}`}
            className="flex items-center gap-2"
          >
            <Repeat className="h-4 w-4" />
            Follow Up
          </Link>
        </DropdownMenuItem>
        <Dialog open={openDoneDialog} onOpenChange={setOpenDoneDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 text-sm text-green-400 px-2 py-1.5 hover:bg-zinc-800 cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark as Done
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogContent className="bg-zinc-100 sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Mark as Done</DialogTitle>
            </DialogHeader>

            <div className="my-4">
              <label className="text-sm text-zinc-700 mb-2 block">
                Final Deal Amount (₹)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-white"
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="bg-zinc-500 text-white hover:bg-zinc-600"
                onClick={() => setOpenDoneDialog(false)}
              >
                Cancel
              </Button>

              <Button className="bg-green-600 hover:bg-green-700">
                Save Deal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
