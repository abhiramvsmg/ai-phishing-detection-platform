"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LayoutGrid, Globe, Mail, BarChart3, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const navItems = [
    { icon: LayoutGrid, label: 'Overview', href: '/dashboard' },
    { icon: Globe, label: 'Scanner', href: '/scanner' },
    { icon: Mail, label: 'Email AI', href: '/email' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="w-72 sidebar-glass h-screen flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-primary p-2 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <Shield className="text-black w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight uppercase">PhishGuard</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
              active ? 'bg-primary text-black font-bold shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5'
            }`}>
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <button className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-danger transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}