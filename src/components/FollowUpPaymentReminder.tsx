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

export default function FollowUpPaymentReminder() {
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [form, setForm] = useState({ reason: "", reminder: "" });
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPayment = () => {
    console.log("Payment added:", form);
    setOpen(false);
  };

  // Close calendar when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-6 py-3 bg-zinc-500 text-white rounded-xl shadow hover:bg-zinc-600 transition">
          Add Follow-Up Payment
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-white border border-zinc-200">
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold mb-8 text-zinc-800 text-center tracking-wide">
            Add Follow-Up Payment
          </DialogTitle>
          <DialogDescription className="text-zinc-600 text-center mb-6">
            Fill in the remark and optionally set a reminder
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col sm:col-span-2">
            <label className="text-zinc-600 mb-2 font-medium">Remark</label>
            <input
              type="text"
              name="reason"
              value={form.reason || ""}
              onChange={handleInputChange}
              placeholder="Add your remark"
              className="w-full px-5 py-3 rounded-xl bg-zinc-100 text-zinc-800 placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div className="flex flex-col sm:col-span-1 relative">
            <label className="text-zinc-600 mb-2 font-medium">
              Reminder (Optional)
            </label>
            <button
              type="button"
              onClick={() => setShowCalendar(prev => !prev)}
              className="w-full px-5 py-3 rounded-xl bg-zinc-100 text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition hover:bg-zinc-200"
            >
              {showCalendar ? "Hide Calendar" : "Set Reminder"}
            </button>

            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute z-50 w-full -top-64" // moves calendar higher
              >
                <Calendar
                  mode="single"
                  selected={form.reminder ? new Date(form.reminder) : undefined}
                  className="w-70 rounded-xl border border-zinc-300 shadow-xl bg-zinc-400 text-zinc-800"
                  required={false}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleAddPayment}
            className="mt-8 w-full py-3 bg-zinc-500 text-white font-semibold rounded-xl shadow-lg hover:bg-zinc-600 transition transform hover:-translate-y-0.5"
          >
            Add Payment
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
