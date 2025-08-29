import { useState } from "react";
import { MoreHorizontal, Trash2, Edit3 } from "lucide-react";
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
import { deleteSource } from "@/services/apiSource";

interface SourcesActionDropdownProps {
  id: string;
  onEdit?: () => void;
}

export default function SourcesActionDropdown({
  id,
  onEdit,
}: SourcesActionDropdownProps) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  // Mutation for deleting a source
  const deleteMutation = useMutation({
    mutationFn: (sourceId: string) => deleteSource(sourceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sources"] });
      toast("Source deleted successfully!");
      setOpenDialog(false);
    },
    onError: (error) => {
      console.error("Failed to delete source:", error);
      toast("Failed to delete source");
    },
  });

  return (
    <DropdownMenu>
      {/* Trigger button */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className=""
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-zinc-900" />
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown content */}
      <DropdownMenuContent
        align="end"
        className="w-40 rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg"
      >
        <DropdownMenuLabel className="text-xs text-zinc-400">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />

        {/* Edit Option */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start text-sm text-zinc-200 hover:bg-zinc-800"
          onClick={onEdit}
        >
          <Edit3 className="h-4 w-4 text-blue-400" />
          Edit
        </Button>

        {/* Delete Option with Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
              <DialogTitle>Delete Source</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-black my-2">
              Are you sure you want to delete this source?
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
