import { useState } from "react";

import { MoreHorizontal, Trash2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteMainReq } from "@/services/apiMainCategories";

import MainRequirementsForm from "@/components/MainRequirementsForm";

interface MainReqDropdownProps {
  id: string;
  name?: string;
  description?: string;
}

export default function MainReqDropdown({
  id,
  name,
  description,
}: MainReqDropdownProps) {
  const queryClient = useQueryClient();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (mainReqId: string) => deleteMainReq(mainReqId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainCategories"] });
      toast("Request deleted successfully!");
      setOpenDeleteDialog(false);
    },
    onError: (error) => {
      console.error("Failed to delete request:", error);
      toast("Failed to delete request");
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
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

          <Button
            variant="ghost"
            className="flex items-center gap-2 w-full justify-start text-sm text-zinc-200 hover:bg-zinc-800"
            onClick={() => setOpenEditDialog(true)}
          >
            <Pencil className="h-4 w-4 text-blue-400" />
            Edit
          </Button>

          <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 w-full justify-start text-sm text-zinc-200 hover:bg-zinc-800"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
                Delete
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[400px] bg-zinc-100">
              <DialogHeader>
                <DialogTitle>Delete Request</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-black my-2">
                Are you sure you want to delete this request? This action cannot
                be undone.
              </p>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="bg-zinc-500 hover:bg-zinc-600 text-white"
                  onClick={() => setOpenDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(id)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Yes, Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>

      {openEditDialog && (
        <MainRequirementsForm
          open={openEditDialog}
          setOpen={setOpenEditDialog}
          mode="edit"
          mainCategory={{
            id,
            name: name || "",
            description: description || "",
          }}
        />
      )}
    </>
  );
}
