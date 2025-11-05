/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getFollowUpsByEnquiryId(enquiryId: string) {
  const response = await axios.get(`${API_BASE_URL}/follow-ups`, {
    params: { enquiry_id: enquiryId },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch follow-ups");
  }

  return response.data;
}

export async function createFollowUp(data: {
  enquiry_id: number;
  follow_up_date: string;
  remark?: string | null;
}) {
  try {
    const response = await axios.post(`${API_BASE_URL}/follow-ups`, data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating follow-up:",
      error.response?.data || error.message
    );
    throw error;
  }
}
