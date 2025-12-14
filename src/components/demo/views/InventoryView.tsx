import React from 'react';
import { Package, Droplets, Clock, TrendingDown, TrendingUp, AlertTriangle, Truck, PieChart, Activity } from 'lucide-react';

interface InventoryViewProps {
    t: any;
    soupLevel: number;
    noodleStock: number;
}

export function InventoryView({ t, soupLevel, noodleStock }: InventoryViewProps) {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                <Package className="text-blue-400" />
                {t.nav.inventory}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Soup Tank Card */}
                <div className="md:col-span-1 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <h3 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2 z-10">
                        <Droplets size={20} className="text-amber-400" />
                        {t.inventory.soup_tank_level}
                    </h3>

                    {/* Tank Visualizer */}
                    <div className="w-24 h-64 bg-slate-800 rounded-full border-4 border-slate-700 relative overflow-hidden z-10">
                        {/* Liquid */}
                        <div
                            className="absolute bottom-0 left-0 w-full bg-amber-500/80 transition-all duration-1000 ease-in-out"
                            style={{ height: `${soupLevel}%` }}
                        >
                            {/* Wave Effect */}
                            <div className="absolute top-0 left-0 w-[200%] h-4 bg-amber-400/50 animate-wave -translate-y-1/2"></div>
                        </div>

                        {/* Measurement Lines */}
                        <div className="absolute top-[25%] left-0 w-full h-[1px] bg-slate-600/50"></div>
                        <div className="absolute top-[50%] left-0 w-full h-[1px] bg-slate-600/50"></div>
                        <div className="absolute top-[75%] left-0 w-full h-[1px] bg-slate-600/50"></div>
                    </div>

                    <div className="mt-4 text-3xl font-bold text-slate-200 z-10">
                        {soupLevel.toFixed(1)}%
                    </div>
                    <p className="text-xs text-slate-500 z-10">{t.inventory.refill_threshold}</p>
                </div>

                {/* AI Forecast */}
                <div className="md:col-span-1 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                    <h3 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-cyan-400" />
                        {t.inventory.forecast_title}
                    </h3>
                    <div className="flex-1 relative h-32 w-full border-b border-l border-slate-700 mb-4 p-2">
                        {/* Legend */}
                        <div className="absolute top-0 right-0 flex flex-col items-end text-[10px] gap-1">
                            <div className="flex items-center gap-1"><div className="w-2 h-0.5 bg-blue-400"></div> {t.inventory.forecast_legend_stock}</div>
                            <div className="flex items-center gap-1"><div className="w-2 h-0.5 bg-red-400 border-b border-dotted"></div> {t.inventory.forecast_legend_demand}</div>
                        </div>

                        {/* Lines Mock (SVG for easier drawing) */}
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* Stock Line (Blue) - Dropping */}
                            <path d="M0,20 C30,30 60,70 100,90" fill="none" stroke="#60A5FA" strokeWidth="2" />
                            {/* Demand Line (Red Dotted) - Rising */}
                            <path d="M0,80 C30,70 60,30 100,10" fill="none" stroke="#F87171" strokeWidth="2" strokeDasharray="4,4" />
                            {/* Intersection Dot */}
                            <circle cx="50" cy="50" r="3" fill="#EF4444" className="animate-pulse" />
                        </svg>

                        {/* Alert Label */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg">
                            {t.inventory.alert_restock_today}
                        </div>
                    </div>
                </div>

                {/* Waste Analysis */}
                <div className="md:col-span-1 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                    <h3 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-red-400" />
                        {t.inventory.waste_title}
                    </h3>
                    <div className="space-y-4">
                        {/* Expired */}
                        <div>
                            <div className="flex justify-between items-center text-sm mb-1">
                                <span className="text-slate-400">{t.inventory.waste_reason_expired}</span>
                                <span className="text-white font-mono">50%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div className="h-full bg-red-500 w-[50%]"></div>
                            </div>
                        </div>
                        {/* Fault */}
                        <div>
                            <div className="flex justify-between items-center text-sm mb-1">
                                <span className="text-slate-400">{t.inventory.waste_reason_fault}</span>
                                <span className="text-white font-mono">30%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div className="h-full bg-orange-500 w-[30%]"></div>
                            </div>
                        </div>
                        {/* Human Error */}
                        <div>
                            <div className="flex justify-between items-center text-sm mb-1">
                                <span className="text-slate-400">{t.inventory.waste_reason_human}</span>
                                <span className="text-white font-mono">20%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div className="h-full bg-slate-500 w-[20%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Supply Chain */}
                <div className="md:col-span-1 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                    <h3 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2">
                        <Truck size={20} className="text-emerald-400" />
                        {t.inventory.supply_title}
                    </h3>
                    <div className="relative pt-6 px-4 pb-4 bg-slate-800/30 rounded-lg border border-slate-700/50 flex-1 flex flex-col justify-center">
                        <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#1E293B] px-2 text-xs text-emerald-400 border border-emerald-500/30 rounded-full">
                            On Route
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-300 font-medium">
                                {t.inventory.supply_status.replace('{min}', '15')}
                            </span>
                        </div>
                        <div className="w-full h-3 bg-slate-700 rounded-full relative mb-2">
                            <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full w-[75%]"></div>
                            {/* Truck Icon on Bar */}
                            <div className="absolute top-1/2 left-[75%] -translate-y-1/2 -translate-x-1/2 bg-slate-900 p-1 rounded-full border border-emerald-500 text-emerald-400">
                                <Truck size={12} fill="currentColor" />
                            </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider">
                            <span>Depot</span>
                            <span>Store</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
