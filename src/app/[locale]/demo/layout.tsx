import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Activity, Box, ShieldCheck, DollarSign, Menu, Bell } from 'lucide-react';

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0F172A] border-r border-slate-800 flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        Bots & Bowls
                    </span>
                    <span className="ml-2 text-xs text-slate-500 bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded">
                        OMS
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <NavItem icon={<Activity size={20} />} label="Telemetry" />
                    <NavItem icon={<Box size={20} />} label="Inventory" />
                    <NavItem icon={<ShieldCheck size={20} />} label="Food Safety" />
                    <NavItem icon={<DollarSign size={20} />} label="Financials" />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                            JD
                        </div>
                        <div>
                            <div className="text-sm font-medium">John Doe</div>
                            <div className="text-xs text-slate-500">Franchise Owner</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-slate-400 hover:text-white">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-semibold text-slate-200">Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-xs font-medium text-blue-400">Simulation Mode: Active</span>
                        </div>
                        <button className="relative text-slate-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-[#0F172A]"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto bg-[#0F172A]">
                    {children}
                </main>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <button
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
        >
            {icon}
            {label}
        </button>
    );
}
