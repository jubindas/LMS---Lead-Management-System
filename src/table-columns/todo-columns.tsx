import type { ColumnDef } from "@tanstack/react-table";
import TodoActionDropdown from "./TodoActionDropdown";

export type Todo = {
  id: number;
  name: string;
  content: string;
};

export const columns = ({
  onEdit,
}: {
  onEdit: (todo: Todo) => void; 
}): ColumnDef<Todo>[] => [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Task Name" },
  { accessorKey: "content", header: "Content" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <TodoActionDropdown
          id={todo.id}
          name={todo.name}
          content={todo.content}
          onEdit={() => onEdit(todo)}
        />
      );
    },
  },
];
