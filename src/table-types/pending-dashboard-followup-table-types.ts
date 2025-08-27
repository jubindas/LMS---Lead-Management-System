export type PendingFollowUp = {
  sl: number;
  lead_name: string;
  contact: string;
  last_follow_up_date: string;
  next_follow_up_date: string;
  stage: string;
  status: "Pending" | "Completed";
};