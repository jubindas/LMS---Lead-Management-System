import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getSource() {
  const response = await axios.get(`${API_BASE_URL}/sources`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch sources");
  }


  return response.data;
}


export async function createSources(source: { name: string; description?: string | null }) {
  const response = await axios.post(`${API_BASE_URL}/sources`, source);

  if (response.status !== 201) {
    throw new Error("Failed to create sources");
  }

  return response.data;
}


export async function deleteSource(id: string) {
  const response = await axios.delete(`${API_BASE_URL}/sources/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete source");
  }

  return response.data;
}
