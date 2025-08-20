import { DataTable } from "@/components/data-table";

import { Calendar } from "@/components/ui/calendar";

import { useState, useRef, useEffect } from "react";

import type {EnquiryFollowUp} from "../table-types/enquiry-follow-up-types"

import {data} from "../table-datas/enquiry-follow-up-data"

import {columns} from "../table-columns/enquiry-follow-up-columns"





export default function EnquiryFollowUp() {
  const [enquiries, setEnquiries] = useState<EnquiryFollowUp[]>(data);
  const [form, setForm] = useState<{ remark?: string; reminder?: string }>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFollowUp = () => {
    const newFollowUp: EnquiryFollowUp = {
      id: enquiries.length + 1,
      leadName: `Lead ${enquiries.length + 1}`,
      contact: "",
      lastRemark: form.remark,
      nextFollowUpDate: form.reminder,
      status: "Pending",
    };
    setEnquiries(prev => [...prev, newFollowUp]);
    setForm({});
    setShowCalendar(false);
  };

 

  return (
    <div className="space-y-8 w-full p-6 flex flex-col items-center min-h-screen bg-zinc-50">
      <div className="w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-white border border-zinc-200">
        <h2 className="text-3xl font-extrabold mb-8 text-zinc-800 text-center tracking-wide">
          Add Enquiry Follow-Up
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col sm:col-span-2">
            <label className="text-zinc-600 mb-2 font-medium">Remark</label>
            <input
              type="text"
              name="remark"
              value={form.remark || ""}
              onChange={handleInputChange}
              placeholder="Add your remark"
              className="w-full px-5 py-3 rounded-xl bg-zinc-100 text-zinc-800 placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div className="flex flex-col sm:col-span-1 relative">
            <label className="text-zinc-600 mb-2 font-medium">Reminder (Optional)</label>
            <button
              type="button"
              onClick={() => setShowCalendar(prev => !prev)}
              className="w-full px-5 py-3 rounded-xl bg-zinc-100 text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition hover:bg-zinc-200"
            >
              {showCalendar ? "Hide Calendar" : "Set Reminder"}
            </button>

            {showCalendar && (
              <div ref={calendarRef} className="absolute z-50 mt-8 w-full">
                <Calendar
                  mode="single"
                  selected={form.reminder ? new Date(form.reminder) : undefined}
                  className="w-full rounded-xl border border-zinc-300 shadow-xl bg-white text-zinc-800"
                  required={false}
                />
              </div>
            )}
          </div>

          <button
            onClick={handleAddFollowUp}
            className="mt-8 w-full py-3 bg-zinc-500 text-white font-semibold rounded-xl shadow-lg hover:bg-zinc-600 transition transform hover:-translate-y-0.5"
          >
            Add Follow-Up
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="w-full max-w-7xl">
        <DataTable columns={columns} data={data} enablePagination />
      </div>
    </div>
  );
}
