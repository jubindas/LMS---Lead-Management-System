import { useEffect, useState } from "react";

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

import { createLocation, updateLocation } from "@/services/apiLocation";

import { toast } from "sonner";

interface LocationFormProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  mode?: "create" | "edit";
  location?: { id: string; name: string; description?: string | null };
}

export default function EnquiryLocation({
  open: externalOpen,
  setOpen: externalSetOpen,
  mode = "create",
  location,
}: LocationFormProps) {
  const [formData, setFormData] = useState({
    locationName: "",
    description: "",
  });

  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalSetOpen || setInternalOpen;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && location) {
      setFormData({
        locationName: location.name || "",
        description: location.description || "",
      });
    } else {
      setFormData({ locationName: "", description: "" });
    }
  }, [mode, location, open]);

  const createMutation = useMutation({
    mutationFn: (newLocation: { name: string; description?: string | null }) =>
      createLocation(newLocation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast("Location created successfully!");
      resetForm();
    },
    onError: (error) => {
      console.error("Error creating location:", error);
      toast("Failed to create location.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedLocation: {
      id: string;
      name: string;
      description?: string | null;
    }) => updateLocation(updatedLocation.id, updatedLocation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast("Location updated successfully!");
      resetForm();
    },
    onError: (error) => {
      console.error("Error updating location:", error);
      toast("Failed to update location.");
    },
  });

  const resetForm = () => {
    setFormData({ locationName: "", description: "" });
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "edit" && location) {
      updateMutation.mutate({
        id: location.id,
        name: formData.locationName,
        description: formData.description || null,
      });
    } else {
      createMutation.mutate({
        name: formData.locationName,
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
            {mode === "edit" ? "EDIT LOCATION" : "ADD NEW LOCATION"}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-600">
            {mode === "edit"
              ? "Update the details for this location."
              : "Fill in the details for the new location."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Location Name
            </label>
            <input
              type="text"
              name="locationName"
              placeholder="Enter location name"
              value={formData.locationName}
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
