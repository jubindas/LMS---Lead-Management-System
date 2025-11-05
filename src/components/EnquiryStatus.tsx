import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaPlus } from "react-icons/fa";
import { Pencil } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStatus, updateStatus } from "@/services/apiStatus";
import { toast } from "sonner";
import type { StatusType } from "@/masters/status/status-types";

interface StatusFormProps {
  mode?: "create" | "edit";
  initialData?: StatusType;
}

export default function StatusForm({ mode, initialData }: StatusFormProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ name: "" });
  const [open, setOpen] = useState(false);

  const resetForm = () => setFormData({ name: "" });

  const handleDialogChange = (open: boolean) => {
    if (open && mode === "edit" && initialData) {
      setFormData({ name: initialData.name || "" });
    } else if (!open) {
      resetForm();
    }
  };

  const createMutation = useMutation({
    mutationFn: (newStatus: { name: string }) => createStatus(newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusTypes"] });
      toast.success("Status created successfully!");
      resetForm();
      setOpen(false);
    },
    onError: () => toast.error("Failed to create status."),
  });

  const updateMutation = useMutation({
    mutationFn: (updatedStatus: { id: string; name: string }) =>
      updateStatus(updatedStatus.id, updatedStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusTypes"] });
      toast.success("Status updated successfully!");
      resetForm();
      setOpen(false);
    },
    onError: () => toast.error("Failed to update status."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "edit" && initialData) {
      updateMutation.mutate({
        id: initialData.id,
        name: formData.name,
      });
    } else {
      createMutation.mutate({ name: formData.name });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        handleDialogChange(o);
      }}
    >
      {/* Trigger Buttons */}
      {mode === "create" && (
        <DialogTrigger asChild>
          <Button className="bg-zinc-700 hover:bg-zinc-800 text-white shadow-md px-3 py-2 rounded-md transition-all">
            <FaPlus size={13} />
          </Button>
        </DialogTrigger>
      )}

      {mode === "edit" && (
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-zinc-300 flex items-center gap-2 transition hover:bg-zinc-800/40"
          >
            <Pencil className="h-4 w-4 text-blue-400" />
            Edit
          </Button>
        </DialogTrigger>
      )}

      {/* Dialog Content */}
      <DialogContent className="w-[90%] max-w-lg bg-white rounded-xl border border-zinc-200 shadow-xl p-6">
        <DialogHeader className="pb-4 border-b border-zinc-200">
          <DialogTitle className="text-xl font-semibold text-zinc-900">
            {mode === "edit" ? "Edit Status" : "Add New Status"}
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-600">
            {mode === "edit"
              ? "Modify the status name below."
              : "Create a new status for categorizing items."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Status Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter status name"
              required
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full border border-zinc-300 focus:border-zinc-500 rounded-md px-3 py-2 shadow-sm bg-white text-zinc-800 transition outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-200">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-2 rounded-md shadow-md transition"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
