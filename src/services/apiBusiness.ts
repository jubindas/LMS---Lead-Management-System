import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getBusiness() {
  const response = await axios.get(`${API_BASE_URL}/business-types`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch business types");
  }

  return response.data.data.data;
}

export async function createBusiness(businessData: {
  name: string;
  description?: string | null;
}) {
  const response = await axios.post(
    `${API_BASE_URL}/business-types`,
    businessData
  );

  if (response.status !== 201) {
    throw new Error(
      response.data?.data?.message || "Failed to fetch business types"
    );
  }
  return response.data;
}

export async function updateBusiness(
  id: string,
  businessData: { name: string; description?: string | null }
) {
  const response = await axios.put(
    `${API_BASE_URL}/business-types/${id}`,
    businessData
  );

  if (response.status !== 200) {
    throw new Error("Failed to update business type");
  }

  return response.data;
}

export async function deleteBusiness(id: string) {
  const response = await axios.delete(`${API_BASE_URL}/business-types/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete business type");
  }

  return response.data;
}
