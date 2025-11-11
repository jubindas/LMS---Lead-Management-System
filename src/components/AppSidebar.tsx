import {
  Briefcase,
  MessageSquare,
  ListTodo,
  LayoutDashboard,
  IndianRupee,
  Trash2,
  CalendarClock,
  CheckCircle,
  FileText,
  Download,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Masters",
    icon: Briefcase,
    children: [
      { title: "Bussiness Type", url: "/bussines" },
      { title: "Status Type", url: "/status" },
      { title: "Main Category", url: "/main-category" },
      { title: "Sub Category", url: "/sub-category" },
      { title: "Source", url: "/source" },
       { title: "Location", url: "/location" },
    ],
  },
  {
    title: "Enquiry",
    url: "/enquiry",
    icon: MessageSquare,
  },
  { title: "Payment", url: "/payment", icon: IndianRupee },
  { title: "Todo List", url: "/todo-list", icon: ListTodo },
  { title: "Completed Todo List", url: "/completed-todo-list", icon: ListTodo },
  { title: "Completed Enquiries", url: "/completed-enquiry", icon: CheckCircle  },
  { title: "Pending FollowUp Enquiries", url: "/pending-enquiry", icon: CalendarClock},
  { title: "Trash Enquiries", url: "/trash-bin", icon: Trash2 },
  { title: "Report Enquiries", url: "/report-enquiry", icon: FileText },
  { title: "Download Enquiries", url: "/download", icon: Download },

];

export function AppSidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => {
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach((key) => (newState[key] = false));
      newState[title] = !prev[title];
      return newState;
    });
  };

  const isParentActive = (item: (typeof items)[number]) => {
    if (item.url && location.pathname === item.url) return true;
    if (item.children) {
      return item.children.some((child) => location.pathname === child.url);
    }
    return false;
  };

  return (
    <Sidebar className="  text-white border-r shadow-lg">
      <div className="flex items-center gap-2 px-4 py-4">
        <p className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Web Infotech
        </p>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = isParentActive(item);
                const isOpen = openMenus[item.title];

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.children ? (
                      <>
                        <SidebarMenuButton
                          onClick={() => toggleMenu(item.title)}
                          className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 cursor-pointer
                          hover:bg-zinc-800
                          focus:outline-none
                          active:scale-95
                          ${
                            isActive
                              ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold shadow-md"
                              : "text-gray-200"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm tracking-wide">
                            {item.title}
                          </span>
                        </SidebarMenuButton>

                        {/* Dropdown */}
                        <div
                          className={`ml-6 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-300
                                    ${isOpen ?
                                    "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                          {item.children.map((child) => {
                            const isChildActive =
                              location.pathname === child.url;
                            return (
                              <Link
                                key={child.title}
                                to={child.url}
                                className={`relative text-[0.9rem] px-3 py-2 rounded-md transition-all duration-200
                                focus:outline-none
                                active:scale-95
                                ${
                                  isChildActive
                                    ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold shadow-md"
                                    : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                                }`}
                              >
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url!}
                          className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200
                          hover:bg-zinc-800
                          focus:outline-none
                          active:scale-95
                          ${
                            isActive
                              ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold shadow-md"
                              : "text-gray-200"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm tracking-wide">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
