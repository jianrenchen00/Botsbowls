"use client";
import { LayoutDashboard, Server, Activity, DollarSign, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/demo" },
    { icon: Server, label: "Fleet", href: "/demo/fleet" },
    { icon: Activity, label: "Activity", href: "/demo/activity" },
    { icon: AlertTriangle, label: "Alerts", href: "/demo/alerts" },
    { icon: DollarSign, label: "Financials", href: "/demo/financials" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-screen fixed left-0 top-0 z-50">
            {/* Logo Area */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                        BB
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        OS v2.0
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-white"}`} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Status */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-slate-200">System Online</p>
                        <p className="text-xs text-slate-500">Latency: 24ms</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
