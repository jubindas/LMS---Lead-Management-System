import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getStatus() {
  const response = await axios.get(`${API_BASE_URL}/statuses`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch status");
  }

  return response.data.data.data;
}

export async function createStatus(status: { name: string; description?: string | null }) {
  const response = await axios.post(`${API_BASE_URL}/statuses`, status);

  if (response.status !== 201) {
    throw new Error("Failed to create status");
  }

  return response.data;
}


export async function editStatus(id: string) {
  const response = await axios.put(`${API_BASE_URL}/statuses/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to edit status");
  }

  return response.data;
}

export async function updateStatus(id: string, status: { name: string; description?: string | null }) {
  const response = await axios.put(`${API_BASE_URL}/statuses/${id}`, status);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to update status");
  }

  return response.data;
}

export async function deleteStatus(id: string) {
  const response = await axios.delete(`${API_BASE_URL}/statuses/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete status");
  }

  return response.data;
}