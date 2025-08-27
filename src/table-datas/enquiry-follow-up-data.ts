import type {EnquiryFollowUp } from "../table-types/enquiry-follow-up-types"

export const data: EnquiryFollowUp[] = [
  {
    id: 1,
    leadName: "John Doe",
    contact: "john@example.com",
    lastRemark: "Called, interested in package",
    nextFollowUpDate: "2025-08-25",
    status: "Pending",
  },
  {
    id: 2,
    leadName: "Jane Doe",
    contact: "jane@example.com",
    lastRemark: "",
    nextFollowUpDate: "",
    status: "Completed",
  },
];