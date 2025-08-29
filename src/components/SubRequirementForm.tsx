import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { ChevronDown, Check } from "lucide-react";

import { FaPlus } from "react-icons/fa";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { getMainCategories } from "@/services/apiMainCategories";

import { createSubCategory } from "@/services/apiSubCategories";

export default function SubRequirementForm() {
  const queryClient = useQueryClient();

  const [selectedMainId, setSelectedMainId] = useState<string | null>(null);

  const [selectedMainName, setSelectedMainName] = useState<string>("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { data: mainCategories, isLoading: isMainLoading } = useQuery({
    queryKey: ["mainCategories"],
    queryFn: getMainCategories,
  });

  const createSubCategoryMutation = useMutation({
    mutationFn: (newSubCategory: {
      main_category_id: string;
      name: string;
      description?: string | null;
    }) => createSubCategory(newSubCategory),
    onSuccess: () => {
      toast.success("Sub category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["sub-categories"] });

      setSelectedMainId(null);
      setSelectedMainName("");
      setSubCategoryName("");
      setDescription("");
    },
    onError: (error) => {
      toast.error("Failed to create sub category");
      console.error("Error creating sub category:", error);
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMainId || !subCategoryName.trim()) {
      return toast.error("Please fill all required fields");
    }

    createSubCategoryMutation.mutate({
      main_category_id: selectedMainId, // now a string
      name: subCategoryName.trim(),
      description: description.trim() || null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
          <FaPlus />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] max-w-md md:max-w-xl lg:max-w-3xl max-h-[80vh] overflow-y-auto bg-zinc-100 rounded-lg shadow-2xl border border-zinc-300 p-4 md:p-6">
        <DialogHeader className="pb-4 border-b border-zinc-300">
          <DialogTitle className="text-lg md:text-2xl font-bold text-zinc-800">
            Add Sub Category
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            Select the main category and add a sub category name. Optionally add
            a description.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="mt-6 space-y-6">
          {/* Main Category Selector */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Main Category <span className="text-zinc-500">(required)</span>
            </label>
            <div className="flex items-center gap-2">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <div className="flex items-center justify-between border border-zinc-300 rounded-lg px-3 bg-zinc-100 flex-1 h-12 cursor-pointer">
                    <span className="truncate text-zinc-800">
                      {isMainLoading
                        ? "Loading..."
                        : selectedMainName || "Select Main Category"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-zinc-500 ml-2" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <div className="max-h-48 overflow-y-auto">
                    {mainCategories?.map(
                      (main: { id: number; name: string }) => (
                        <div
                          key={main.id}
                          className={`flex items-center w-180 px-3 py-2 bg-zinc-100 cursor-pointer hover:bg-zinc-200`}
                          onClick={() => {
                            setSelectedMainId(String(main.id));
                            setSelectedMainName(main.name);
                            setIsPopoverOpen(false);
                          }}
                        >
                          <span className="flex-1">{main.name}</span>
                          (
                          <Check className="w-4 h-4 text-green-500" />)
                        </div>
                      )
                    )}

                    {!isMainLoading && mainCategories?.length === 0 && (
                      <div className="px-3 py-2 text-sm text-zinc-500">
                        No main categories available
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Sub Category Name{" "}
              <span className="text-zinc-500">(required)</span>
            </label>
            <input
              type="text"
              placeholder="Enter sub category"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Description{" "}
              <span className="text-xs text-zinc-500">(optional)</span>
            </label>
            <textarea
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-end gap-3 pt-4 border-t border-zinc-300">
            <Button
              type="submit"
              disabled={createSubCategoryMutation.isPending}
              className="w-full md:w-auto bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-6 py-2 rounded-md shadow-lg transition-transform transform hover:-translate-y-1"
            >
              {createSubCategoryMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
