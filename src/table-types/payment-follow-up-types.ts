export type Payment = {
  id: string;
  total_amount?: number;       // match backend key
  paid_amount?: number;        // match backend key
  remarks?: string;
  next_payment_date?: string;  // match backend key
};
