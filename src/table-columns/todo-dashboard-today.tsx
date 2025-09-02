import type { ColumnDef } from "@tanstack/react-table";

import DashboardTodoTodayDropdown from "@/table-columns/dashboardTodoTodayDropdown";

import type {TodoList } from "@/table-types/todo-dashboard-today-types";


export const todoColumns: ColumnDef<TodoList>[] = [
  {
    accessorKey: "id",
    header: () => <span className="capitalize">Id</span>,
    cell: ({ row }) => <span className="text-black text-sm">{row.getValue("id")}</span>,
  },
    {
    accessorKey: "name",
    header: "Task Name",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <span
          className={`${
            todo.is_complete
              ? "text-green-600 line-through font-semibold"
              : "text-black"
          }`}
        >
          {todo.name}
        </span>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <span
          className={`${
            todo.is_complete
              ? "text-green-600 line-through"
              : "text-zinc-700"
          }`}
        >
          {todo.content || "No content"}
        </span>
      );
    },
  },
 
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DashboardTodoTodayDropdown
          id={row.original.id}
          name={row.original.name}
          content={row.original.content}
          onEdit={(todo) => console.log("Edit clicked", todo)}
        />
      );
    },
  },
];
