import { useState } from "react";
import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "../table-columns/todo-columns";
import { getTodos , createTodo} from "@/services/apiTodo";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function TodoList() {
  const queryClient = new QueryClient();
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskContent, setNewTaskContent] = useState("");

  

const createTodoMutation = useMutation({
  mutationFn: (todoData: { name: string; content?: string | null }) => createTodo(todoData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    toast("Todo created successfully!");
  },
  onError: () => {
    toast("Failed to create todo");
  },
});

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameTrimmed = newTaskName.trim();
    const contentTrimmed = newTaskContent.trim();
    if (!nameTrimmed) return;

    createTodoMutation.mutate({ name: nameTrimmed, content: contentTrimmed });
    setNewTaskName("");
    setNewTaskContent("");
  };

  const { data: todoData } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  console.log("Fetched todos:", todoData);

  return (
    <div className="min-h-screen text-white font-['Poppins'] p-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="w-full rounded-2xl p-4 md:p-6 flex flex-col bg-white shadow-md">
          <h2 className="text-xl md:text-3xl font-semibold text-zinc-900 mb-6 flex items-center gap-3">
            <ListTodo size={28} className="text-zinc-900" /> To-Do List
          </h2>

          <form
            onSubmit={addTask}
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
            >{createTodoMutation.isPending ? "Adding..." : "Add Task"}
            </Button>
          </form>

          <div className="overflow-x-auto rounded-lg border border-zinc-300">
            {todoData && (
              <DataTable
                columns={columns}
                data={todoData}
                enablePagination={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
