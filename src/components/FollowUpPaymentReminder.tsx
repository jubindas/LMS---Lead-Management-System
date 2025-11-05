/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createPaymentFollowUp } from "@/services/apiPaymentsFollowup";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function FollowUpPaymentReminder({
  paymentId,
}: {
  paymentId?: string;
}) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [openDate, setOpenDate] = useState(false);

  const [reason, setReason] = useState("");

  const [totalAmount, setTotalAmount] = useState("");

  const [paidAmount, setPaidAmount] = useState("");

  const [reminder, setReminder] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const remainingAmount = Number(totalAmount || 0) - Number(paidAmount || 0);

  const createFollowUpPaymentMutation = useMutation({
    
    mutationFn: (followUpData: any) => createPaymentFollowUp(followUpData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followUps", paymentId] });

      toast.success("Follow-up created!");

      setReason("");

      setTotalAmount("");

      setPaidAmount("");

      setReminder("");

      setSelectedDate(undefined);

      setOpen(false);
    },
    onError: () => toast.error("Failed to create follow-up."),
  });

  const handleAddPayment = () => {
    if (!paymentId) {
      return toast.error("Payment ID is missing");
    }

    createFollowUpPaymentMutation.mutate({
      PaymentId: paymentId,
      total_amount: Number(totalAmount),
      paid_amount: Number(paidAmount),
      remarks: reason,
      next_payment_date: reminder,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-6 py-3 bg-zinc-800 text-white rounded-xl shadow hover:bg-zinc-700">
          Add Follow Up Payment
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl p-6 rounded-xl bg-white border border-zinc-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Add Follow Up Payment
          </DialogTitle>
          <DialogDescription className="text-sm text-center">
            Enter payment details and choose a reminder date
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block font-medium mb-1">Remark</label>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter remark"
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Paid Amount</label>
            <input
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-300 rounded-lg"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-medium mb-1">Remaining Amount</label>
            <input
              readOnly
              value={remainingAmount > 0 ? remainingAmount : 0}
              className="w-full px-4 py-2 bg-zinc-100 border border-zinc-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Reminder Date</Label>

            <Popover open={openDate} onOpenChange={setOpenDate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-48 justify-between bg-white border-zinc-300"
                >
                  {reminder || "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-4 bg-zinc-50 border text-black border-zinc-300 rounded-md shadow-sm">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(selected) => {
                    if (selected) {
                      setSelectedDate(selected);

                      const localDate = new Date(
                        selected.getTime() -
                          selected.getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .split("T")[0];

                      setReminder(localDate);
                    }
                    setOpenDate(false);
                  }}
                  classNames={{
                    day_selected:
                      "bg-zinc-800 text-white rounded-md hover:bg-zinc-700 hover:text-white",
                    day_today:
                      "border border-zinc-300 rounded-md font-semibold text-zinc-900",
                    day: "hover:bg-zinc-200 hover:text-zinc-800 rounded-md transition-all",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAddPayment}
            disabled={createFollowUpPaymentMutation.isPending}
            className="px-6 py-2 bg-zinc-800 text-white rounded-lg shadow hover:bg-zinc-700 disabled:opacity-50"
          >
            {createFollowUpPaymentMutation.isPending
              ? "Saving..."
              : "Add Payment"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
