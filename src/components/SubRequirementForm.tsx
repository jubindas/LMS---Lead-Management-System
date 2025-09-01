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

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { ChevronDown, Check } from "lucide-react";

import { FaPlus } from "react-icons/fa";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { getMainCategories } from "@/services/apiMainCategories";

import { createSubCategory, updateSubCategory } from "@/services/apiSubCategories";

interface SubRequirementFormProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  mode?: "create" | "edit";
  subCategory?: { id: string; name: string; description?: string; main_category_id?: string };
}

export default function SubRequirementForm({
  open: externalOpen,
  setOpen: externalSetOpen,
  mode = "create",
  subCategory,
}: SubRequirementFormProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    main_category_id: "",
    name: "",
    description: "",
  });

  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalSetOpen || setInternalOpen;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  
  const { data: mainCategories, isLoading: isMainLoading } = useQuery({
    queryKey: ["mainCategories"],
    queryFn: getMainCategories,
  });

 
  useEffect(() => {
    if (mode === "edit" && subCategory) {
      setFormData({
        main_category_id: subCategory.main_category_id || "",
        name: subCategory.name || "",
        description: subCategory.description || "",
      });
    } else {
      setFormData({ main_category_id: "", name: "", description: "" });
    }
  }, [mode, subCategory, open]);


  const createMutation = useMutation({
    mutationFn: (newSubCategory: {
      main_category_id: string;
      name: string;
      description?: string | null;
    }) => createSubCategory(newSubCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
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

  const resetForm = () => {
    setFormData({ main_category_id: "", name: "", description: "" });
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
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
          <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
            <FaPlus />
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

        <form onSubmit={handleSave} className="mt-6 space-y-6">
       
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Main Category <span className="text-zinc-500">(required)</span>
            </label>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <div className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 h-12 cursor-pointer">
                  <span className="truncate text-zinc-800">
                    {isMainLoading
                      ? "Loading..."
                      : mainCategories?.find((c: any) => c.id === Number(formData.main_category_id))?.name ||
                        "Select Main Category"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <div className="max-h-48 overflow-y-auto">
                  {mainCategories?.map((main: { id: number; name: string }) => (
                    <div
                      key={main.id}
                      className="flex items-center px-3 py-2 bg-zinc-100 cursor-pointer hover:bg-zinc-200"
                      onClick={() => {
                        setFormData({ ...formData, main_category_id: String(main.id) });
                        setIsPopoverOpen(false);
                      }}
                    >
                      <span className="flex-1">{main.name}</span>
                      {formData.main_category_id === String(main.id) && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  ))}
                  {!isMainLoading && mainCategories?.length === 0 && (
                    <div className="px-3 py-2 text-sm text-zinc-500">
                      No main categories available
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Sub Category Name <span className="text-zinc-500">(required)</span>
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
              Description <span className="text-xs text-zinc-500">(optional)</span>
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
