"use client";

import React, { useState } from 'react';
import { Menu, Bell, Zap, Wrench, AlertOctagon, X, LayoutDashboard, Activity, Box, ShieldCheck, DollarSign } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface HeaderProps {
    t: any;
    isCritical: boolean;
    isRushActive: boolean;
    triggerLunchRush: () => void;
    triggerFault: () => void;
    resolveFault: () => void;
    currentView: string;
    setCurrentView: (view: string) => void;
}

export function Header({
    t,
    isCritical,
    isRushActive,
    triggerLunchRush,
    triggerFault,
    resolveFault,
    currentView,
    setCurrentView
}: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="h-16 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-all">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-lg font-semibold text-slate-200">{t.status.command_center}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-medium text-blue-400">{t.status.live_system}</span>
                </div>
                <button className="relative text-slate-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-[#0F172A]"></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="relative w-72 bg-[#0F172A] border-r border-slate-800 shadow-2xl animate-in slide-in-from-left duration-200 flex flex-col h-full">
                        <div className="h-16 flex items-center justify-end px-4 border-b border-slate-800">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-slate-400 hover:text-white p-2"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <nav className="p-4 space-y-2">
                                <button
                                    onClick={() => { setCurrentView('overview'); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                >
                                    <LayoutDashboard size={20} />
                                    {t.nav.overview}
                                </button>
                                <button
                                    onClick={() => { setCurrentView('telemetry'); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'telemetry' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                >
                                    <Activity size={20} />
                                    {t.nav.telemetry}
                                </button>
                                <button
                                    onClick={() => { setCurrentView('inventory'); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'inventory' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                >
                                    <Box size={20} />
                                    {t.nav.inventory}
                                </button>
                                <button
                                    onClick={() => { setCurrentView('food_safety'); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'food_safety' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                >
                                    <ShieldCheck size={20} />
                                    {t.nav.food_safety}
                                </button>
                                <button
                                    onClick={() => { setCurrentView('financials'); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === 'financials' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                >
                                    <DollarSign size={20} />
                                    {t.nav.financials}
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
