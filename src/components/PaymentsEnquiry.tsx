
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
        <Button className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-medium px-5 py-2 rounded-md shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
          Add Payment Enquiry
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[40rem] max-h-[40rem] overflow-y-auto bg-zinc-900 rounded-lg shadow-2xl border border-zinc-700">
        <DialogHeader className="pb-4 border-b border-zinc-700">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            ADD PAYMENT ENQUIRY
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Fill in the details for the payment enquiry.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-zinc-700 rounded-md px-3 py-2 bg-zinc-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border border-zinc-700 rounded-md px-3 py-2 bg-zinc-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  className="flex items-center justify-start h-12 gap-2 px-3 py-3 w-full rounded-md border border-zinc-600 text-zinc-100 hover:bg-zinc-800"
                >
                  <CalendarIcon size={18} />
                  {dueDate ? dueDate.toLocaleDateString() : "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-zinc-800 border border-zinc-600">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  className="rounded-md bg-zinc-900 text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

        
          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-700">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-medium px-6 py-2 rounded-md shadow-lg hover:shadow-purple-500/60 transition-transform transform hover:-translate-y-1"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
