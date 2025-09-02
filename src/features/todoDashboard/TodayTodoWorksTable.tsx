import { DataTable } from "../../components/data-table";

import { todoColumns } from "@/table-columns/todo-dashboard-today";

import { getTodos } from "@/services/apiTodo";

import { useQuery } from "@tanstack/react-query";

export default function TodayTodoWorksTable() {
  const { data: todoData } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });


  const today = new Date();
  const todayStr = today.toLocaleDateString("en-CA"); 

  const todaysTodos = todoData
    ? todoData.filter((todo) => {
        const todoDate = new Date(todo.created_at).toLocaleDateString("en-CA");
        return todoDate === todayStr;
      })
    : [];

  const sortedTodos = todaysTodos.sort((a, b) => Number(a.id) - Number(b.id));

  return (
    <DataTable
      columns={todoColumns}
      data={sortedTodos}
      enablePagination={true}
    />
  );
}
