/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

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

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSources, updateSource } from "@/services/apiSource";

import { toast } from "sonner";

interface EnquirySourceProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  mode?: "create" | "edit";
  source?: { id: string; name: string; description?: string };
}

export default function EnquirySource({
  open: externalOpen,
  setOpen: externalSetOpen,
  mode = "create",
  source,
}: EnquirySourceProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalSetOpen || setInternalOpen;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && source && open) {
      setFormData({
        name: source.name || "",
        description: source.description || "",
      });
    } else if (!open) {
      setFormData({ name: "", description: "" });
    }
  }, [mode, source, open]);

  const createMutation = useMutation({
    mutationFn: (newSource: { name: string; description?: string | null }) =>
      createSources(newSource),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sources"] });
      toast("Source created successfully!");
      resetForm();
    },
    onError: (error: any) => {
      console.error("Error creating source:", error);
      toast(`Failed to create source ${error.message}.`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedSource: {
      id: string;
      name: string;
      description?: string | null;
    }) => updateSource(updatedSource.id, updatedSource),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sources"] });
      toast("Source updated successfully!");
      resetForm();
    },
    onError: (error: any) => {
      console.error("Error updating source:", error);
      toast(`Failed to update source ${error.message}.`);
    },
  });

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast("Source name is required.");
      return;
    }

    if (mode === "edit" && source) {
      updateMutation.mutate({
        id: source.id,
        name: formData.name,
        description: formData.description || null,
      });
    } else {
      createMutation.mutate({
        name: formData.name,
        description: formData.description || null,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {mode === "create" && (
        <DialogTrigger asChild>
          <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
            <FaPlus />
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="w-[90%] max-w-md md:max-w-xl lg:max-w-3xl max-h-[80vh] overflow-y-auto bg-zinc-100 rounded-lg shadow-2xl border border-zinc-300 p-4 md:p-6">
        <DialogHeader className="pb-4 border-b border-zinc-300">
          <DialogTitle className="text-lg md:text-2xl font-bold text-zinc-800">
            {mode === "edit" ? "EDIT SOURCE" : "ADD NEW SOURCE"}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            {mode === "edit"
              ? "Update the details for this source."
              : "Fill in the details for the new source."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Source Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter source name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Description{" "}
              <span className="text-xs text-zinc-500">(optional)</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-300">
            <Button
              type="button"     
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="w-full md:w-auto bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-6 py-2 rounded-md shadow-lg transition-transform transform hover:-translate-y-1"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
