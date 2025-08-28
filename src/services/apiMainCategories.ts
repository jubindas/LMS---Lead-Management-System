import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getMainCategories() {
  const response = await axios.get(`${API_BASE_URL}/main-categories`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch main categories");
  }


  return response.data;
}

export async function createMainCategory(categoryData: { name: string; description?: string | null }) {
  const response = await axios.post(`${API_BASE_URL}/main-categories`, categoryData);

  if (response.status !== 201) {
    throw new Error("Failed to create main category");
  }

  return response.data;
}   






export async function deleteMainReq(id: string) {
  const response = await axios.delete(`${API_BASE_URL}/main-categories/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete main category");
  }

  return response.data;
}