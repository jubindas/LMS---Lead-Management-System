import { SidebarTrigger } from "./ui/sidebar";

export default function NavBar() {
  return (
    <nav className="sticky top-0 bg-zinc-200/60 backdrop-blur-md border-b border-zinc-400 px-6 py-3 h-[69px] shadow-lg flex items-center justify-between gap-4 z-50">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-black hover:text-zinc-900 transition-colors" />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-15 h-10 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90">
          Jubin
        </div>
      </div>
    </nav>
  );
}
