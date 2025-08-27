import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaPlus } from "react-icons/fa";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createStatus } from "@/services/apiStatus";

import { toast } from "sonner";

export default function StatusForm() {

  const [formData, setFormData] = useState({
    statusName: "",
    description: "",
  });

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const addStatusMutation = useMutation({
    mutationFn: (newStatus: { name: string; description?: string | null }) => {
      return createStatus(newStatus);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusTypes"] });
      setFormData({ statusName: "", description: "" });
      toast("Status created successfully!");
      setOpen(false);
    },

    onError: (error) => {
      console.error("Error creating status:", error);
      toast("Failed to create status.");
    },
    
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStatusMutation.mutate({
      name: formData.statusName,
      description: formData.description || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-3 py-1.5 text-sm rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
          <FaPlus />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] max-w-md md:max-w-xl lg:max-w-3xl max-h-[80vh] overflow-y-auto bg-zinc-100 rounded-lg shadow-2xl border border-zinc-300 p-4 md:p-6">
        <DialogHeader className="pb-4 border-b border-zinc-300">
          <DialogTitle className="text-lg md:text-2xl font-bold text-zinc-800">
            ADD NEW STATUS
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            Fill in the details for the new enquiry status.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Status Name
            </label>
            <input
              type="text"
              name="statusName"
              placeholder="Enter status name"
              value={formData.statusName}
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
              placeholder="Enter description (optional)"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-end gap-3 pt-4 border-t border-zinc-300">
            <Button
              type="submit"
              disabled={addStatusMutation.isPending}
              className="w-full md:w-auto bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-6 py-2 rounded-md shadow-lg transition-transform transform hover:-translate-y-1"
            >
              {addStatusMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
