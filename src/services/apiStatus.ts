import { API_BASE_URL } from "@/lib/url";

import axios from "axios";


export async function getStatus() {
  
  console.log(import.meta.env.BASE_URL_API);

  const response = await axios.get(`${API_BASE_URL}/statuses`);

  console.log("API response:", response.data);

  if (response.status !== 200) {
    throw new Error("Failed to fetch status");
  }

  return response.data.data.data;
}
