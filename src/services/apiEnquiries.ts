import { API_BASE_URL } from "@/lib/url";

import axios from "axios";

export async function getEnquiries() {
  const response = await axios.get(`${API_BASE_URL}/enquiries`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch enquiries");
  }

  return response.data;
}

export async function createEnquiry(enquiryData: {
  companyName: string;
  phone: string;
  whatsappPrimary: boolean;
  altNumber?: string | null;
  whatsappAlt?: boolean;
  email?: string | null;
  budget?: number | null;
  remarks?: string | null;
  stage: "Warm Lead" | "Cold Lead" | "Hot Lead" | "Listed";
  location?: string | null;
  status?: string | null;
  source?: string | null;
  mainCategory?: string | null;
  subCategory?: string | null;
  businessType?: string | null;
}) {
  try {
    const response = await axios.post(`${API_BASE_URL}/enquiries`, enquiryData);

    if (response.status !== 201) {
      throw new Error("Failed to create enquiry");
    }

    return response.data;
  } catch (error) {
    console.error("Error creating enquiry:", error);
    throw error;
  }
}
