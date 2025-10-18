import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Trash2,
  Pencil,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

import {
  deleteTodo,
  markAsDoneTodo,
  markAsIncompleteTodo,
} from "@/services/apiTodo";

type TodoActionDropdownProps = {
  id: string;
  name: string;
  content?: string | null;
  is_complete?: boolean;
  onEdit: (todo: { id: string; name: string; content?: string | null }) => void;
};

export default function TodoActionDropdown({
  id,
  name,
  content,
  is_complete,
  onEdit,
}: TodoActionDropdownProps) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  console.log("the compkete is", is_complete);

  const deleteMutation = useMutation({
    mutationFn: (todoId: string) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully!");
      setOpenDialog(false);
    },
    onError: () => toast.error("Failed to delete todo"),
  });

  const markDoneMutation = useMutation({
    mutationFn: (todoId: string) => markAsDoneTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success(`Todo "${name}" marked as done!`);
    },
    onError: () => toast.error("Failed to mark todo as done"),
  });

  const markIncompleteMutation = useMutation({
    mutationFn: (todoId: string) => markAsIncompleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success(`Todo "${name}" marked as incomplete!`);
    },
    onError: () => toast.error("Failed to mark todo as incomplete"),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
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

        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start text-sm text-zinc-100"
          onClick={() => onEdit({ id, name, content })}
        >
          <Pencil className="h-4 w-4 text-blue-400" />
          Edit
        </Button>

        {!is_complete ? (
          <Button
            variant="ghost"
            className="flex items-center gap-2 w-full justify-start text-sm text-green-400"
            disabled={markDoneMutation.isPending}
            onClick={() => markDoneMutation.mutate(id)}
          >
            <CheckCircle2 className="h-4 w-4" />
            {markDoneMutation.isPending ? "Marking..." : "Mark Complete"}
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="flex items-center gap-2 w-full justify-start text-sm text-yellow-400"
            disabled={markIncompleteMutation.isPending}
            onClick={() => markIncompleteMutation.mutate(id)}
          >
            <XCircle className="h-4 w-4" />
            {markIncompleteMutation.isPending
              ? "Marking..."
              : "Mark Incomplete"}
          </Button>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 w-full justify-start text-sm text-red-400"
            >
              <Trash2 className="h-4 w-4" />
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
                className="bg-zinc-500 hover:bg-zinc-600 text-white"
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
