import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getLocation() {
  const response = await axios.get(`${API_BASE_URL}/locations`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch locations");
  }

  return response.data.data.data;
}

export async function createLocation(locationData: { name: string; description?: string | null }) {
  const response = await axios.post(`${API_BASE_URL}/locations`, locationData);

  if (response.status !== 201) {
    throw new Error("Failed to create location");
  }

  return response.data;
}   




export async function updateLocation(id: string, locationData: { name: string; description?: string | null }) {
  const response = await axios.put(`${API_BASE_URL}/locations/${id}`, locationData);

  if (response.status !== 200) {
    throw new Error("Failed to update location");
  }

  return response.data;
}




export async function deleteLocation(id: string) {
  const response = await axios.delete(`${API_BASE_URL}/locations/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete location");
  }

  return response.data;
}