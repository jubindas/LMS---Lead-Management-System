import { useState } from "react";

import { Button } from "@/components/ui/button";

import { MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import { deleteStatus } from "@/services/apiStatus";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

interface StatusActionsDropdownProps {
  id: string;
}


export default function StatusActionsDropdown({ id }: StatusActionsDropdownProps) {

  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);


  const deleteStatusMutation = useMutation({
    mutationFn: (statusId: string) => deleteStatus(statusId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusTypes"] });
      toast("Status deleted successfully!");
      setOpenDialog(false); 
    },

    onError: (error) => {
      console.error("Failed to delete status:", error);
      toast("Failed to delete status");
    },
    
  });



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-zinc-800 rounded-full">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-zinc-900" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg">
        <DropdownMenuLabel className="text-xs text-zinc-400">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />

        {/* Delete button triggers dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 w-full justify-start text-sm text-zinc-200"
            >
              <Trash2 className="h-4 w-4 text-red-400" />
              Delete
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[400px] bg-zinc-100">
            <DialogHeader>
              <DialogTitle>Delete Status</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-black my-2">
              Are you sure you want to delete this status?
            </p>
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" className="bg-zinc-500 hover:bg-zinc-600" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                variant="destructive"
                onClick={() => deleteStatusMutation.mutate(id)}
              >
                Yes, Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
