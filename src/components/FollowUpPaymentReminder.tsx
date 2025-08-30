import { useState, useRef, useEffect } from "react";

import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import { createPaymentFollowUp } from "@/services/apiPaymentsFollowup";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export default function FollowUpPaymentReminder({
  paymentId,
}: {
  paymentId: string | undefined;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [form, setForm] = useState({
    reason: "",
    reminder: "",
    totalAmount: "",
    paidAmount: "",
  });

  const createFollowUpPaymentMutation = useMutation({
    mutationFn: (followUpData: {
      PaymentId: string;
      total_amount: number;
      paid_amount: number;
      remarks: string;
      next_payment_date: string;
    }) => createPaymentFollowUp(followUpData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followUps", paymentId] });
      toast("Follow-up payment created successfully!");
      setOpen(false);
      setForm({
        reason: "",
        reminder: "",
        totalAmount: "",
        paidAmount: "",
      });
    },
    onError: () => {
      toast("Failed to create follow-up payment.");
    },
  });

  const calendarRef = useRef<HTMLDivElement>(null);
  const remainingAmount =
    Number(form.totalAmount || 0) - Number(form.paidAmount || 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPayment = () => {
    if (!paymentId) {
      toast.error("Payment ID is missing");
      return;
    }

    createFollowUpPaymentMutation.mutate({
      PaymentId: paymentId,
      total_amount: Number(form.totalAmount),
      paid_amount: Number(form.paidAmount),
      remarks: form.reason,
      next_payment_date: form.reminder,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-6 py-3 bg-zinc-800 text-white font-medium rounded-xl shadow-md hover:bg-zinc-700 transition">
          Add Follow Up Payment
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl p-6 rounded-xl shadow-lg bg-white border border-zinc-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-2 text-zinc-800 text-center">
            Add Follow Up Payment
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 text-center mb-4">
            Enter the payment details and optionally set a reminder
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-medium text-zinc-700 mb-1">
              Remark
            </label>
            <input
              type="text"
              name="reason"
              value={form.reason}
              onChange={handleInputChange}
              placeholder="Enter your remark"
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 text-zinc-800 placeholder-zinc-400 border border-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-zinc-700 mb-1">
              Total Amount
            </label>
            <input
              type="number"
              name="totalAmount"
              value={form.totalAmount}
              onChange={handleInputChange}
              placeholder="Enter total amount"
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-zinc-700 mb-1">
              Paid Amount
            </label>
            <input
              type="number"
              name="paidAmount"
              value={form.paidAmount}
              onChange={handleInputChange}
              placeholder="Enter paid amount"
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition"
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-medium text-zinc-700 mb-1">
              Remaining Amount
            </label>
            <input
              type="text"
              value={remainingAmount > 0 ? remainingAmount : 0}
              readOnly
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-300 shadow-sm"
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-sm font-medium text-zinc-700 mb-1">
              Reminder Date
            </label>
            <button
              type="button"
              onClick={() => setShowCalendar((prev) => !prev)}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition hover:bg-zinc-200"
            >
              {showCalendar
                ? "Hide Calendar"
                : form.reminder || "Set Reminder Date"}
            </button>

            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute bottom-full mb-2 z-50 w-full"
              >
                <Calendar
                  mode="single"
                  selected={form.reminder ? new Date(form.reminder) : undefined}
                  onSelect={(date) =>
                    setForm({
                      ...form,
                      reminder: date?.toISOString().split("T")[0] || "",
                    })
                  }
                  className="w-72 rounded-lg border border-zinc-300 shadow-md bg-zinc-200 text-zinc-800"
                  required={false}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAddPayment}
            disabled={createFollowUpPaymentMutation.isPending}
            className="px-6 py-2.5 bg-zinc-800 text-white font-medium rounded-lg shadow hover:bg-zinc-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createFollowUpPaymentMutation.isPending
              ? "Adding..."
              : "Add Payment"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
