import PendingPaymentTable from "../features/paymentDashboard/PendingPaymentTable";

export default function PaymentsDashboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-4 w-full max-w-8xl mx-auto ">
      <h2 className="text-black text-2xl ml-5 font-bold mb-6">{`Pending Payments - ${formattedDate}`}</h2>

      <div className="p-8 rounded-2xl shadow-md bg-zinc-50">
        <PendingPaymentTable />
      </div>
    </div>
  );
}
