/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFollowUp } from "@/services/apiFollowUp";

type EnquiryFollowUpFormProps = {
  enquiryId: string;
};

export default function EnquiryFollowUpForm({
  enquiryId,
}: EnquiryFollowUpFormProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    enquiryDetails: "",
    followUpDate: "",
  });

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState<Date | undefined>(undefined);

  console.log("the date is", date);

  const mutation = useMutation({
    mutationFn: createFollowUp,
    onSuccess: () => {
      toast.success("Follow-up created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["follow-ups", enquiryId],
      });

      setOpen(false);
      setForm({
        enquiryDetails: "",
        followUpDate: "",
      });
      setDate(undefined);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to create follow-up"
      );
    },
  });

  const handleAddEnquiryFollowUp = () => {
    if (!date) {
      toast.error("Please select a follow-up date");
      return;
    }

    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    const payload = {
      enquiry_id: Number(enquiryId),
      follow_up_date: formattedDate,
      remark: form.enquiryDetails || null,
      time: null,
    };

    console.log("the paylod is", payload);
    mutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-6 py-3 bg-zinc-300 text-zinc-800 font-medium rounded-xl shadow hover:bg-zinc-400 transition">
          Add Enquiry Follow-Up
        </button>
      </DialogTrigger>

      <DialogContent className="w-[95%] max-w-md md:max-w-2xl p-4 md:p-8 rounded-2xl shadow-xl bg-zinc-100 border border-zinc-200 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-2xl font-bold mb-4 text-zinc-800 text-center tracking-wide">
            Add Enquiry Follow-Up
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-500 text-center mb-6">
            Add enquiry details and set a follow-up date
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <div className="flex flex-col">
            <label className="text-sm md:text-base text-zinc-700 mb-2 font-medium">
              Remarks
            </label>
            <input
              type="text"
              name="enquiryDetails"
              value={form.enquiryDetails}
              onChange={(e) =>
                setForm({ ...form, enquiryDetails: e.target.value })
              }
              placeholder="Enter Remarks..."
              className="w-full px-4 py-2 md:px-5 md:py-3 rounded-xl bg-zinc-50 text-zinc-800 placeholder-zinc-400 border border-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="date-picker" className="px-1">
                Date
              </Label>
              <Popover open={openDate} onOpenChange={setOpenDate}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(selected: Date | undefined) => {
                      setDate(selected);
                      setOpenDate(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="time-picker" className="px-1">
                Time (Not Saved)
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                className="bg-background"
                defaultValue="" // ✅ always empty visually
                onChange={() => {}} // ✅ ignore time input completely
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-4">
            <button
              onClick={handleAddEnquiryFollowUp}
              disabled={mutation.isPending}
              className="w-full py-3 bg-zinc-300 text-zinc-800 font-semibold rounded-xl shadow hover:bg-zinc-400 transition transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {mutation.isPending ? "Adding..." : "Add Follow-Up"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
