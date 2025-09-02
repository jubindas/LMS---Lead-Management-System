import { useState } from "react";

import { ListTodo } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";

import { columns } from "../table-columns/todo-columns";

import { getTodos, createTodo, updateTodo } from "@/services/apiTodo";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export default function TodoList({ editTodo }: { editTodo?: (todo: { id: string; name: string; content?: string | null }) => void }) {
  const queryClient = useQueryClient();

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskContent, setNewTaskContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const createTodoMutation = useMutation({
    mutationFn: (todoData: { name: string; content?: string | null }) =>
      createTodo(todoData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo created successfully!");
      resetForm();
    },
    onError: () => toast.error("Failed to create todo"),
  });

  const updateTodoMutation = useMutation({
    mutationFn: (todoData: { id: string; name: string; content?: string | null }) =>
      updateTodo(todoData.id, { name: todoData.name, content: todoData.content || null }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo updated successfully!");
      resetForm();
    },
    onError: () => toast.error("Failed to update todo"),
  });

  const { data: todoData } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const sortedTodos = todoData ? [...todoData].sort((a, b) => a.id - b.id) : [];

  console.log("Sorted Todos:", sortedTodos);

  const resetForm = () => {
    setNewTaskName("");
    setNewTaskContent("");
    setIsEditing(false);
    setEditingTodoId(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameTrimmed = newTaskName.trim();
    const contentTrimmed = newTaskContent.trim();

    if (!nameTrimmed) return;

    if (isEditing && editingTodoId) {
      updateTodoMutation.mutate({
        id: editingTodoId,
        name: nameTrimmed,
        content: contentTrimmed,
      });
    } else {
      createTodoMutation.mutate({
        name: nameTrimmed,
        content: contentTrimmed,
      });
    }
  };

 const handleEdit = (todo: { id: string; name: string; content?: string | null }) => {
    if (editTodo) editTodo(todo); 
    setNewTaskName(todo.name);
    setNewTaskContent(todo.content || "");
    setIsEditing(true);
    setEditingTodoId(todo.id);
  }

  return (
    <div className="min-h-screen text-white font-['Poppins'] p-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="w-full rounded-2xl p-4 md:p-6 flex flex-col bg-white shadow-md">
          <h2 className="text-xl md:text-3xl font-semibold text-zinc-900 mb-6 flex items-center gap-3">
            <ListTodo size={28} className="text-zinc-900" /> To-Do List
          </h2>

       
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 mb-6 items-stretch md:items-center"
          >
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Task Name"
              className="flex-1 px-4 py-3 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
            />
            <input
              type="text"
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
              placeholder="Task Content (optional)"
              className="flex-1 px-4 py-3 rounded-md bg-zinc-50 text-zinc-900 placeholder-zinc-400 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
            />

            <Button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-purple-400 h-12 text-white font-medium px-6 py-3 rounded-md shadow-lg hover:from-purple-700 hover:to-purple-500 transition-transform transform hover:-translate-y-1"
            >
              {isEditing
                ? updateTodoMutation.isPending
                  ? "Updating..."
                  : "Update Task"
                : createTodoMutation.isPending
                ? "Adding..."
                : "Add Task"}
            </Button>

            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="w-full md:w-auto h-12 font-medium px-6 py-3 rounded-md shadow-md border-zinc-300 text-zinc-800 hover:bg-zinc-100"
              >
                Cancel
              </Button>
            )}
          </form>

      
          <div className="overflow-x-auto rounded-lg border border-zinc-300">
            {todoData && (
              <DataTable
                columns={columns({ onEdit: handleEdit })}
                data={sortedTodos}
                enablePagination={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
