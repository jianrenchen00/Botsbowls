import React from 'react';
import { TrendingUp, Users, ShoppingBag, AlertTriangle, CheckCircle2, AlertOctagon, Globe, Award, ShieldCheck } from 'lucide-react';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ControlPanel } from '@/components/demo/ControlPanel';
import { FleetStatusTable } from '@/components/demo/views/FleetStatusTable';
import { PaymentHealthCard } from '@/components/demo/views/PaymentHealthCard';

interface OverviewViewProps {
    t: any;
    formattedRevenue: string;
    activeBots: number;
    totalActiveFleet: number;
    totalOrders: number;
    isRushActive: boolean;
    isCritical: boolean;
    systemStatus: 'normal' | 'rush' | 'critical';
    triggerLunchRush: () => void;
    triggerFault: () => void;
    resolveFault: () => void;
    revenueHistory: any[];
    recentEvents: any[];
}

export function OverviewView({
    t,
    formattedRevenue,
    activeBots, // Ignoring this prop now
    totalActiveFleet,
    totalOrders,
    isRushActive,
    isCritical,
    systemStatus,
    triggerLunchRush,
    triggerFault,
    resolveFault,
    revenueHistory,
    recentEvents
}: OverviewViewProps) {

    // Centralized Fleet Data for Consistency
    const FLEET_DATA = [
        { id: "ZNS-001", location: "loc_louvre", type: "type_znsmj", revenue: 1480, status: "status_busy", portions: 8, aov: 15.50, addon: "addon_coke", channel: "app" },
        { id: "ZNS-002", location: "loc_arc", type: "type_znsmj", revenue: 1250, status: "status_online", portions: 45, aov: 13.20, addon: "addon_egg", channel: "kiosk" },
        { id: "ZNS-003", location: "loc_concorde", type: "type_znsmj", revenue: 980, status: "status_online", portions: 62, aov: 12.80, addon: "addon_tea", channel: "web" },
        { id: "ZNS-004", location: "loc_bastille", type: "type_znsmj", revenue: 1120, status: "status_online", portions: 33, aov: 13.50, addon: "addon_tofu", channel: "3rd" },
        { id: "ZNS-005", location: "loc_montmartre", type: "type_znsmj", revenue: 0, status: "status_maintenance", portions: 0, aov: 0, addon: "--", channel: "--" },
        { id: "INT-101", location: "loc_tower", type: "type_integrated", revenue: 2100, status: "status_busy", portions: 15, aov: 16.20, addon: "addon_egg", channel: "kiosk" },
        { id: "INT-102", location: "loc_champs", type: "type_integrated", revenue: 1850, status: "status_online", portions: 55, aov: 14.50, addon: "addon_coke", channel: "app" },
        { id: "INT-103", location: "loc_defense", type: "type_integrated", revenue: 1600, status: "status_online", portions: 42, aov: 15.00, addon: "addon_tea", channel: "kiosk" },
        { id: "INT-104", location: "loc_opera", type: "type_integrated", revenue: 1720, status: "status_online", portions: 28, aov: 13.90, addon: "addon_tofu", channel: "3rd" },
        { id: "DRK-201", location: "loc_marais", type: "type_drink", revenue: 450, status: "status_online", portions: 120, aov: 4.50, addon: "--", channel: "kiosk" },
        { id: "DRK-202", location: "loc_latin", type: "type_drink", revenue: 520, status: "status_online", portions: 85, aov: 5.20, addon: "--", channel: "web" },
        { id: "ROB-301", location: "loc_cdg1", type: "type_robot", revenue: 3200, status: "status_busy", portions: 42, aov: 18.50, addon: "addon_egg", channel: "kiosk" },
        { id: "ROB-302", location: "loc_cdg2", type: "type_robot", revenue: 2950, status: "status_online", portions: 150, aov: 17.90, addon: "addon_tofu", channel: "app" },
    ];

    const calculatedActiveBots = FLEET_DATA.filter(u => u.status !== 'status_maintenance').length;

    return (
        <div className="p-6 pt-24 max-w-7xl mx-auto space-y-6">
            {/* User Profile Bar */}
            <div className="bg-slate-900/60 border-y border-slate-700 backdrop-blur-md -mx-6 px-6 py-4 mb-6 flex flex-col md:flex-row gap-6 md:items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700">
                {/* User Info */}
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-blue-500/10 rounded-full text-blue-400 border border-blue-500/20 ring-1 ring-blue-500/10">
                        <div className="relative">
                            <Users size={20} />
                            <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-lg tracking-tight">ParisChen</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/20">PRO</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">{t.profile.rank}</div>
                    </div>
                </div>

                <div className="h-10 w-px bg-slate-700 hidden md:block"></div>

                {/* Score Hero */}
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/5 rounded-lg border border-amber-500/20">
                        <Award size={24} className="text-amber-400" />
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">98.5</span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.profile.score_label}</span>
                        </div>
                        <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                            <TrendingUp size={12} />
                            {t.profile.beaten}
                        </div>
                    </div>
                </div>

                <div className="h-10 w-px bg-slate-700 hidden md:block"></div>

                {/* System Status */}
                <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center w-10 h-10">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-20"></div>
                        <div className="relative p-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400">
                            <ShieldCheck size={20} />
                        </div>
                    </div>
                    <div>
                        <div className="text-slate-200 font-bold">{t.profile.sys_optimal}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            All Systems Normal
                        </div>
                    </div>
                </div>
            </div>
            {/* Top Row: Metrics & Control Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                <MetricCard
                    title={t.metrics.total_revenue}
                    value={formattedRevenue}
                    trend={isCritical ? "-20.0% Efficiency" : isRushActive ? "++34.2%" : "+12.5%"}
                    trendUp={!isCritical}
                    icon={<TrendingUp size={20} className="text-blue-400" />}
                    highlight={isRushActive && !isCritical}
                    alertState={isCritical}
                />
                <MetricCard
                    title={t.metrics.active_fleet}
                    value={`${calculatedActiveBots} / 13 ${t.metrics.online}`}
                    subValue={isCritical ? t.metrics.unit_offline : `97% ${t.metrics.uptime}`}
                    icon={< Users size={20} className={isCritical ? "text-red-500" : "text-green-400"} />}
                    indicator={isCritical ? 'red' : (calculatedActiveBots < 13 ? 'yellow' : 'green')}
                    alertState={isCritical}
                />
                <MetricCard
                    title={t.metrics.total_orders}
                    value={totalOrders.toLocaleString()}
                    subValue={isRushActive ? t.metrics.high_volume : t.metrics.today}
                    icon={<ShoppingBag size={20} className="text-orange-400" />}
                    alertState={isCritical}
                />
                <ControlPanel
                    t={t}
                    isRushActive={isRushActive}
                    triggerLunchRush={triggerLunchRush}
                    systemStatus={systemStatus}
                    triggerFault={triggerFault}
                    resolveFault={resolveFault}
                />
                <PaymentHealthCard t={t} />
            </div>

            {/* Fleet Status Table */}
            <FleetStatusTable t={t} data={FLEET_DATA} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:col-span-2 xl:grid-cols-4 gap-6 xl:h-[500px]">
                {/* Revenue Chart - Takes up 3 columns on Desktop, 2 on Tablet (full row) */}
                <div className="md:col-span-2 xl:col-span-3 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col min-h-[400px] xl:min-h-0">
                    <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                        {t.status.hourly_sales}
                        {isRushActive && !isCritical && <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">LIVE</span>}
                        {isCritical && <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full animate-pulse">{t.status.system_alert}</span>}
                    </h3>
                    <div className={`flex-1 w-full h-full bg-[#0F172A]/50 rounded-lg border ${isCritical ? 'border-red-500/30' : 'border-slate-700/50'} relative overflow-hidden transition-colors duration-500`}>
                        <RevenueChart data={revenueHistory} />
                    </div>
                </div>

                {/* Live Alert Feed - Takes up 1 column on Desktop, 2 on Tablet (full row) */}
                <div className="md:col-span-2 xl:col-span-1 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col min-h-[400px] xl:min-h-0">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-slate-200">{t.status.live_alerts}</h3>
                        <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400">{t.status.real_time}</span>
                    </div>

                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar fade-in-list">
                        {recentEvents.map((event: any) => (
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

function MetricCard({ title, value, subValue, trend, trendUp, icon, indicator, highlight, alertState }: any) {
    return (
        <div className={`
            bg-[#1E293B] border rounded-xl p-6 transition-all duration-300
            ${alertState ? 'border-red-500 shadow-lg shadow-red-500/20' : highlight ? 'border-orange-500/50 shadow-lg shadow-orange-500/10' : 'border-slate-700 hover:border-slate-600'}
        `}>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400 text-sm font-medium">{title}</span>
                    <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                        {icon}
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <h3 className={`text-3xl font-bold tracking-tight ${alertState ? 'text-red-400' : highlight ? 'text-orange-50' : 'text-white'}`}>
                        {value}
                    </h3>
                    {indicator === 'green' && (
                        <span className="flex h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
                    )}
                    {indicator === 'red' && (
                        <span className="flex h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"></span>
                    )}
                    {indicator === 'yellow' && (
                        <span className="flex h-3 w-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></span>
                    )}
                </div>
                {(subValue || trend) && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                        {trend && (
                            <span className={`${trendUp ? 'text-green-400' : 'text-red-400'} font-medium`}>
                                {trend}
                            </span>
                        )}
                        {subValue && <span className={`${alertState ? 'text-red-400/80' : 'text-slate-500'}`}>{subValue}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}

function AlertItem({ type, message, time }: { type: 'warning' | 'success' | 'info' | 'critical', message: string, time: string }) {
    const styles = {
        warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
        success: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
        info: { icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
        critical: { icon: AlertOctagon, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    };
    const style = styles[type] || styles.info;
    const Icon = style.icon;

    return (
        <div className={`p-3 rounded-lg border ${style.bg} ${style.border} flex items-start gap-3`}>
            <Icon size={16} className={`mt-0.5 ${style.color}`} />
            <div className="flex-1">
                <p className={`text-sm leading-tight ${type === 'critical' ? 'text-red-200 font-medium' : 'text-slate-300'}`}>{message}</p>
                <span className="text-xs text-slate-500 mt-1 block">{time}</span>
            </div>
        </div>
    );
}
