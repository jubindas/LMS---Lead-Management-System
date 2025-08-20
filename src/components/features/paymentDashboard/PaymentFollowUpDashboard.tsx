import { DataTable } from "@/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Calendar } from "@/components/ui/calendar";
import { useState, useRef, useEffect } from "react";

type Payment = {
  id: number;
  leadName?: string;
  totalAmount?: number;
  paidAmount?: number;
  reason?: string;
  nextPaymentDate?: string;
};

const initialPaymentData: Payment[] = [
  {
    id: 1,
    leadName: "John Doe",
    totalAmount: 1000,
    paidAmount: 500,
    reason: "Partial payment",
    nextPaymentDate: "2025-08-25",
  },
  {
    id: 2,
    leadName: "Jane Doe",
    totalAmount: 2000,
    paidAmount: 2000,
    reason: "",
    nextPaymentDate: "",
  },
];

export default function PaymentFollowUpDashboard() {
  const [paymentData, setPaymentData] = useState<Payment[]>(initialPaymentData);
  const [form, setForm] = useState<{ reason?: string; reminder?: string }>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

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

  const handleAddPayment = () => {
    const newPayment: Payment = { id: paymentData.length + 1, ...form };
    setPaymentData(prev => [...prev, newPayment]);
    setForm({});
    setShowCalendar(false);
  };

  const columns: ColumnDef<Payment>[] = [
    { accessorKey: "leadName", header: "Lead Name" },
    { accessorKey: "totalAmount", header: "Total Amount" },
    { accessorKey: "paidAmount", header: "Paid Amount" },
    {
      id: "remaining",
      header: "Remaining",
      cell: ({ row }) => <span className="text-zinc-800">{(row.original.totalAmount || 0) - (row.original.paidAmount || 0)}</span>,
    },
    {
      accessorKey: "reason",
      header: "Remark",
      cell: ({ row }) => <span className="text-zinc-800">{row.getValue("reason") || "-"}</span>,
    },
    {
      accessorKey: "nextPaymentDate",
      header: "Next Payment Date",
      cell: ({ row }) => {
        const date = row.getValue("nextPaymentDate") as string;
        return <span className="text-zinc-800">{date ? new Date(date).toLocaleDateString() : "-"}</span>;
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const payment = row.original;
        const completed = payment.paidAmount === payment.totalAmount;
        return (
          <span className={`px-2 py-1 rounded text-xs ${completed ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
            {completed ? "Completed" : "Pending"}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-8 w-full p-6 flex flex-col items-center min-h-screen bg-zinc-50">
      <div className="w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-white border border-zinc-200">
        <h2 className="text-3xl font-extrabold mb-8 text-zinc-800 text-center tracking-wide">
          Add Follow-Up Payment
        </h2>

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
            onClick={handleAddPayment}
            className="mt-8 w-full py-3 bg-zinc-500 text-white font-semibold rounded-xl shadow-lg hover:bg-zinc-600 transition transform hover:-translate-y-0.5"
          >
            Add Payment
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl">
        <DataTable columns={columns} data={paymentData} enablePagination />
      </div>
    </div>
  );
}
