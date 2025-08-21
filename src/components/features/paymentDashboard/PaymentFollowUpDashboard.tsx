import { DataTable } from "@/components/data-table";
import PaymentFollowUpForm from "@/components/PaymentFollowUpForm";

import type { ColumnDef } from "@tanstack/react-table";


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
     <div className="p-8 min-h-screen w-full">
         <div className="max-w-7xl mx-auto mt-10 p-8 shadow-md rounded-2xl bg-zinc-50">
           <div className="flex flex-wrap justify-between items-center mb-4 border-b border-zinc-700/60 pb-2">
             <h2 className="text-xl font-bold tracking-wide text-zinc-800">
               Payment Follow-Up
             </h2>
            <PaymentFollowUpForm />
           </div>
   
           <div className="flex flex-wrap justify-between items-center mb-3 gap-3 text-sm">
             <div className="flex items-center gap-2 text-black text-xs">
               <span>Show</span>
               <select className="rounded-lg px-2 py-1 bg-zinc-400 text-zinc-100 border border-zinc-400">
                 {[10, 25, 50].map((size) => (
                   <option
                     key={size}
                     value={size}
                     className="bg-zinc-700 text-white text-sm"
                   >
                     {size}
                   </option>
                 ))}
               </select>
               <span>entries</span>
             </div>
   
             <div className="flex items-center gap-2 text-black text-xs">
               <span className="text-black">Search:</span>
               <input
                 type="text"
                 placeholder="Type to search..."
                 className="border border-zinc-400 rounded-lg px-2 py-1 bg-zinc-400 placeholder-zinc-900 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm transition-all"
               />
             </div>
           </div>
        <DataTable columns={columns} data={initialPaymentData} enablePagination />
      </div>
    </div>
  );
}
