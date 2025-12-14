import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Thermometer, Zap, Activity, Cpu, Gauge, Server } from 'lucide-react';
import { MACHINES } from '../machineData';

interface TelemetryViewProps {
    t: any;
    freezerTemp: number;
    cookerTemp: number;
    motorLoad: number;
    powerUsage: number;
    motorHistory: number[];
}

export function TelemetryView({
    t,
    freezerTemp,
    cookerTemp,
    motorLoad,
    powerUsage,
    motorHistory
}: TelemetryViewProps) {
    const [selectedId, setSelectedId] = useState(MACHINES[0].id);
    const selectedMachine = MACHINES.find(m => m.id === selectedId) || MACHINES[0];

    // Generate data for Recharts
    const motorData = motorHistory.map((val, i) => ({ index: i, value: val }));

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6 pt-24 max-w-7xl mx-auto h-[calc(100vh-80px)]">
            {/* Sidebar */}
            <div className="w-full lg:w-72 shrink-0 bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col shadow-xl backdrop-blur-sm h-64 lg:h-auto">
                <div className="p-4 bg-slate-800/80 border-b border-slate-700 font-bold text-slate-200 flex items-center gap-2">
                    <Server size={18} className="text-blue-400" />
                    <span>Machines</span>
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
                                <Activity size={12} className="text-emerald-400" />
                                {selectedMachine.model}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-medium text-emerald-400">Live Telemetry</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* 1. Thermal Systems */}
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Thermometer size={120} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                            <Thermometer size={20} className="text-orange-400" />
                            {t.telemetry.thermal_control}
                        </h3>

                        <div className="space-y-6">
                            {/* Freezer */}
                            <div className="bg-[#0F172A] p-4 rounded-lg border border-slate-800">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-slate-400">{t.telemetry.freezer_temp}</span>
                                    <span className="text-xs font-mono text-blue-400">{t.telemetry.target}: -18.0°C</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className={`text-3xl font-mono font-bold ${freezerTemp > -15 ? 'text-red-500' : 'text-blue-500'}`}>
                                        {freezerTemp.toFixed(1)}°C
                                    </span>
                                </div>
                                {/* Visual Bar */}
                                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-500"
                                        style={{ width: `${Math.min(100, Math.max(0, (freezerTemp + 30) * 4))}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Cooker */}
                            <div className="bg-[#0F172A] p-4 rounded-lg border border-slate-800">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-slate-400">{t.telemetry.cooker_temp}</span>
                                    <span className="text-xs font-mono text-orange-400">{t.telemetry.target}: 95.0°C</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className={`text-3xl font-mono font-bold ${cookerTemp > 98 ? 'text-red-500' : 'text-orange-500'}`}>
                                        {cookerTemp.toFixed(1)}°C
                                    </span>
                                </div>
                                {/* Visual Bar */}
                                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                                    <div
                                        className="h-full bg-orange-500 transition-all duration-500"
                                        style={{ width: `${Math.min(100, Math.max(0, (cookerTemp - 20) * 1.2))}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Actuator Health */}
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                        <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                            <Cpu size={20} className="text-purple-400" />
                            {t.telemetry.actuator_load}
                        </h3>

                        <div className="flex-1 min-h-[180px] w-full bg-[#0F172A] rounded-lg border border-slate-800 p-4 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={motorData}>
                                    <defs>
                                        <linearGradient id="colorMotor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#A855F7"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorMotor)"
                                        isAnimationActive={false}
                                    />
                                    <YAxis domain={[0, 100]} hide />
                                </AreaChart>
                            </ResponsiveContainer>

                            <div className="absolute top-4 right-4 flex flex-col items-end">
                                <span className="text-4xl font-bold text-white">{motorLoad.toFixed(0)}%</span>
                                <span className="text-xs text-slate-400">{t.telemetry.current_load}</span>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-lg bg-[#0F172A] border border-slate-800">
                                <span className="text-xs text-slate-500 block">{t.telemetry.vibration}</span>
                                <span className="text-sm font-medium text-green-400">0.04 mm/s</span>
                            </div>
                            <div className="p-3 rounded-lg bg-[#0F172A] border border-slate-800">
                                <span className="text-xs text-slate-500 block">STATUS</span>
                                <span className="text-sm font-medium text-green-400">{t.telemetry.status_healthy}</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Power Consumption */}
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 relative overflow-hidden xl:col-span-2">
                        <div className="absolute bottom-0 right-0 p-4 opacity-5">
                            <Zap size={140} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                            <Zap size={20} className="text-yellow-400" />
                            {t.telemetry.power_metrics}
                        </h3>

                        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                            <div className="relative flex items-center justify-center w-48 h-48 rounded-full border-4 border-slate-700">
                                <div
                                    className="absolute inset-0 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin duration-3000"
                                    style={{ animationDuration: `${3000 / powerUsage}ms` }}
                                ></div>
                                <div className="text-center">
                                    <span className="block text-4xl font-bold text-white">{powerUsage.toFixed(2)}</span>
                                    <span className="text-sm text-yellow-400">kW/h</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="text-center">
                                    <span className="block text-slate-400 text-xs mb-1">{t.telemetry.daily_cost}</span>
                                    <span className="block text-2xl font-bold text-white">
                                        ${(powerUsage * 24 * 0.12).toFixed(2)}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-slate-400 text-xs mb-1">{t.telemetry.efficiency}</span>
                                    <span className="block text-2xl font-bold text-blue-400">98.2%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
