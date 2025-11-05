import type { ColumnDef } from "@tanstack/react-table";

export type Todo = {
  id: string;
  name: string;
  content: string;
  is_complete: boolean;
};

export const columnsComplete = (): ColumnDef<Todo>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Task Name",
    cell: ({ row }) => {
      const todo = row.original;
      return <span className={`text-black`}>{todo.name}</span>;
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <span
          className={`
             text-zinc-700
          `}
        >
          {todo.content || "No content"}
        </span>
      );
    },
  },
  {
    header: "Todo Date",
    cell: () => <span>{"N/A"}</span>,
  },
];
