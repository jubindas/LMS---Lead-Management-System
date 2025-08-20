import TodayTodoWorksTable from "../features/todoDashboard/TodayTodoWorksTable.tsx";

import PendingTodoWorksTable from "../features/todoDashboard/PendingTodoWorksTable.tsx";

export default function TodoDashboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-4 w-full max-w-8xl mx-auto ">
      <h2 className="text-black text-2xl ml-5 font-bold mb-6">{`Today's Date: ${formattedDate}`}</h2>

      <div className=" p-8 rounded-2xl shadow-md mb-6 bg-zinc-900/20">
        <h3 className="text-black font-semibold text-lg mb-3">Today's Tasks</h3>
        <TodayTodoWorksTable />
      </div>

      <div className=" p-8 rounded-2xl shadow-md bg-zinc-900/20">
        <h3 className="text-black font-semibold text-lg mb-3">Pending Tasks</h3>
        <PendingTodoWorksTable />
      </div>
    </div>
  );
}
