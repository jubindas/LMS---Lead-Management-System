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
  company_name: string;
  primary_phone_number: string;
  primary_phone_number_has_whatsapp: boolean;
  alternative_phone_number?: string | null;
  alternative_phone_number_has_whatsapp?: boolean;
  email?: string | null;
  budget?: number | null;
  remarks?: string | null;
  location?: string | null;
  status?: string | null;
  source?: string | null;
  main_category?: string | null;
  sub_category?: string | null;
  business_type?: string | null;
}) {
  try {
    console.log("API call with data:", enquiryData);
    const response = await axios.post(`${API_BASE_URL}/enquiries`, enquiryData);
    if (response.status !== 201) {
      throw new Error("Failed to create enquiry");
    }
    return response.data;
  } catch (error: any) {
    console.error("Error creating enquiry:", error);
    console.error("Error response data:", error.response?.data);
    console.error("Error response status:", error.response?.status);
    throw error;
  }
}





export async function getEnquiryById(enquiryId: string | number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/enquiries/${enquiryId}`);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch enquiry with ID ${enquiryId}`);
    }
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching enquiry ID ${enquiryId}:`, error);
    console.error("Error response data:", error.response?.data);
    console.error("Error response status:", error.response?.status);
    throw error;
  }
}




export async function deleteEnquiry(enquiryId: string | number) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/enquiries/${enquiryId}`);
    if (response.status !== 204) {
      throw new Error(`Failed to delete enquiry with ID ${enquiryId}`);
    }
  } catch (error: any) {
    console.error(`Error deleting enquiry ID ${enquiryId}:`, error);
    console.error("Error response data:", error.response?.data);
    console.error("Error response status:", error.response?.status);
    throw error;
  }
}

