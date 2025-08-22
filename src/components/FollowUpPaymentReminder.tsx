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

export default function FollowUpPaymentReminder() {
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [form, setForm] = useState({ reason: "", reminder: "", reminderTime: "10:00" });
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (time: string | null) => {
    setForm({ ...form, reminderTime: time || "10:00" });
  };

  const handleAddPayment = () => {
    console.log("Payment added:", form);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-6 py-3 bg-zinc-300 text-zinc-800 font-medium rounded-xl shadow hover:bg-zinc-400 transition">
          Add Follow Up Payment
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-zinc-100 border border-zinc-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-8 text-zinc-800 text-center tracking-wide">
            Add Follow Up Payment
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center mb-6">
            Fill in the remark and optionally set a reminder
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col sm:col-span-2">
            <label className="text-zinc-700 mb-2 font-medium">Remark</label>
            <input
              type="text"
              name="reason"
              value={form.reason || ""}
              onChange={handleInputChange}
              placeholder="Add your remark"
              className="w-full px-5 py-3 rounded-xl bg-zinc-50 text-zinc-800 placeholder-zinc-400 border border-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition"
            />
          </div>

          <div className="flex flex-col sm:col-span-1 relative">
            <label className="text-zinc-700 mb-2 font-medium">
              Reminder Date
            </label>
            <button
              type="button"
              onClick={() => setShowCalendar((prev) => !prev)}
              className="w-full px-5 py-3 rounded-xl bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition hover:bg-zinc-200"
            >
              {showCalendar ? "Hide Calendar" : "Set Reminder"}
            </button>

            {showCalendar && (
              <div ref={calendarRef} className="absolute z-50 w-full mt-2">
                <Calendar
                  mode="single"
                  selected={form.reminder ? new Date(form.reminder) : undefined}
                  className="w-72 rounded-xl border border-zinc-300 shadow-lg bg-zinc-50 text-zinc-800"
                  required={false}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:col-span-1">
            <label className="text-zinc-700 mb-2 font-medium">
              Reminder Time (Optional)
            </label>
            <TimePicker
              onChange={handleTimeChange}
              value={form.reminderTime}
              className="rounded-xl border-2 bg-zinc-100 text-zinc-800 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
              disableClock={true}
            />
          </div>

          <button
            onClick={handleAddPayment}
            className="mt-8 w-full py-3 bg-zinc-300 text-zinc-800 font-semibold rounded-xl shadow hover:bg-zinc-400 transition transform hover:-translate-y-0.5"
          >
            Add Payment
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
