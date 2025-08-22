import type { Enquiry } from "../table-types/enquiry-types";

export const enquiryData: Enquiry[] = [
  {
    sl: 1,
    Name: "ABC Traders",
    phone: "9876543210",
    user: "John Doe",
    status: "Pending",
    stage: "",
    budget: "5000",
    businessType: "Manufacturer",
    source: "Cold Calling",
  },
  {
    sl: 2,
    Name: "XYZ Services",
    phone: "9123456780",
    user: "Jane Smith",
    status: "In Progress",
    stage: "",
    budget: "3000",
    businessType: "Service",
    source: "Social Media",
  },
  {
    sl: 3,
    Name: "PQR Solutions",
    phone: "9988776655",
    user: "Alice Johnson",
    status: "Completed",
    stage: "",
    budget: "8000",
    businessType: "Consulting",
    source: "Referral",
  },
];
