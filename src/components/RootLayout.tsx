import { Outlet } from "react-router-dom";

import { SidebarProvider } from "./ui/sidebar";

import { AppSidebar } from "./AppSidebar";

import { Toaster } from "sonner";


import NavBar from "./NavBar.tsx";

export default function RootLayout() {
  return (
    <SidebarProvider >
      <AppSidebar  />
      <main className="w-full bg-zinc-100">
        <NavBar />
        <Outlet />
      </main>
       <Toaster position="top-right" />
    </SidebarProvider>
  );
}
