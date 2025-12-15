import React, { useState, useMemo, useEffect } from 'react';
import { Package, Droplets, Clock, TrendingDown, TrendingUp, AlertTriangle, Truck, PieChart, Activity, Server } from 'lucide-react';
import { MACHINES } from '../machineData';

interface InventoryViewProps {
    t: any;
    soupLevel: number;
    noodleStock: number;
}

export function InventoryView({ t, soupLevel: globalSoup, noodleStock: globalNoodle }: InventoryViewProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    const [selectedId, setSelectedId] = useState(MACHINES[0].id);
    const selectedMachine = MACHINES.find(m => m.id === selectedId) || MACHINES[0];

    // Dynamic Inventory Data
    const inventoryData = useMemo(() => {
        const seed = selectedId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const seededRandom = (offset: number) => {
            const x = Math.sin(seed + offset) * 10000;
            return x - Math.floor(x);
        };

        const soup = 15 + Math.floor(seededRandom(1) * 85); // 15-100%
        const isLow = soup < 25;

        return {
            soupLevel: soup,
            noodleStock: 10 + Math.floor(seededRandom(2) * 40),
            waste: {
                expired: 30 + Math.floor(seededRandom(3) * 30),
                fault: 10 + Math.floor(seededRandom(4) * 20),
                human: 10 + Math.floor(seededRandom(5) * 20),
            },
            supplyStatus: seededRandom(6) > 0.5 ? 'On Route' : 'Processing',
            supplyMin: 10 + Math.floor(seededRandom(7) * 30),
            isLow,
        };
    }, [selectedId]);

    if (!isMounted) return <div className="p-10 flex items-center justify-center text-slate-500 font-mono">Loading Inventory...</div>;

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4 pt-20 lg:pt-20 max-w-7xl mx-auto h-[calc(100vh-80px)]">
            {/* Sidebar */}
            <div className="w-full lg:w-72 shrink-0 bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col shadow-xl backdrop-blur-sm h-64 lg:h-auto">
                <div className="p-4 bg-slate-800/80 border-b border-slate-700 font-bold text-slate-200 flex items-center gap-2">
                    <Server size={18} className="text-blue-400" />
                    <span>{t.nav.machines}</span>
                </div>
                <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
                    {MACHINES.map(m => (
                        <button
                            key={m.id}
                            onClick={() => setSelectedId(m.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${selectedId === m.id
                                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/20'
                                : 'text-slate-400 hover:bg-slate-800 border-transparent hover:border-slate-700'
                                }`}
                        >
                            <div className="font-medium truncate">{m.name}</div>
                            <div className={`text-xs ${selectedId === m.id ? 'text-blue-200' : 'text-slate-500'} font-mono`}>{m.code}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col min-w-0 space-y-6 overflow-y-auto pb-20 pr-1">
                {/* Dynamic Header */}
                <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 backdrop-blur-sm shadow-sm flex flex-wrap gap-4 items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{selectedMachine.name}</h2>
                        <div className="flex items-center gap-3 text-slate-400 text-sm">
                            <span className="bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20 font-mono text-xs">{selectedMachine.code}</span>
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-700/50 border border-slate-600/50">
                                <Package size={12} className="text-emerald-400" />
                                {selectedMachine.model}
                            </span>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-full ${inventoryData.isLow ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${inventoryData.isLow ? 'bg-red-400' : 'bg-green-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${inventoryData.isLow ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        </span>
                        <span className={`text-xs font-medium ${inventoryData.isLow ? 'text-red-400' : 'text-green-400'}`}>
                            {inventoryData.isLow ? 'Low Stock Alert' : 'Inventory Live'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Soup Tank Card */}
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                        <h3 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2 z-10 w-full">
                            <Droplets size={20} className="text-amber-400" />
                            {t.inventory.soup_tank_level}
                        </h3>

                        {/* Tank Visualizer */}
                        <div className="w-24 h-64 bg-slate-800 rounded-full border-4 border-slate-700 relative overflow-hidden z-10">
                            {/* Liquid */}
                            <div
                                className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ease-in-out ${inventoryData.soupLevel < 25 ? 'bg-red-500/80' : 'bg-amber-500/80'}`}
                                style={{ height: `${inventoryData.soupLevel}%` }}
                            >
                                {/* Wave Effect */}
                                <div className={`absolute top-0 left-0 w-[200%] h-4 animate-wave -translate-y-1/2 ${inventoryData.soupLevel < 25 ? 'bg-red-400/50' : 'bg-amber-400/50'}`}></div>
                            </div>

                            {/* Measurement Lines */}
                            <div className="absolute top-[25%] left-0 w-full h-[1px] bg-slate-600/50"></div>
                            <div className="absolute top-[50%] left-0 w-full h-[1px] bg-slate-600/50"></div>
                            <div className="absolute top-[75%] left-0 w-full h-[1px] bg-slate-600/50"></div>
                        </div>

                        <div className={`mt-4 text-3xl font-bold z-10 ${inventoryData.soupLevel < 25 ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
                            {inventoryData.soupLevel.toFixed(1)}%
                        </div>
                        <p className="text-xs text-slate-500 z-10">{t.inventory.refill_threshold}</p>
                    </div>

                    {/* AI Forecast */}
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
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
                            {inventoryData.isLow && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg">
                                    {t.inventory.alert_restock_today}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Waste Analysis */}
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                        <h3 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2">
                            <AlertTriangle size={20} className="text-red-400" />
                            {t.inventory.waste_title}
                        </h3>
                        <div className="space-y-4">
                            {/* Expired */}
                            <div>
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="text-slate-400">{t.inventory.waste_reason_expired}</span>
                                    <span className="text-white font-mono">{inventoryData.waste.expired}%</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <div className="h-full bg-red-500" style={{ width: `${inventoryData.waste.expired}%` }}></div>
                                </div>
                            </div>
                            {/* Fault */}
                            <div>
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="text-slate-400">{t.inventory.waste_reason_fault}</span>
                                    <span className="text-white font-mono">{inventoryData.waste.fault}%</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <div className="h-full bg-orange-500" style={{ width: `${inventoryData.waste.fault}%` }}></div>
                                </div>
                            </div>
                            {/* Human Error */}
                            <div>
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="text-slate-400">{t.inventory.waste_reason_human}</span>
                                    <span className="text-white font-mono">{inventoryData.waste.human}%</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <div className="h-full bg-slate-500" style={{ width: `${inventoryData.waste.human}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Supply Chain */}
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                        <h3 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2">
                            <Truck size={20} className="text-emerald-400" />
                            {t.inventory.supply_title}
                        </h3>
                        <div className="relative pt-6 px-4 pb-4 bg-slate-800/30 rounded-lg border border-slate-700/50 flex-1 flex flex-col justify-center">
                            <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#1E293B] px-2 text-xs text-emerald-400 border border-emerald-500/30 rounded-full">
                                {inventoryData.supplyStatus}
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-slate-300 font-medium">
                                    {t.inventory.supply_status.replace('{min}', inventoryData.supplyMin)}
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
        </div>
    );
}
