import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useState } from "react";

export default function MainRequirementsForm() {
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Main Category:", formData);
    // Reset form after submit
    setFormData({ categoryName: "", description: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
          Add Main Category
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[40rem] max-h-[30rem] overflow-y-auto bg-zinc-900 rounded-lg shadow-2xl border border-zinc-700">
        <DialogHeader className="pb-4 border-b border-zinc-700">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            ADD MAIN CATEGORY
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Fill in the details for the main category.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* Main Category Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Main Category Name
            </label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full border border-zinc-700 rounded-md px-3 py-2 bg-zinc-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Description{" "}
              <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description (optional)"
              rows={3}
              className="w-full border border-zinc-700 rounded-md px-3 py-2 bg-zinc-800 text-white shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          {/* Buttons */}
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
