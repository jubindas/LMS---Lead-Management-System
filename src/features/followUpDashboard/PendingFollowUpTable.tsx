import { DataTable } from "@/components/data-table";
import { pendingColumns } from "../../table-columns/pending-dashboard-followup-table-columns";
import { pending_follow_up_data } from "../../table-datas/pending-dashboard-followup-table-data";

export default function PendingFollowUpTable() {
  return (
    <DataTable
      columns={pendingColumns}
      data={pending_follow_up_data}
      enablePagination={true}
    />
  );
}
