"use client";

import React from 'react';
import { LayoutDashboard, Activity, Box, ShieldCheck, DollarSign } from 'lucide-react';

interface SidebarProps {
    currentView: string;
    setCurrentView: (view: string) => void;
    t: any; // Translation object
}

export function Sidebar({ currentView, setCurrentView, t }: SidebarProps) {
    const navItems = [
        { id: 'overview', label: t.nav.overview, icon: <LayoutDashboard size={20} /> },
        { id: 'telemetry', label: t.nav.telemetry, icon: <Activity size={20} /> },
        { id: 'inventory', label: t.nav.inventory, icon: <Box size={20} /> },
        { id: 'food_safety', label: t.nav.food_safety, icon: <ShieldCheck size={20} /> },
        { id: 'financials', label: t.nav.financials, icon: <DollarSign size={20} /> },
    ];

    return (
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
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${currentView === item.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                        JD
                    </div>
                    <div>
                        <div className="text-sm font-medium">John Doe</div>
                        <div className="text-xs text-slate-500">{t.nav.owner}</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
