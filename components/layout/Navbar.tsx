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
    <header className="h-20 border-b border-white/10 bg-surface/50 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6 md:px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search emails, URLs, threats..." 
            className="w-full glass-sm px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
          />
        </div>
      </div>
      
      {/* Right Side Actions */}
      <div className="flex items-center gap-6 ml-6">
        {/* Notifications */}
        <motion.button 
          className="relative text-muted hover:text-primary transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <Bell className="w-5 h-5" />
          <motion.span 
            className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-white">{session?.fullName ?? "Security Admin"}</p>
            <p className="text-[10px] text-muted">{session?.company ?? "Enterprise"}</p>
          </div>
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <User className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Logout */}
        <motion.button
          type="button"
          onClick={handleLogout}
          className="text-muted hover:text-danger transition-colors"
          whileHover={{ scale: 1.1 }}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </div>
    </header>
  );
};
