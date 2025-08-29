import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getSubCategories() {
  const response = await axios.get(`${API_BASE_URL}/sub-categories`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch sub categories");
  }

  return response.data;
}
