import React from 'react';
import { Package, Droplets, Clock, TrendingDown } from 'lucide-react';

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
                        Soup Tank A Level
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
                    <p className="text-xs text-slate-500 z-10">Refill threshold: 15%</p>
                </div>

                {/* Noodle Hopper Card */}
                <div className="md:col-span-1 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                    <h3 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2">
                        <Package size={20} className="text-purple-400" />
                        Noodle Hopper Stock
                    </h3>

                    <div className="flex-1 flex flex-col justify-center space-y-4">
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Current Stock</span>
                            <span>{noodleStock.toFixed(0)} packs</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${noodleStock < 20 ? 'bg-red-500' : 'bg-purple-500'}`}
                                style={{ width: `${noodleStock}%` }}
                            ></div>
                        </div>

                        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            <div className="flex items-start gap-3">
                                <Clock size={16} className="text-slate-400 mt-1" />
                                <div>
                                    <div className="text-sm font-medium text-slate-300">Estimated Runout</div>
                                    <div className="text-2xl font-bold text-white">~4.2 hrs</div>
                                    <div className="text-xs text-slate-500">Based on current order velocity</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Consumption Rate */}
                <div className="md:col-span-1 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                    <h3 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2">
                        <TrendingDown size={20} className="text-green-400" />
                        Consumption Metrics
                    </h3>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-400 text-sm">Soup Consumption</span>
                            <span className="text-slate-200 font-mono">12.5 L/hr</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-400 text-sm">Noodle Consumption</span>
                            <span className="text-slate-200 font-mono">45 pks/hr</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-400 text-sm">Waste Factor</span>
                            <span className="text-green-400 font-mono">0.2% (Low)</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
