"use client";

import React from 'react';
import { TrendingUp, Users, ShoppingBag, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useSimulation } from '@/hooks/useSimulation';

export default function DemoPage() {
    const { revenue, activeBots, totalActiveFleet, totalOrders, recentEvents } = useSimulation();

    // Format revenue as currency
    const formattedRevenue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(revenue);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">Command Center</h2>
                <div className="relative flex items-center justify-center w-3 h-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span className="text-xs font-mono text-green-400 uppercase tracking-widest">Live System</span>
            </div>

            {/* Top Row: Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Total Revenue"
                    value={formattedRevenue}
                    trend="+12.5%"
                    trendUp={true}
                    icon={<TrendingUp size={20} className="text-blue-400" />}
                />
                <MetricCard
                    title="Active Fleet"
                    value={`${activeBots} / ${totalActiveFleet} Online`}
                    subValue="97% Uptime"
                    icon={<Users size={20} className="text-green-400" />}
                    indicator={activeBots > 125 ? 'green' : 'yellow'}
                />
                <MetricCard
                    title="Total Orders"
                    value={totalOrders.toLocaleString()}
                    subValue="Today"
                    icon={<ShoppingBag size={20} className="text-orange-400" />}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                {/* Revenue Chart Placeholder - Takes up 2 columns */}
                <div className="lg:col-span-2 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-200 mb-6">Hourly Sales Performance</h3>
                    <div className="flex-1 w-full h-full bg-[#0F172A]/50 rounded-lg flex items-center justify-center border border-slate-700 border-dashed relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-end justify-between px-8 pb-8 pt-20 gap-2 opacity-50">
                            {/* Fake bars for visualization */}
                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="w-full bg-blue-500/20 rounded-t-sm group-hover:bg-blue-500/30 transition-colors"></div>
                            ))}
                        </div>
                        <span className="relative z-10 text-slate-500 font-medium">Interactive Chart Component Placeholder</span>
                    </div>
                </div>

                {/* Live Alert Feed - Takes up 1 column */}
                <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-slate-200">Live Alerts</h3>
                        <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400">Real-time</span>
                    </div>

                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar fade-in-list">
                        {recentEvents.map((event) => (
                            <AlertItem
                                key={event.id}
                                type={event.type}
                                message={event.message}
                                time={event.time}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, subValue, trend, trendUp, icon, indicator }: any) {
    return (
        <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm font-medium">{title}</span>
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
                {indicator === 'green' && (
                    <span className="flex h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
                )}
            </div>
            {(subValue || trend) && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                    {trend && (
                        <span className={`${trendUp ? 'text-green-400' : 'text-red-400'} font-medium`}>
                            {trend}
                        </span>
                    )}
                    {subValue && <span className="text-slate-500">{subValue}</span>}
                </div>
            )}
        </div>
    );
}

function AlertItem({ type, message, time }: { type: 'warning' | 'success' | 'info', message: string, time: string }) {
    const styles = {
        warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
        success: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
        info: { icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    };
    const style = styles[type] || styles.info;
    const Icon = style.icon;

    return (
        <div className={`p-3 rounded-lg border ${style.bg} ${style.border} flex items-start gap-3`}>
            <Icon size={16} className={`mt-0.5 ${style.color}`} />
            <div className="flex-1">
                <p className="text-sm text-slate-300 leading-tight">{message}</p>
                <span className="text-xs text-slate-500 mt-1 block">{time}</span>
            </div>
        </div>
    );
}
