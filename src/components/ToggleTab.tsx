import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TodoDashboard from "../pages/TodoDashboard";
import PaymentsDashboard from "../pages/PaymentsDashboard";
import FollowUpDashboard from "../pages/FollowUpDashboard";

export default function ToggleTab() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Tabs defaultValue="todo" className="w-full">
       
        <div className="mt-5 sticky top-0 z-20 bg-zinc-100 border-b border-zinc-500">
          <div className="flex justify-start px-2 sm:px-6 lg:px-8">
            <TabsList className="flex space-x-6 h-12 bg-transparent border-b border-transparent">
              <TabsTrigger
                value="todo"
                className="bg-zinc-100! relative text-sm md:text-base font-medium text-zinc-500 
                           data-[state=active]:text-zinc-900 
                           after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:w-0 after:h-[2px] 
                           after:bg-zinc-900 after:transition-all after:duration-300 
                           data-[state=active]:after:w-full hover:text-zinc-800"
              >
                Follow Up
              </TabsTrigger>
              <TabsTrigger
                value="followup"
                className="bg-zinc-100! relative text-sm md:text-base font-medium text-zinc-500 
                           data-[state=active]:text-zinc-900 
                           after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:w-0 after:h-[2px] 
                           after:bg-zinc-900 after:transition-all after:duration-300 
                           data-[state=active]:after:w-full hover:text-zinc-800"
              >
                Todo List
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="bg-zinc-100! relative text-sm md:text-base font-medium text-zinc-500 
                           data-[state=active]:text-zinc-900 
                           after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:w-0 after:h-[2px] 
                           after:bg-zinc-900 after:transition-all after:duration-300 
                           data-[state=active]:after:w-full hover:text-zinc-800"
              >
                Payments
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tabs Content */}
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
      </Tabs>
    </div>
  );
}
