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
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-all">
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
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
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
            {/* Mobile Menu - Glassmorphism Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[9999] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-slate-950 border-l border-slate-700 shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
                            <div>
                                <h3 className="text-lg font-bold text-white tracking-widest uppercase">
                                    <span className="text-orange-500">Bots</span> & Bowls
                                </h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-xs font-mono text-green-400">SIMULATION MODE</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation List */}
                        <div className="flex flex-col gap-2">
                            <button
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${currentView === 'overview' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                onClick={() => { setCurrentView('overview'); setIsMobileMenuOpen(false); }}
                            >
                                <LayoutDashboard size={20} />
                                {t.nav.overview || 'Overview'}
                            </button>

                            <button
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${currentView === 'telemetry' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                onClick={() => { setCurrentView('telemetry'); setIsMobileMenuOpen(false); }}
                            >
                                <Activity size={20} />
                                {t.nav.telemetry || 'Telemetry'}
                            </button>

                            <button
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${currentView === 'inventory' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                onClick={() => { setCurrentView('inventory'); setIsMobileMenuOpen(false); }}
                            >
                                <Box size={20} />
                                {t.nav.inventory || 'Inventory'}
                            </button>

                            <button
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${currentView === 'food_safety' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                onClick={() => { setCurrentView('food_safety'); setIsMobileMenuOpen(false); }}
                            >
                                <ShieldCheck size={20} />
                                {t.nav.food_safety || 'Food Safety'}
                            </button>

                            <button
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${currentView === 'financials' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                                onClick={() => { setCurrentView('financials'); setIsMobileMenuOpen(false); }}
                            >
                                <DollarSign size={20} />
                                {t.nav.financials || 'Financials'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
