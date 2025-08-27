export type FollowUp = {
  sl: number;
  lead_name: string;
  contact: string;
  follow_up_date: string;
  stage: string;
  status: "Pending" | "Completed";
};