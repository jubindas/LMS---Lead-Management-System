import type { Payment } from "../table-types/payment-follow-up-types";

export const data: Payment[] = [
  {
    id: "1",
    totalAmount: 1000,
    paidAmount: 500,
    remarks: "Partial payment",
    nextPaymentDate: "2025-08-25",
  },
  {
    id: "2",
    remarks: "Full payment",
    totalAmount: 2000,
    paidAmount: 2000,
    nextPaymentDate: "",
  },
];
