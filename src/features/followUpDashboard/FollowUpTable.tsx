import { DataTable } from "@/components/data-table";
import { columns } from "../../table-columns/dashboard-follow-up-table-columns";
import { follow_up_data } from "../../table-datas/dashboard-follow-up-table-data";

export default function FollowUpTable() {
  return (
    <DataTable
      columns={columns}
      data={follow_up_data}
      enablePagination={true}
    />
  );
}
