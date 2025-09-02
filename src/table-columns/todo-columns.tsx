import type { ColumnDef } from "@tanstack/react-table";
import TodoActionDropdown from "./TodoActionDropdown";

export type Todo = {
  id: number;
  name: string;
  content: string;
  is_complete: boolean;
};

export const columns = ({
  onEdit,
}: {
  onEdit: (todo: Todo) => void;
}): ColumnDef<Todo>[] => [
  {
    accessorKey: "id",
    header: "ID",
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
      const todo = row.original;
      return (
        <TodoActionDropdown
          id={String(todo.id)}
          name={todo.name}
          content={todo.content}
          onEdit={() => onEdit(todo)}
        />
      );
    },
  },
];
