"use client";

import { Search, Bell, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { getSession, signOutUser, subscribeToAuth } from "@/lib/auth-client";

const getServerSession = () => null;

export const Navbar = () => {
  const router = useRouter();
  const session = useSyncExternalStore(subscribeToAuth, getSession, getServerSession);

  const handleLogout = () => {
    signOutUser();
    router.push("/login");
  };

  return (
    <header className="h-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6 md:px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search emails, URLs, threats..." 
            className="w-full bg-slate-50 border border-slate-200/85 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 text-xs focus:outline-none placeholder:text-slate-400 rounded-xl px-4 py-2.5 pl-10"
          />
        </div>
      </div>
      
      {/* Right Side Actions */}
      <div className="flex items-center gap-6 ml-6">
        {/* Notifications */}
        <motion.button 
          className="relative text-slate-400 hover:text-indigo-600 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <Bell className="w-5 h-5" />
          <motion.span 
            className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full animate-pulse"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200/60" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">{session?.fullName ?? "Security Admin"}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{session?.company ?? "Enterprise"}</p>
          </div>
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cursor-pointer shadow-sm border border-white/50"
            whileHover={{ scale: 1.05 }}
          >
            <User className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Logout */}
        <motion.button
          type="button"
          onClick={handleLogout}
          className="text-slate-400 hover:text-danger transition-colors"
          whileHover={{ scale: 1.1 }}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </div>
    </header>
  );
};
