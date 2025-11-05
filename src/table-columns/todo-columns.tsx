/* eslint-disable react-hooks/rules-of-hooks */
import type { ColumnDef } from "@tanstack/react-table";
import TodoActionDropdown from "./TodoActionDropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsDoneTodo } from "@/services/apiTodo";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export type Todo = {
  id: string;
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const todo = row.original;
      const queryClient = useQueryClient();

      const markDoneMutation = useMutation({
        mutationFn: (todoId: string) => markAsDoneTodo(todoId),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
          toast.success(`Todo "${name}" marked as done!`);
        },
        onError: () => toast.error("Failed to mark todo as done"),
      });

      return (
        <div className="flex items-center gap-2">
          <TodoActionDropdown
            id={String(todo.id)}
            name={todo.name}
            content={todo.content}
            is_complete={todo.is_complete}
            onEdit={() => onEdit(todo)}
          />

          <Button
            className="w-30 px-3 py-1 bg-zinc-800 text-white text-xs rounded-md hover:bg-zinc-700"
            disabled={markDoneMutation.isPending}
            onClick={() => markDoneMutation.mutate(row.original.id)}
          >
            {markDoneMutation.isPending ? "Marking..." : "Mark Complete"}
          </Button>
        </div>
      );
    },
  },
];
