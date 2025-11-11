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
import { AxiosError } from "axios";

interface LocationFormProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  mode?: "create" | "edit";
  location?: { id: string; name: string; description?: string | null };
}

export default function EnquiryLocation({
  open: externalOpen,
  setOpen: externalSetOpen,
  mode,
  location,
}: LocationFormProps) {
  const [formData, setFormData] = useState({
    locationName: "",
  });

  const [internalOpen, setInternalOpen] = useState(false);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;

  const setOpen = externalSetOpen || setInternalOpen;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && location) {
      setFormData({
        locationName: location.name || "",
      });
    } else {
      setFormData({ locationName: "" });
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
      if (error instanceof AxiosError) {
        toast(
          ` ${error.response?.data.message || "Couldn't create a new Master."}.`
        );
      }
      console.error("Error creating location:", error);
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
      if (error instanceof AxiosError) {
        toast(
          ` ${error.response?.data.message || "Couldn't create a new Master."}.`
        );
      }
      console.error("Error updating location:", error);
    },
  });

  const resetForm = () => {
    setFormData({ locationName: "" });
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (mode === "edit" && location) {
      updateMutation.mutate({
        id: location.id,
        name: formData.locationName,
      });
    } else {
      createMutation.mutate({
        name: formData.locationName,
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

      <DialogContent className="  w-[90%] max-w-lg   bg-white rounded-xl shadow-2xl  border border-zinc-200  p-6  animate-in fade-in-0 zoom-in-95 ">
        <DialogHeader className="pb-4 border-b border-zinc-200">
          <DialogTitle className="text-xl font-semibold text-zinc-900">
            {mode === "edit" ? "Edit Location" : "Add New Location"}
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-600">
            {mode === "edit"
              ? "Modify this location information."
              : "Create a new location for your system."}
          </DialogDescription>
        </DialogHeader>

        <form className="mt-6 space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700">
              Location Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="locationName"
              placeholder="Enter location name"
              value={formData.locationName}
              onChange={handleChange}
              required
              className="
                w-full 
                border border-zinc-300 
                rounded-md 
                px-3 py-2 
                bg-white 
                text-zinc-800 
                shadow-sm 
                transition 
                outline-none 
                focus:ring-2 focus:ring-zinc-400 focus:border-zinc-500
              "
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="
                bg-zinc-200 hover:bg-zinc-300 
                text-zinc-700 
                font-medium 
                px-5 py-2 
                rounded-md 
                border 
                transition-all
              "
            >
              Cancel
            </Button>

            {/* ✅ FIXED: Prevent parent enquiry form submission */}
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="
                bg-zinc-700 hover:bg-zinc-800 
                text-white 
                font-medium 
                px-6 py-2 
                rounded-md 
                shadow-md 
                transition-transform 
                hover:-translate-y-0.5
              "
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
