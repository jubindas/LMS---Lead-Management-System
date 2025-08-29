export type Payment = {
  id: string;
  totalAmount?: number;
  paidAmount?: number;
  remarks?: string;
  nextPaymentDate?: string;
};