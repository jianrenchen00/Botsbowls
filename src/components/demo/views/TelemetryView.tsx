import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Thermometer, Zap, Activity, Cpu, Gauge } from 'lucide-react';

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
    // Generate data for Recharts
    const motorData = motorHistory.map((val, i) => ({ index: i, value: val }));

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Activity className="text-blue-500" />
                        {t.nav.telemetry || "System Telemetry"}
                    </h2>
                    <p className="text-slate-400 mt-1">{t.telemetry.telemetry_subtitle}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-xs font-medium text-green-400">{t.telemetry.conn_est}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Thermal Systems (Bento Card) */}
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
                                    style={{ width: `${Math.min(100, Math.max(0, (freezerTemp + 30) * 4))}%` }} // Scale roughly -30 to -5
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

                {/* 2. Actuator Health (Sparkline) */}
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
                <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-4 opacity-5">
                        <Zap size={140} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                        <Zap size={20} className="text-yellow-400" />
                        {t.telemetry.power_metrics}
                    </h3>

                    <div className="flex flex-col items-center justify-center py-8">
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
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center">
                            <span className="block text-slate-400 text-xs">{t.telemetry.daily_cost}</span>
                            <span className="block text-xl font-bold text-white">
                                ${(powerUsage * 24 * 0.12).toFixed(2)}
                            </span>
                        </div>
                        <div className="text-center">
                            <span className="block text-slate-400 text-xs">{t.telemetry.efficiency}</span>
                            <span className="block text-xl font-bold text-blue-400">98.2%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
