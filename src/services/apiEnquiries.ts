import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getEnquiries() {
  const response = await axios.get(`${API_BASE_URL}/enquiries`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch enquiries");
  }

  return response.data.data;
}
