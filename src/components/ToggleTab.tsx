import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TodoDashboard from "../pages/TodoDashboard";

import PaymentsDashboard from "../pages/PaymentsDashboard.tsx";

import FollowUpDashboard from "../pages/FollowUpDashboard.tsx";

export default function ToggleTab() {
  return (
    <div className="w-full max-w-9xl mx-auto">
  <Tabs defaultValue="todo" className="w-full">
    <div className="mt-4">
      <div className="sticky top-0 z-50 flex justify-center py-2">
        <TabsList className="flex gap-4 h-14 rounded-2xl p-2 bg-zinc-200">
          <TabsTrigger
            value="todo"
            className="text-zinc-700 text-sm md:text-base px-6 py-2 rounded-xl 
                       data-[state=active]:bg-zinc-500 
                       data-[state=active]:text-white 
                       hover:bg-zinc-200 transition-all"
          >
            Follow Up
          </TabsTrigger>
          <TabsTrigger
            value="followup"
            className="text-zinc-700 text-sm md:text-base px-6 py-2 rounded-xl 
                       data-[state=active]:bg-zinc-500 
                       data-[state=active]:text-white 
                       hover:bg-zinc-200 transition-all"
          >
            Todo List
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="text-zinc-700 text-sm md:text-base px-6 py-2 rounded-xl 
                       data-[state=active]:bg-zinc-500 
                       data-[state=active]:text-white 
                       hover:bg-zinc-200 transition-all"
          >
            Payments
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="mt-6 space-y-6">
        <TabsContent value="todo">
          <FollowUpDashboard />
        </TabsContent>
        <TabsContent value="followup">
          <TodoDashboard />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentsDashboard />
        </TabsContent>
      </div>
    </div>
  </Tabs>
</div>

  );
}
