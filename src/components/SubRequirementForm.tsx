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
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
          Add Sub Category
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[40rem] max-h-[30rem] overflow-y-auto bg-zinc-900 rounded-lg shadow-2xl border border-zinc-700">
        <DialogHeader className="pb-4 border-b border-zinc-700">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Add Sub Category
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Select the main category and add a sub category name. You can
            optionally provide a description.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Main Category <span className="text-gray-400">(required)</span>
            </label>
            <select
              value={selectedMain ?? ""}
              onChange={(e) => setSelectedMain(Number(e.target.value))}
              className="w-full border border-zinc-700 rounded-md px-3 py-2 bg-zinc-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            >
              <option value="">Select Main Category</option>
              {mainCategories.map((main) => (
                <option key={main.id} value={main.id}>
                  {main.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Sub Category Name{" "}
              <span className="text-gray-400">(required)</span>
            </label>
            <input
              type="text"
              placeholder="Enter sub category"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              className="w-full border border-zinc-700 rounded-md px-3 py-2 bg-zinc-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Description <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-zinc-700 rounded-md px-3 py-2 bg-zinc-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-700">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-medium px-6 py-2 rounded-md shadow-lg hover:shadow-purple-500/60 transition-transform transform hover:-translate-y-1"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
