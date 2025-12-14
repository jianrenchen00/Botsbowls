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
            {/* Mobile Menu Overlay - EMERGENCY FIX */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[9999] bg-slate-900 p-6 md:hidden flex flex-col animate-in fade-in duration-200">
                    <div className="flex justify-end mb-8">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-white p-2 hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        <button
                            className={`text-2xl font-bold text-left transition-colors ${currentView === 'overview' ? 'text-blue-400' : 'text-white'}`}
                            onClick={() => { setCurrentView('overview'); setIsMobileMenuOpen(false); }}
                        >
                            {t.nav.overview || 'Overview'}
                        </button>

                        <button
                            className={`text-2xl font-bold text-left transition-colors ${currentView === 'telemetry' ? 'text-blue-400' : 'text-white'}`}
                            onClick={() => { setCurrentView('telemetry'); setIsMobileMenuOpen(false); }}
                        >
                            {t.nav.telemetry || 'Telemetry'}
                        </button>

                        <button
                            className={`text-2xl font-bold text-left transition-colors ${currentView === 'inventory' ? 'text-blue-400' : 'text-white'}`}
                            onClick={() => { setCurrentView('inventory'); setIsMobileMenuOpen(false); }}
                        >
                            {t.nav.inventory || 'Inventory'}
                        </button>

                        <button
                            className={`text-2xl font-bold text-left transition-colors ${currentView === 'food_safety' ? 'text-blue-400' : 'text-white'}`}
                            onClick={() => { setCurrentView('food_safety'); setIsMobileMenuOpen(false); }}
                        >
                            {t.nav.food_safety || 'Food Safety'}
                        </button>

                        <button
                            className={`text-2xl font-bold text-left transition-colors ${currentView === 'financials' ? 'text-blue-400' : 'text-white'}`}
                            onClick={() => { setCurrentView('financials'); setIsMobileMenuOpen(false); }}
                        >
                            {t.nav.financials || 'Financials'}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
