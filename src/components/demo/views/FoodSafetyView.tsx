import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Legend } from 'recharts';
import { ShieldCheck, FileCheck, ThermometerSnowflake, Download, CheckCircle2 } from 'lucide-react';

interface FoodSafetyViewProps {
    t: any;
    cleaningLog: { id: string, time: string, action: string, status: 'Verified' | 'Pending' }[];
}

// Mock Data for 24h Temperature Log (Showing stability + Defrost spike)
const TEMP_DATA = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    // Simulate a Defrost Cycle at 3 AM
    const isDefrost = hour === 3;

    return {
        time: `${hour.toString().padStart(2, '0')}:00`,
        freezer: isDefrost ? -5 : -18 + (Math.random() * 0.5 - 0.25), // Spike to -5 during defrost
        cooker: 95 + (Math.random() * 1 - 0.5),
        limitFreezer: -10, // HACCP Limit
        limitCooker: 85   // HACCP Limit
    };
});

export function FoodSafetyView({ t, cleaningLog }: FoodSafetyViewProps) {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <ShieldCheck className="text-green-500" />
                        {t.nav.food_safety || "Food Safety & HACCP"}
                    </h2>
                    <p className="text-slate-400 mt-1">Automated hygiene compliance & audit logging</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
                        <ShieldCheck size={18} className="text-green-500" />
                        <span className="text-sm font-bold text-green-400">HACCP COMPLIANT</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. 24h Temperature Log (Span 2 Columns) */}
                <div className="lg:col-span-2 bg-[#1E293B] border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                            <ThermometerSnowflake size={20} className="text-blue-400" />
                            24h Critical Control Points (CCP)
                        </h3>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors border border-slate-700">
                            <Download size={14} />
                            Export PDF Report
                        </button>
                    </div>

                    <div className="h-[300px] w-full bg-[#0F172A] rounded-lg border border-slate-800 p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={TEMP_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickMargin={10} />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                                    itemStyle={{ color: '#f1f5f9' }}
                                />
                                <Legend />
                                {/* Freezer Line */}
                                <Line type="step" dataKey="freezer" name="Freezer A (°C)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                <ReferenceLine y={-10} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'Max Limit', fill: '#ef4444', fontSize: 10 }} />

                                {/* Cooker Line */}
                                <Line type="monotone" dataKey="cooker" name="Cooker Unit (°C)" stroke="#f97316" strokeWidth={2} dot={false} />
                                <ReferenceLine y={85} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'Min Limit', fill: '#ef4444', fontSize: 10 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Freezer A (-18°C Target)</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Cooker Unit (95°C Target)</span>
                    </div>
                </div>

                {/* 2. Automated Cleaning Audit Log (Span 1 Column) */}
                <div className="lg:col-span-1 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col h-[420px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                            <FileCheck size={20} className="text-emerald-400" />
                            Cleaning Audit Trail
                        </h3>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">LIVE</span>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                        {cleaningLog.map((log) => (
                            <div key={log.id} className="bg-[#0F172A] p-3 rounded-lg border border-slate-800 flex items-start gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                                <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-slate-200">{log.action}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-500">{log.time}</span>
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-500 bg-emerald-950/30 px-1.5 rounded">
                                            {log.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Certificate Banner */}
            <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900 border border-emerald-500/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/20 p-3 rounded-full border border-emerald-500/30">
                        <ShieldCheck size={32} className="text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white">ISO 22000 & HACCP Compliance Certified</h4>
                        <p className="text-sm text-slate-400">This system continuously monitors compliance with international food safety standards.</p>
                    </div>
                </div>
                <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-emerald-500/20">
                    View Certificate
                </button>
            </div>
        </div>
    );
}
