import { useState } from "react";

import { Button } from "@/components/ui/button";

import { MoreHorizontal, Edit, Trash2, CheckCircle2 } from "lucide-react";

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

import { deleteTodo } from "@/services/apiTodo";

type TodoActionDropdownProps = {
  id: string | number;
};

export default function TodoActionDropdown({ id }: TodoActionDropdownProps) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (todoId: string | number) => deleteTodo(String(todoId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully!");
      setOpenDialog(false);
    },
    onError: (error: any) => {
      console.error("Failed to delete todo:", error);
      toast.error("Failed to delete todo");
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
        <DropdownMenuLabel className="text-xs text-zinc-400">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-700" />

        <DropdownMenuItem
          onClick={() => toast.info(`Edit Todo ${id}`)}
          className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800"
        >
          <Edit className="h-4 w-4 text-blue-500" /> Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => toast.success(`Todo ${id} marked as done!`)}
          className="flex items-center gap-2 text-sm text-zinc-100 rounded-lg px-2 py-1.5 hover:bg-zinc-800"
        >
          <CheckCircle2 className="h-4 w-4 text-green-500" /> Mark as Done
        </DropdownMenuItem>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 w-full justify-start text-sm text-red-400 hover:bg-zinc-800"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
              Delete
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[400px] bg-zinc-100">
            <DialogHeader>
              <DialogTitle>Delete Todo</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-black my-2">
              Are you sure you want to delete this todo? This action cannot be
              undone.
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
