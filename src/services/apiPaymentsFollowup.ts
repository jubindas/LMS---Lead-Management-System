import { API_BASE_URL } from "@/lib/url";
import axios from "axios";

export async function getFollowupsByPaymentId(paymentId: string) {
  const response = await axios.get(
    `${API_BASE_URL}/payments/${paymentId}/follow-ups`
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch follow-ups");
  }

  return response.data.data;
}

export async function createPaymentFollowUp(followUp: {
  PaymentId: string;
  total_amount: number;
  paid_amount: number;
  remarks: string;
  next_payment_date: string;
}) {
  const response = await axios.post(
    `${API_BASE_URL}/payments/${followUp.PaymentId}/follow-ups`,
    followUp
  );

  if (response.status !== 201) {
    throw new Error("Failed to create follow-up");
  }

  return response.data;
}
