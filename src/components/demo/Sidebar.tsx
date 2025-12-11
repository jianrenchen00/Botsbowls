"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Activity, Box, ShieldCheck, DollarSign, Map } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/demo" },
  { icon: Map, label: "Fleet Map", href: "/demo/map" },
  { icon: Box, label: "Inventory", href: "/demo/inventory" },
  { icon: ShieldCheck, label: "Safety", href: "/demo/safety" },
  { icon: DollarSign, label: "Financials", href: "/demo/finance" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-slate-900 border-r border-slate-800 text-white flex flex-col p-4">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-blue-500">B&B Command</h1>
        <p className="text-xs text-slate-500">Franchise OS v1.0</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-800">
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white px-2">
            <span>← Back to Website</span>
        </Link>
      </div>
    </div>
  );
}
