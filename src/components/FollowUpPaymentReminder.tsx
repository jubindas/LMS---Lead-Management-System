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

import TimePicker from "react-time-picker";

import "react-time-picker/dist/TimePicker.css";

import "react-clock/dist/Clock.css";

export default function FollowUpPaymentReminder({ paymentId }: { paymentId: string | undefined }) {
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [form, setForm] = useState({
    reason: "",
    reminder: "",
    reminderTime: "10:00",
    totalAmount: "",
    paidAmount: "",
  });


   console.log("FollowUpPaymentReminder paymentId:", paymentId);
  const calendarRef = useRef<HTMLDivElement>(null);
  const remainingAmount =
    Number(form.totalAmount || 0) - Number(form.paidAmount || 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (time: string | null) => {
    setForm({ ...form, reminderTime: time || "10:00" });
  };

  const handleAddPayment = () => {
    console.log("Payment added:", { ...form, remainingAmount });
    setOpen(false);
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

          <div className="flex flex-col">
            <label className="text-sm font-medium text-zinc-700 mb-1">
              Reminder Time
            </label>
            <TimePicker
              onChange={handleTimeChange}
              value={form.reminderTime}
              className="rounded-lg border-2 bg-zinc-50 text-zinc-800 px-3 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
              disableClock={true}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAddPayment}
            className="px-6 py-2.5 bg-zinc-800 text-white font-medium rounded-lg shadow hover:bg-zinc-700 transition"
          >
            Add Payment
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
