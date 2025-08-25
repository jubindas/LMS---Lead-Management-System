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

export default function EnquiryFollowUpForm() {
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [form, setForm] = useState({
    enquiryDetails: "",
    followUpDate: "",
    followUpTime: "10:00",
  });

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (time: string | null) => {
    setForm({ ...form, followUpTime: time || "10:00" });
  };

  const handleAddEnquiryFollowUp = () => {
    console.log("Enquiry Follow-Up Added:", form);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="px-6 py-3 bg-zinc-300 text-zinc-800 font-medium rounded-xl shadow hover:bg-zinc-400 transition">
          Add Enquiry Follow-Up
        </button>
      </DialogTrigger>

      {/* Responsive Dialog */}
      <DialogContent
        className="
          w-[95%] max-w-md md:max-w-2xl
          p-4 md:p-8
          rounded-2xl shadow-xl
          bg-zinc-100 border border-zinc-200
          max-h-[85vh] overflow-y-auto
        "
      >
        <DialogHeader>
          <DialogTitle className="text-lg md:text-2xl font-bold mb-4 text-zinc-800 text-center tracking-wide">
            Add Enquiry Follow-Up
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-zinc-500 text-center mb-6">
            Add enquiry details and optionally set a follow-up time
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Remarks Field */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm md:text-base text-zinc-700 mb-2 font-medium">
              Remarks
            </label>
            <input
              type="text"
              name="enquiryDetails"
              value={form.enquiryDetails || ""}
              onChange={handleInputChange}
              placeholder="Enter Remarks..."
              className="
                w-full px-4 py-2 md:px-5 md:py-3
                rounded-xl bg-zinc-50 text-zinc-800 placeholder-zinc-400
                border border-zinc-300 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-zinc-400
                transition
              "
            />
          </div>

          {/* Follow-Up Date */}
          <div className="flex flex-col relative">
            <label className="text-sm md:text-base text-zinc-700 mb-2 font-medium">
              Follow-Up Date
            </label>
            <button
              type="button"
              onClick={() => setShowCalendar((prev) => !prev)}
              className="
                w-full px-4 py-2 md:px-5 md:py-3
                rounded-xl bg-zinc-50 text-zinc-800
                border border-zinc-300 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-zinc-400
                transition hover:bg-zinc-200
              "
            >
              {form.followUpDate
                ? `Date: ${new Date(form.followUpDate).toDateString()}`
                : "Set Follow-Up Date"}
            </button>

            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute z-50 w-full mt-2 flex justify-center"
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
                  className="
                    w-64 md:w-72 rounded-xl border border-zinc-300 shadow-lg
                    bg-zinc-400 text-zinc-900
                  "
                />
              </div>
            )}
          </div>

          {/* Follow-Up Time */}
          <div className="flex flex-col">
            <label className="text-sm md:text-base text-zinc-700 mb-2 font-medium">
              Follow-Up Time (Optional)
            </label>
            <TimePicker
              onChange={handleTimeChange}
              value={form.followUpTime}
              className="
                w-full rounded-xl border-2
                bg-zinc-100 text-zinc-800
                px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-zinc-400
              "
              disableClock={true}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              onClick={handleAddEnquiryFollowUp}
              className="
                w-full py-3 bg-zinc-300 text-zinc-800 font-semibold rounded-xl
                shadow hover:bg-zinc-400 transition transform hover:-translate-y-0.5
              "
            >
              Add Follow-Up
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
