import { useState } from "react";

import { DataTable } from "@/components/data-table";

import Loading from "@/components/Loading";

import { getTodos } from "@/services/apiTodo";

import { columnsComplete } from "@/table-columns/completed-todo-columns";

import { useQuery } from "@tanstack/react-query";

export default function CompletedTodo() {
  const { data: todoData, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <Loading />;

  const sortedTodos = todoData ? [...todoData].sort((a, b) => b.id - a.id) : [];

  const completedTodos = sortedTodos.filter(
    (todo) => todo.is_complete === true
  );

  const filteredTodos = completedTodos.filter((todo) =>
    todo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen w-full">
      <div className="max-w-7xl mx-auto mt-10 p-8 shadow-md rounded-2xl bg-zinc-50">
        <div className="flex justify-between items-center mb-6 border-b border-zinc-700/60 pb-4">
          <h2 className="text-3xl font-bold tracking-wide text-black">
            Completed Tasks
          </h2>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-3 gap-3 text-sm">
          <div className="flex items-center gap-2 text-black text-xs">
            <span>Show</span>
            <select className="rounded-lg px-2 py-1 bg-zinc-400 text-zinc-100 border border-zinc-400">
              {[10, 25, 50].map((size) => (
                <option
                  key={size}
                  value={size}
                  className="bg-zinc-700 text-white text-sm"
                >
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 text-black text-xs">
            <span className="text-black">Search:</span>
            <input
              type="text"
              placeholder="Type to search..."
              className="border border-zinc-400 rounded-lg px-2 py-1 bg-zinc-400 
              placeholder-zinc-900 focus:ring-2 focus:ring-purple-500 
              focus:outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columnsComplete()}
            data={filteredTodos}
            enablePagination={true}
          />
        </div>
      </div>
    </div>
  );
}
