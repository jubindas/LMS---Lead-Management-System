import { useState } from "react";

import { ListTodo, Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";

import { data } from "../table-datas/todo-data";

import { columns } from "../table-columns/todo-columns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  date: string;
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Finish project report", completed: false, date: "2025-08-15" },
    { id: 2, text: "Call supplier", completed: true, date: "2025-08-14" },
  ]);

  const [newTask, setNewTask] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (!trimmed || !dueDate) return;

    const year = dueDate.getFullYear();
    const month = String(dueDate.getMonth() + 1).padStart(2, "0");
    const day = String(dueDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setTasks([
      ...tasks,
      { id: Date.now(), text: trimmed, completed: false, date: formattedDate },
    ]);
    setNewTask("");
    setDueDate(undefined);
  };

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
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="
                flex-1 px-4 py-3 rounded-md
                bg-zinc-50 text-zinc-900 placeholder-zinc-400
                border border-zinc-300
                focus:outline-none focus:ring-2 focus:ring-purple-500
                text-base
              "
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  className="
                    flex items-center justify-center
                    h-12 w-full md:w-auto
                    gap-2 px-3 py-3 rounded-md
                    border border-zinc-300
                    text-zinc-900 bg-zinc-100
                    hover:bg-zinc-200
                  "
                >
                  <CalendarIcon size={18} />
                  <span className="truncate">
                    {dueDate ? dueDate.toLocaleDateString() : "Select Date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-zinc-100 border border-zinc-300">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  className="rounded-md bg-white text-zinc-800"
                />
              </PopoverContent>
            </Popover>

            <Button
              type="submit"
              className="
                w-full md:w-auto
                bg-gradient-to-r from-purple-600 to-purple-400
                h-12 text-white font-medium
                px-6 py-3 rounded-md shadow-lg
                hover:from-purple-700 hover:to-purple-500
                transition-transform transform hover:-translate-y-1
              "
            >
              Add
            </Button>
          </form>

          <div className="overflow-x-auto rounded-lg border border-zinc-300">
            <DataTable
              columns={columns}
              data={data}
              enablePagination={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
