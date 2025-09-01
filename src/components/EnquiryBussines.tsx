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

import { createBusiness, updateBusiness } from "@/services/apiBusiness";

import { toast } from "sonner";

interface EnquiryBusinessProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  mode?: "create" | "edit";
  business?: { id: string; name: string; description?: string };
}

export default function EnquiryBusiness({
  open: externalOpen,
  setOpen: externalSetOpen,
  mode = "create",
  business,
}: EnquiryBusinessProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalSetOpen || setInternalOpen;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && business) {
      setFormData({
        name: business.name,
        description: business.description || "",
      });
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [mode, business, open]);

  const createMutation = useMutation({
    mutationFn: (newBusiness: { name: string; description?: string | null }) =>
      createBusiness(newBusiness),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessTypes"] });
      toast("Business created successfully!");
      resetForm();
    },
    onError: (error) => {
      console.error("Error creating business:", error);
      toast("Failed to create business.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedBusiness: {
      id: string;
      name: string;
      description?: string | null;
    }) => updateBusiness(updatedBusiness.id, updatedBusiness),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessTypes"] });
      toast("Business updated successfully!");
      resetForm();
    },
    onError: (error) => {
      console.error("Error updating business:", error);
      toast("Failed to update business.");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "edit" && business) {
      updateMutation.mutate({
        id: business.id,
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
            {mode === "edit" ? "EDIT BUSINESS" : "ADD NEW BUSINESS"}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            {mode === "edit"
              ? "Update the details for this business."
              : "Fill in the details for the new business."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter business name"
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

          <div className="flex flex-col md:flex-row justify-end gap-3 pt-4 border-t border-zinc-300">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="w-full md:w-auto bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-6 py-2 rounded-md shadow-lg transition-transform transform hover:-translate-y-1"
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
