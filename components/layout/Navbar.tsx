"use client";
import React from 'react';
import { Search, Bell, Command, SearchIcon, Activity, UserCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-16 border-b border-[#1E293B] bg-[#030712]/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* Enterprise Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search Intelligence (IPs, Hashes, Domains)..."
            className="w-full bg-[#0F172A] border border-[#1E293B] text-sm rounded-xl py-2 pl-10 pr-12 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-600"
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-1 opacity-50">
            <Command className="w-3 h-3" />
            <span className="text-[10px] font-bold">K</span>
          </div>
        </div>
      </div>

      {/* Action Center */}
      <div className="flex items-center gap-6">
        {/* API Health */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-success/5 border border-success/20 rounded-full">
          <Activity className="w-3 h-3 text-success animate-pulse" />
          <span className="text-[10px] font-bold text-success uppercase tracking-widest">API Online</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-[#030712]" />
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-[1px] bg-[#1E293B]" />

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity group">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-black tracking-tight leading-none mb-1">CYBER_OPS_ALPHA</span>
            <span className="text-[10px] text-primary font-bold uppercase tracking-tighter">Senior Analyst</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1E293B] to-[#334155] border border-[#1E293B] flex items-center justify-center group-hover:border-primary/50 transition-all">
            <UserCircle className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  );
}