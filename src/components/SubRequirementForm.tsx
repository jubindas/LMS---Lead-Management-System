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
      console.log("Editing SubCategory:", subCategory);

      setFormData({
        main_category_id: subCategory.mainCategory || "",
        name: subCategory.name || "",
        description: subCategory.description || "",
      });
    } else if (mode === "create") {
      setFormData({ main_category_id: "", name: "", description: "" });
    }
  }, [mode, subCategory]);

  const createMutation = useMutation({
    mutationFn: (newSubCategory: {
      main_category_id: string;
      name: string;
      description?: string | null;
    }) => createSubCategory(newSubCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainCategories"] });
      toast.success("Sub-category created successfully!");
      resetForm();
    },
    onError: (error) => {
      console.error("Error creating sub-category:", error);
      toast.error("Failed to create sub-category.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedSubCategory: {
      id: string;
      main_category_id: string;
      name: string;
      description?: string | null;
    }) => updateSubCategory(updatedSubCategory.id, updatedSubCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainCategories"] });
      toast.success("Sub-category updated successfully!");
      resetForm();
    },
    onError: (error) => {
      console.error("Error updating sub-category:", error);
      toast.error("Failed to update sub-category.");
    },
  });

  const resetForm = () =>
    setFormData({ main_category_id: "", name: "", description: "" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.main_category_id || !formData.name.trim()) {
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
      console.log("the create is", formData.main_category_id);

      createMutation.mutate({
        main_category_id: formData.main_category_id,
        name: formData.name.trim(),
        description: formData.description.trim() || null,
      });
    }
  };

  return (
    <Dialog>
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
            {mode === "edit" ? "EDIT SUB CATEGORY" : "ADD NEW SUB CATEGORY"}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            {mode === "edit"
              ? "Update the details for this sub-category."
              : "Select a main category and provide sub-category details."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <select
            name="main_category_id"
            value={formData.main_category_id || ""}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            required
          >
            <option value="">Select Main Category</option>
            {mainCategories && mainCategories.length > 0 ? (
              mainCategories.map((main: MainCategory) => (
                <option key={main.id} value={main.id}>
                  {main.name}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
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
              rows={3}
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
