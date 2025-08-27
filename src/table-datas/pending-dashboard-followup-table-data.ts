
import type { PendingFollowUp } from "../table-types/pending-dashboard-followup-table-types";

export const pending_follow_up_data: PendingFollowUp[] = [
  {
    sl: 1,
    lead_name: "John Doe",
    contact: "john@example.com",
    last_follow_up_date: "2025-08-14",
    next_follow_up_date: "2025-08-17",
    stage: "Cold",
    status: "Pending",
  },
  {
    sl: 2,
    lead_name: "Jane Smith",
    contact: "jane@example.com",
    last_follow_up_date: "2025-08-13",
    next_follow_up_date: "2025-08-17",
    stage: "Warm",
    status: "Pending",
  },
  {
    sl: 3,
    lead_name: "Alice Johnson",
    contact: "alice@example.com",
    last_follow_up_date: "2025-08-12",
    next_follow_up_date: "2025-08-18",
    stage: "Hot",
    status: "Pending",
  },
];