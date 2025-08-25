import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

export default function PaymentsEnquiry() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
  });
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      date: dueDate ? dueDate.toISOString().split("T")[0] : "",
    };
    console.log("Payment enquiry submitted:", payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-4 py-2 rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg">
          Add Payment Enquiry
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[40rem] max-h-[40rem] overflow-y-auto bg-zinc-100 rounded-lg shadow-2xl border border-zinc-300">
        <DialogHeader className="pb-4 border-b border-zinc-300">
          <DialogTitle className="text-2xl font-bold text-zinc-800">
            ADD PAYMENT ENQUIRY
          </DialogTitle>
          <DialogDescription className="text-zinc-600">
            Fill in the details for the payment enquiry.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  className="flex items-center justify-start h-12 gap-2 px-3 py-3 w-full rounded-md border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-200"
                >
                  <CalendarIcon size={18} />
                  {dueDate ? dueDate.toLocaleDateString() : "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-zinc-100 border border-zinc-300 ">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  className="rounded-md bg-white text-zinc-800 "
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-300">
            <Button
              type="submit"
              className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium px-6 py-2 rounded-md shadow-md transition-transform transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
