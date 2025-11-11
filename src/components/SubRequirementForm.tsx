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

import { Pencil } from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { getMainCategories } from "@/services/apiMainCategories";

import {
  createSubCategory,
  updateSubCategory,
} from "@/services/apiSubCategories";

import type { SubCategory } from "@/masters/subRequirements/sub-requirements-types";

import type { MainCategory } from "@/masters/mainRequirements/main-requirements-types";

interface SubRequirementFormProps {
  mode?: "create" | "edit";
  subCategory?: SubCategory;
}

export default function SubRequirementForm({
  mode = "create",
  subCategory,
}: SubRequirementFormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    main_category_id: "",
    name: "",
    description: "",
  });

  const { data: mainCategories } = useQuery({
    queryKey: ["mainCategories"],
    queryFn: getMainCategories,
  });

  useEffect(() => {
    if (mode === "edit" && subCategory) {
      setFormData({
        main_category_id: subCategory.mainCategory || "",
        name: subCategory.name || "",
        description: subCategory.description || "",
      });
    } else {
      resetForm();
    }
  }, [mode, subCategory]);

  const createMutation = useMutation({
    mutationFn: (newData: any) => createSubCategory(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainCategories"] });
      toast.success("Sub-category created successfully!");
      resetForm();
      setOpen(false);
    },
    onError: (err: any) =>
      toast.error(err?.message || "Failed to create sub-category"),
  });

  const updateMutation = useMutation({
    mutationFn: (updateData: any) =>
      updateSubCategory(updateData.id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainCategories"] });
      toast.success("Sub-category updated successfully!");
      resetForm();
      setOpen(false);
    },
    onError: (err: any) =>
      toast.error(err?.message || "Failed to update sub-category"),
  });

  const resetForm = () =>
    setFormData({
      main_category_id: "",
      name: "",
      description: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.main_category_id.trim() || !formData.name.trim()) {
      return toast.error("Please fill all required fields.");
    }

    if (mode === "edit" && subCategory) {
      updateMutation.mutate({
        id: subCategory.id,
        main_category_id: formData.main_category_id,
        name: formData.name.trim(),
        description: formData.description.trim() || null,
      });
    } else {
      createMutation.mutate({
        main_category_id: formData.main_category_id,
        name: formData.name.trim(),
        description: formData.description.trim() || null,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {mode === "create" && (
        <DialogTrigger asChild>
          <Button className="bg-zinc-500 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-md shadow-md">
            <FaPlus />
          </Button>
        </DialogTrigger>
      )}

      {mode === "edit" && (
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-zinc-200 flex items-center gap-2"
          >
            <Pencil className="h-4 w-4 text-blue-400" />
            Edit
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="w-[90%] max-w-md max-h-[80vh] overflow-y-auto bg-zinc-100 rounded-lg shadow-xl border border-zinc-300 p-6">
        <DialogHeader className="pb-4 border-b border-zinc-300">
          <DialogTitle className="text-xl font-bold text-zinc-800">
            {mode === "edit" ? "EDIT SUB CATEGORY" : "ADD NEW SUB CATEGORY"}
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-600">
            Select a main category and fill details.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <select
            name="main_category_id"
            value={formData.main_category_id}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-zinc-500"
          >
            <option value="">Select Main Category</option>
            {mainCategories?.map((main: MainCategory) => (
              <option key={main.id} value={main.id}>
                {main.name}
              </option>
            ))}
          </select>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Sub Category Name{" "}
              <span className="text-zinc-500">(required)</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter sub category name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white"
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
              rows={3}
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white resize-none"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-300">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-zinc-500 hover:bg-zinc-600 text-white px-6 py-2 rounded-md shadow-md"
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
