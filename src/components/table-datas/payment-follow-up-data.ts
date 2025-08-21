import type { Payment } from "../table-types/payment-follow-up-types";

export const data: Payment[] = [
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
