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

export default function EnquiryReminder() {
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime] = useState("09:00");

  const calendarRef = useRef<HTMLDivElement>(null);

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

  const handleSaveReminder = () => {
    if (selectedDate && selectedTime) {
      console.log(
        `Enquiry Reminder Set: ${selectedDate.toDateString()} at ${selectedTime}`
      );
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <button >
        Enquiry Reminder
        </button>
      </DialogTrigger>

 
      <DialogContent className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white border border-zinc-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-zinc-900">
            Enquiry Reminder
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600 mt-2">
            Choose a date and time to follow up with this enquiry
          </DialogDescription>
        </DialogHeader>

      
        <div className="flex items-start justify-between gap-4 mt-6 relative">
  
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setShowCalendar((prev) => !prev)}
              className="w-full px-5 py-3 rounded-xl bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-sm hover:bg-zinc-200 transition"
            >
              {selectedDate
                ? `Date: ${selectedDate.toDateString()}`
                : "Select Date"}
            </button>

            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute top-16 z-50 w-full rounded-xl border border-zinc-300 bg-white shadow-lg"
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setShowCalendar(false);
                  }}
                  className="w-72 rounded-xl border border-zinc-300 shadow-lg bg-zinc-50 text-zinc-900"
                />
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center">
            <TimePicker
              value={selectedTime}
              disableClock={true}
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 text-zinc-800 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <button
          onClick={handleSaveReminder}
          disabled={!selectedDate || !selectedTime}
          className={`mt-8 w-full py-3 font-semibold rounded-xl shadow-lg transition transform hover:-translate-y-0.5 ${
            selectedDate && selectedTime
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {selectedDate && selectedTime
            ? "Save Enquiry Reminder"
            : "Select Date & Time"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
