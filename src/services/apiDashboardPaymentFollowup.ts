import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getPaymentsFollowUpDashboard() {
  const response = await axios.get(`${API_BASE_URL}/payment/follow-ups`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch payment follow-up data");
  }

  return response.data.data;
}
