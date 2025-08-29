import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getSubCategories() {
  const response = await axios.get(`${API_BASE_URL}/sub-categories`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch sub categories");
  }

  return response.data;
}

export async function createSubCategory(subCategoryData: {
  main_category_id: string;
  name: string;
  description?: string | null;
}) {
  const response = await axios.post(`${API_BASE_URL}/sub-categories`, subCategoryData);

  if (response.status !== 201) {
    throw new Error("Failed to create sub category");
  }

  return response.data;
}

export async function deleteSubCategory(id: string) {
  const response = await axios.delete(`${API_BASE_URL}/sub-categories/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete sub category");
  }

  return response.data;
}
