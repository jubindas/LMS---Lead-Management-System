/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useFloating, offset, flip, shift } from "@floating-ui/react";

import { Calendar } from "@/components/ui/calendar";

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
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [form, setForm] = useState({
    enquiryDetails: "",
    followUpDate: "",
  });

  const { refs, floatingStyles } = useFloating({
    placement: "top",
    middleware: [offset(8), flip(), shift()],
  });

  const mutation = useMutation({
    mutationFn: createFollowUp,
    onSuccess: () => {
      toast.success("Follow-up created successfully!");
      queryClient.invalidateQueries({ queryKey: ["follow-ups", enquiryId] });
      setOpen(false);
      setForm({ enquiryDetails: "", followUpDate: "" });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to create follow-up"
      );
    },
  });

  const handleAddEnquiryFollowUp = () => {
    if (!form.followUpDate) {
      toast.error("Please select a follow-up date");
      return;
    }
    const payload = {
      enquiry_id: Number(enquiryId),
      follow_up_date: form.followUpDate.split("T")[0],
      remark: form.enquiryDetails || null,
    };
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

          <div className="flex flex-col relative">
            <label className="text-sm md:text-base text-zinc-700 mb-2 font-medium">
              Follow-Up Date
            </label>
            <button
              ref={refs.setReference}
              type="button"
              onClick={() => setShowCalendar((prev) => !prev)}
              className="w-full px-4 py-2 md:px-5 md:py-3 rounded-xl bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition hover:bg-zinc-200"
            >
              {form.followUpDate
                ? `Date: ${new Date(form.followUpDate).toDateString()}`
                : "Set Follow-Up Date"}
            </button>

            {showCalendar && (
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                className="z-[9999] mt-20 bg-white rounded-lg shadow-lg border border-zinc-300 p-3"
              >
                <Calendar
                  mode="single"
                  selected={
                    form.followUpDate ? new Date(form.followUpDate) : undefined
                  }
                  onSelect={(date) => {
                    setForm({
                      ...form,
                      followUpDate: date ? date.toISOString() : "",
                    });
                    setShowCalendar(false);
                  }}
                  className="w-60 text-sm text-zinc-900"
                />
              </div>
            )}
          </div>

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
