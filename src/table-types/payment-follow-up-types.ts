export type Payment = {
  id: number;
  leadName?: string;
  totalAmount?: number;
  paidAmount?: number;
  reason?: string;
  nextPaymentDate?: string;
};