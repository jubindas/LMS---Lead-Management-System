import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getPayments() {
  const response = await axios.get(`${API_BASE_URL}/payments`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch payments");
  }

  return response.data.data;
}

export async function createPayments(payment: {
  name: string;
  remarks: string;
  amount: number;
}) {
  const response = await axios.post(`${API_BASE_URL}/payments`, payment);

  if (response.status !== 201) {
    throw new Error("Failed to create payment");
  }

  return response.data;
}

export async function deletePayment(id: string) {
  const response = await axios.delete(`${API_BASE_URL}/payments/${id}`);

  if (response.status === 200 || response.status === 204) {
    return { success: true };
  }

  throw new Error("Failed to delete payment");
}
