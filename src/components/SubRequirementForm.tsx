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
import { FaPlus } from "react-icons/fa";

const mainCategories = [
  { id: 1, name: "website" },
  { id: 2, name: "app" },
  { id: 3, name: "software" },
];

export default function SubRequirementForm() {
  const [selectedMain, setSelectedMain] = useState<number | null>(null);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMain || !subCategoryName)
      return alert("Please fill all required fields");

    console.log("Sub Category Added:", {
      mainCategoryId: selectedMain,
      name: subCategoryName,
      description: description || null,
    });

    setSelectedMain(null);
    setSubCategoryName("");
    setDescription("");
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
          <FaPlus />
        </Button>
      </DialogTrigger>

      {/* Responsive Dialog */}
      <DialogContent
        className="
          w-[90%] max-w-md md:max-w-xl lg:max-w-3xl
          max-h-[80vh] overflow-y-auto
          bg-zinc-100 rounded-lg shadow-2xl border border-zinc-300
          p-4 md:p-6
        "
      >
        <DialogHeader className="pb-4 border-b border-zinc-300">
          <DialogTitle className="text-lg md:text-2xl font-bold text-zinc-800">
            Add Sub Category
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            Select the main category and add a sub category name. Optionally add
            a description.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSave} className="mt-6 space-y-6">
          {/* Main Category */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Main Category <span className="text-zinc-500">(required)</span>
            </label>
            <select
              value={selectedMain ?? ""}
              onChange={(e) => setSelectedMain(Number(e.target.value))}
              className="
                w-full border border-zinc-300 rounded-md px-3 py-2
                bg-white text-zinc-800 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-zinc-500
                transition
              "
            >
              <option value="">Select Main Category</option>
              {mainCategories.map((main) => (
                <option key={main.id} value={main.id}>
                  {main.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category Name */}
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
              className="
                w-full border border-zinc-300 rounded-md px-3 py-2
                bg-white text-zinc-800 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-zinc-500
                transition
              "
            />
          </div>

          {/* Description */}
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
              className="
                w-full border border-zinc-300 rounded-md px-3 py-2
                bg-white text-zinc-800 shadow-sm
                resize-none
                focus:outline-none focus:ring-2 focus:ring-zinc-500
                transition
              "
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-end gap-3 pt-4 border-t border-zinc-300">
            <Button
              type="submit"
              className="
                w-full md:w-auto
                bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-6 py-2
                rounded-md shadow-lg
                transition-transform transform hover:-translate-y-1
              "
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
