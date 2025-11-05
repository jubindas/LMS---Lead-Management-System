import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { createColumns } from "../table-columns/payments-columns";
import PaymentsEnquiry from "@/components/PaymentsEnquiry";
import { getPayments } from "@/services/apiPayments";
import { useQuery } from "@tanstack/react-query";
import type { Payment } from "../table-types/payment-types";
import Loading from "@/components/Loading";

export default function PaymentsTable() {
  const [paymentToEdit, setPaymentToEdit] = useState<Payment | undefined>();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  console.log("the data of payments are", data)

  const handleEdit = (payment: Payment) => {
    setPaymentToEdit(payment);
    setIsEditDialogOpen(true);
  };

  const handleEditComplete = () => {
    setPaymentToEdit(undefined);
    setIsEditDialogOpen(false);
  };

  const columns = createColumns(handleEdit);

  const filteredPayments = data?.filter(
    (payment: Payment) =>
      payment.id.toString().includes(searchTerm) ||
      payment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.remarks?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if(isLoading) return <Loading />

  return (
    <div className="p-8 min-h-screen w-full">
      <div className="max-w-7xl mx-auto mt-10 p-8 shadow-md rounded-2xl bg-zinc-50">
        <div className="flex justify-between items-center mb-6 border-b border-zinc-700/60 pb-4">
          <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r text-black">
            Payments
          </h2>
          <PaymentsEnquiry />
        </div>

        {isEditDialogOpen && paymentToEdit && (
          <PaymentsEnquiry
            key={`edit-${paymentToEdit.id}`}
            paymentToEdit={{
              id: paymentToEdit.id,
              name: paymentToEdit.name,
              amount: paymentToEdit.amount,
              remarks: paymentToEdit.remarks,
            }}
            isEdit={true}
            onEditComplete={handleEditComplete}
          />
        )}

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredPayments && (
          <DataTable
            columns={columns}
            data={filteredPayments || []}
            enablePagination={true}
          />
        )}
      </div>
    </div>
  );
}
