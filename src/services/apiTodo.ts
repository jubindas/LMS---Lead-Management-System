import { API_BASE_URL } from "@/lib/url";

import axios from "axios";





export async function getTodos() {
  const response = await axios.get(`${API_BASE_URL}/todos`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch todos");
  }

  return response.data.data;
}




export async function createTodo(todoData: { name: string; content?: string | null }) {
  const response = await axios.post(`${API_BASE_URL}/todos`, todoData);

  if (response.status !== 201) {
    throw new Error("Failed to create todo");
  }

  return response.data;
}




export async function updateTodo(id: string, todoData: { name: string; content?: string | null }) {
  const response = await axios.put(`${API_BASE_URL}/todos/${id}`, todoData);

  if (response.status !== 200) {
    throw new Error("Failed to update todo");
  }

  return response.data;
}



export async function deleteTodo(id: string) {
  const response = await axios.delete(`${API_BASE_URL}/todos/${id}`);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Failed to delete todo");
  }

  return response.data;
}




export async function markAsDoneTodo(id: string) {
  const response = await axios.patch(`${API_BASE_URL}/todos/${id}/toggle`, {
    is_complete: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to mark todo as done");
  }

  return response.data;
}



export async function markAsIncompleteTodo(id: string) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/todos/${id}/incomplete`);

    if (response.status !== 200) {
      throw new Error("Failed to mark todo as incomplete");
    }

    return response.data;
  } catch (error) {
    console.error("Error marking todo as incomplete:", error);
    throw error;
  }
}