export type Payment = {
  id: string;
  name: string;
  remarks: string
  total_amount: number;
  amount: number;
  next_payment_date: string;
  payment: {
    name: string;
  }
};
