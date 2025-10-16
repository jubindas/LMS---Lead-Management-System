import { DataTable } from "../../components/data-table";

import { getTodos } from "@/services/apiTodo";

import { columns } from "@/table-columns/todo-dashboard-pending-table";

import { useQuery } from "@tanstack/react-query";


export default function PendingTodoWorksTable() {
  const { data: todoData } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; 

  const pendingTodos = todoData
    ? todoData.filter((todo: any) => {
        const todoDate = todo.created_at.split("T")[0]; 
        return todoDate < todayStr && todo.is_complete === false;
      })
    : [];

  const sortedTodos = pendingTodos.sort((a: any, b: any) => Number(a.id) - Number(b.id));

  console.log("Pending Todos:", sortedTodos);

  return (
    <DataTable
      columns={columns}
      data={sortedTodos}
      enablePagination={true}
    />
  );
}
