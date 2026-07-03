"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  Check 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { getSession, signOutUser, subscribeToAuth } from "@/lib/auth-client";

const getServerSession = () => null;

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "warning" | "error" | "info" | "success";
  time: string;
  read: boolean;
}

export const Navbar = () => {
  const router = useRouter();
  const session = useSyncExternalStore(subscribeToAuth, getSession, getServerSession);

  // Notifications dropdown states
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Critical Threat Blocked",
      message: "Credential harvesting payload identified on scan target.",
      type: "error",
      time: "5m ago",
      read: false,
    },
    {
      id: "2",
      title: "MFA Authentication Alert",
      message: "Security key signed from unknown browser device agent.",
      type: "warning",
      time: "24m ago",
      read: false,
    },
    {
      id: "3",
      title: "Neural Engine Synced",
      message: "Model precision recalibrated to 99.8% precision vector.",
      type: "info",
      time: "1h ago",
      read: true,
    },
    {
      id: "4",
      title: "Database Backup Success",
      message: "Compressed SQLite snapshot uploaded to production vault.",
      type: "success",
      time: "3h ago",
      read: true,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close notifications on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    signOutUser();
    router.push("/login");
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6 md:px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search emails, URLs, threats..." 
            className="w-full bg-slate-50 border border-slate-200/85 focus:bg-white focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all text-slate-900 text-xs focus:outline-none placeholder:text-slate-400 rounded-xl px-4 py-2.5 pl-10"
          />
        </div>
      </div>
      
      {/* Right Side Actions */}
      <div className="flex items-center gap-6 ml-6">
        
        {/* Notifications Button & Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <motion.button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative text-slate-400 hover:text-violet-600 transition-colors p-1.5 rounded-lg hover:bg-slate-50 ${showNotifications ? 'text-violet-600 bg-slate-50' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <motion.span 
                className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* Notifications Dropdown Panel */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-slate-250/80 shadow-2xl rounded-2xl overflow-hidden z-50 origin-top-right"
              >
                {/* Dropdown Header */}
                <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 select-none">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Alert Logs & Feeds</span>
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllRead}
                      className="text-[10px] text-violet-600 hover:text-violet-755 font-bold uppercase tracking-wider transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Dropdown Items list */}
                <div className="divide-y divide-slate-100 max-h-[320px] overflow-y-auto">
                  {notifications.map((item) => {
                    const IconComponent = 
                      item.type === "error" ? ShieldAlert :
                      item.type === "warning" ? AlertTriangle :
                      item.type === "success" ? CheckCircle2 : Info;
                    
                    const badgeColors = 
                      item.type === "error" ? "bg-rose-50 border-rose-100 text-rose-500" :
                      item.type === "warning" ? "bg-amber-50 border-amber-100 text-amber-600" :
                      item.type === "success" ? "bg-teal-50 border-teal-100 text-teal-600" :
                      "bg-violet-50 border-violet-100 text-violet-600";

                    return (
                      <div 
                        key={item.id}
                        onClick={() => handleNotificationClick(item.id)}
                        className={`p-4 flex items-start gap-3 hover:bg-slate-50/70 transition-colors cursor-pointer select-none relative ${!item.read ? 'bg-violet-50/10' : ''}`}
                      >
                        <div className={`p-2 rounded-xl border shrink-0 ${badgeColors}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold ${!item.read ? 'text-slate-850' : 'text-slate-700'}`}>{item.title}</p>
                          <p className="text-[10px] text-slate-500 leading-snug mt-0.5 font-semibold">{item.message}</p>
                          <span className="text-[9px] text-slate-400 font-mono block mt-1">{item.time}</span>
                        </div>
                        {!item.read && (
                          <span className="w-2 h-2 bg-violet-500 rounded-full shrink-0 self-center border border-white shadow-sm shadow-violet-500" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Empty State */}
                {notifications.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400 font-bold uppercase select-none">
                    No active notifications.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200/60" />

        {/* User Profile */}
        <motion.div 
          onClick={() => router.push("/dashboard/settings")}
          className="flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">{session?.fullName ?? "Security Admin"}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{session?.company ?? "Enterprise"}</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm border border-white/50 group-hover:shadow-glow transition-all"
          >
            <User className="w-5 h-5 text-white" />
          </div>
        </motion.div>

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
