export type EnquiryFollowUp = {
  id: number;
  leadName?: string;
  contact?: string;
  lastRemark?: string;
  nextFollowUpDate?: string;
  status?: "Pending" | "Completed";
};