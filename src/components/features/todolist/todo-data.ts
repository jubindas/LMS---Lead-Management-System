export type Todo = {
  id: number;
  task: string;
  date: string;
  completed: boolean;
};

export const data: Todo[] = [
  { id: 1, task: "Finish project report", date: "2025-08-15", completed: false },
  { id: 2, task: "Call supplier", date: "2025-08-14", completed: true },
  { id: 3, task: "Prepare slides", date: "2025-08-20", completed: false },
];
