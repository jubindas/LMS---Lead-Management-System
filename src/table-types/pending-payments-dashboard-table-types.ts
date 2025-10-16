export type Payment = {
  id: string;
  name: string;
  remarks: string
  total_amount: number;
  paid_amount: number;
  next_payment_date: string;
  payment: {
    name: string;
  }
};
