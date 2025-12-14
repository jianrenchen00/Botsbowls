"use client";

import React from 'react';
import { TrendingUp, Users, ShoppingBag, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { useSimulation } from '@/hooks/useSimulation';
import { RevenueChart } from '@/components/dashboard/RevenueChart';

export default function DemoPage() {
    const {
        revenue,
        activeBots,
        totalActiveFleet,
        totalOrders,
        recentEvents,
        revenueHistory,
        triggerLunchRush,
        isRushActive
    } = useSimulation();

    // Format revenue as currency
    const formattedRevenue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(revenue);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">Command Center</h2>
                    <div className="relative flex items-center justify-center w-3 h-3">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRushActive ? 'bg-orange-500' : 'bg-green-400'} opacity-75`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${isRushActive ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                    </div>
                    <span className={`text-xs font-mono uppercase tracking-widest ${isRushActive ? 'text-orange-500 font-bold animate-pulse' : 'text-green-400'}`}>
                        {isRushActive ? '🔥 PEAK TRAFFIC DETECTED' : 'Live System'}
                    </span>
                </div>

                <button
                    onClick={triggerLunchRush}
                    disabled={isRushActive}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                        ${isRushActive
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'}
                    `}
                >
                    <Zap size={16} className={isRushActive ? 'animate-pulse' : ''} />
                    {isRushActive ? 'Lunch Rush Active!' : 'Simulate Lunch Rush'}
                </button>
            </div>

            {/* Top Row: Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Total Revenue"
                    value={formattedRevenue}
                    trend={isRushActive ? "++34.2%" : "+12.5%"}
                    trendUp={true}
                    icon={<TrendingUp size={20} className="text-blue-400" />}
                    highlight={isRushActive}
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
                    subValue={isRushActive ? "High Volume" : "Today"}
                    icon={<ShoppingBag size={20} className="text-orange-400" />}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                {/* Revenue Chart - Takes up 2 columns */}
                <div className="lg:col-span-2 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                        Hourly Sales Performance
                        {isRushActive && <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">LIVE</span>}
                    </h3>
                    <div className="flex-1 w-full h-full bg-[#0F172A]/50 rounded-lg border border-slate-700/50 relative overflow-hidden">
                        <RevenueChart data={revenueHistory} />
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

function MetricCard({ title, value, subValue, trend, trendUp, icon, indicator, highlight }: any) {
    return (
        <div className={`
            bg-[#1E293B] border rounded-xl p-6 transition-all duration-300
            ${highlight ? 'border-orange-500/50 shadow-lg shadow-orange-500/10' : 'border-slate-700 hover:border-slate-600'}
        `}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm font-medium">{title}</span>
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <h3 className={`text-3xl font-bold tracking-tight ${highlight ? 'text-orange-50' : 'text-white'}`}>
                    {value}
                </h3>
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
