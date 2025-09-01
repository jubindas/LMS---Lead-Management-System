import type { ColumnDef } from "@tanstack/react-table";
import TodoActionDropdown from "./TodoActionDropdown";

export type Todo = {
  id: number;
  name: string;
  content?: string;
  is_complete: boolean;
};

export const columns: ColumnDef<Todo>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Task Name" },
  { accessorKey: "content", header: "Content" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <TodoActionDropdown id={row.original.id} />,
  },
];
