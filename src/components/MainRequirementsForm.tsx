import { useState, useEffect } from "react";

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

import {
  createMainCategory,
  updateMainCategory,
} from "@/services/apiMainCategories";

import { toast } from "sonner";

import type { MainCategory } from "@/masters/mainRequirements/main-requirements-types";

interface MainRequirementsFormProps {
  mode?: "create" | "edit";
  mainCategory?: MainCategory;
}

export default function MainRequirementsForm({
  mode = "create",
  mainCategory,
}: MainRequirementsFormProps) {
  console.log("the main category prefill is", mainCategory);
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const resetForm = () => setFormData({ name: "", description: "" });

  useEffect(() => {
    if (mode === "edit" && mainCategory) {
      setFormData({
        name: mainCategory.name || "",
        description: mainCategory.description || "",
      });
    } else if (mode === "create") {
      resetForm();
    }
  }, [mode, mainCategory]);

  const createMutation = useMutation({
    mutationFn: (newCategory: { name: string; description?: string | null }) =>
      createMainCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainCategories"] });
      toast("Main category created successfully!");
      resetForm();
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error creating main category:", error);
      toast("Failed to create main category.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedCategory: {
      id: string;
      name: string;
      description?: string | null;
    }) => updateMainCategory(updatedCategory.id, updatedCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainCategories"] });
      toast("Main category updated successfully!");
      resetForm();
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error updating main category:", error);
      toast("Failed to update main category.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "edit" && mainCategory) {
      updateMutation.mutate({
        id: mainCategory.id,
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
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) resetForm();
      }}
    >
      {mode === "create" && (
        <DialogTrigger asChild>
          <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
            <FaPlus />
          </Button>
        </DialogTrigger>
      )}

      {mode === "edit" && (
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-zinc-200 flex items-center gap-2 text-left"
          >
            <Pencil className="h-4 w-4 text-blue-400" />
            Edit
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="w-[90%] max-w-md md:max-w-xl lg:max-w-3xl max-h-[80vh] overflow-y-auto bg-zinc-100 rounded-lg shadow-2xl border border-zinc-300 p-4 md:p-6">
        <DialogHeader className="pb-4 border-b border-zinc-300">
          <DialogTitle className="text-lg md:text-2xl font-bold text-zinc-800">
            {mode === "edit" ? "EDIT MAIN CATEGORY" : "ADD NEW MAIN CATEGORY"}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            {mode === "edit"
              ? "Update the details for this main category."
              : "Fill in the details for the new main category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Main Category Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter main category name"
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
