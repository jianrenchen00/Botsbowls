"use client";

import React, { useState, use } from 'react';
import { TrendingUp, Users, ShoppingBag, AlertTriangle, CheckCircle2, Construction, AlertOctagon } from 'lucide-react';
import { useSimulation } from '@/hooks/useSimulation';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { DEMO_TRANSLATIONS, DemoTranslationKey } from './translations';
import { Sidebar } from '@/components/demo/Sidebar';
import { Header } from '@/components/demo/Header';
import { ControlPanel } from '@/components/demo/ControlPanel';
import { InventoryView } from '@/components/demo/views/InventoryView';
import { TelemetryView } from '@/components/demo/views/TelemetryView';
import { FoodSafetyView } from '@/components/demo/views/FoodSafetyView';
import { FinancialView } from '@/components/demo/views/FinancialView';
import { FleetStatusTable } from '@/components/demo/views/FleetStatusTable';
import { PaymentHealthCard } from '@/components/demo/views/PaymentHealthCard';

type Props = { params: Promise<{ locale: string }> };

export default function DemoPage({ params }: Props) {
    // 1. Unwrap Promise
    const resolvedParams = use(params);
    const locale = resolvedParams.locale || 'en';

    // 2. Safe Translation Lookup
    // Fallback to English if the specific locale is missing keys
    const tRaw = DEMO_TRANSLATIONS[locale as keyof typeof DEMO_TRANSLATIONS] || DEMO_TRANSLATIONS.en;

    // 3. Deep Merge / Safety Patch
    // This ensures t.construction ALWAYS exists, even if missing in zh-TW
    const t = {
        ...DEMO_TRANSLATIONS.en, // Start with English as base (guarantees all keys exist)
        ...tRaw,                 // Override with localized strings
        construction: tRaw.construction || DEMO_TRANSLATIONS.en.construction, // Double safety
        financials: tRaw.financials || DEMO_TRANSLATIONS.en.financials
    };

    const [currentView, setCurrentView] = useState('overview');

    const {
        revenue,
        activeBots,
        totalActiveFleet,
        totalOrders,
        recentEvents,
        revenueHistory,
        triggerLunchRush,
        isRushActive,
        systemStatus,
        triggerFault,
        resolveFault,
        soupLevel, // Add soupLevel
        noodleStock, // Add noodleStock
        freezerTemp,
        cookerTemp,
        motorLoad,
        powerUsage,
        motorHistory,
        cleaningLog
    } = useSimulation();

    // Format revenue as currency
    const formattedRevenue = new Intl.NumberFormat(locale === 'zh-TW' ? 'zh-TW' : 'en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(revenue);

    const isCritical = systemStatus === 'critical';

    return (
        <>
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} t={t} />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header
                    t={t}
                    isCritical={isCritical}
                    isRushActive={isRushActive}
                    triggerLunchRush={triggerLunchRush}
                    triggerFault={triggerFault}
                    resolveFault={resolveFault}
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                />

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto bg-[#0F172A]">
                    {currentView === 'overview' ? (
                        <div className="p-6 max-w-7xl mx-auto space-y-6">
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
                                    value={`${activeBots} / ${totalActiveFleet} ${t.metrics.online}`}
                                    subValue={isCritical ? t.metrics.unit_offline : `97% ${t.metrics.uptime}`}
                                    icon={< Users size={20} className={isCritical ? "text-red-500" : "text-green-400"} />}
                                    indicator={isCritical ? 'red' : (activeBots > 125 ? 'green' : 'yellow')}
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
                            </div >

                            {/* Fleet Status Table */}
                            <FleetStatusTable t={t} />

                            {/* Main Content Grid */}
                            < div className="grid grid-cols-1 md:col-span-2 xl:grid-cols-4 gap-6 xl:h-[500px]" >
                                {/* Revenue Chart - Takes up 3 columns on Desktop, 2 on Tablet (full row) */}
                                < div className="md:col-span-2 xl:col-span-3 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col min-h-[400px] xl:min-h-0" >
                                    <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                                        {t.status.hourly_sales}
                                        {isRushActive && !isCritical && <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">LIVE</span>}
                                        {isCritical && <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full animate-pulse">{t.status.system_alert}</span>}
                                    </h3>
                                    <div className={`flex-1 w-full h-full bg-[#0F172A]/50 rounded-lg border ${isCritical ? 'border-red-500/30' : 'border-slate-700/50'} relative overflow-hidden transition-colors duration-500`}>
                                        <RevenueChart data={revenueHistory} />
                                    </div>
                                </div >

                                {/* Live Alert Feed - Takes up 1 column on Desktop, 2 on Tablet (full row) */}
                                < div className="md:col-span-2 xl:col-span-1 bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col min-h-[400px] xl:min-h-0" >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-slate-200">{t.status.live_alerts}</h3>
                                        <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400">{t.status.real_time}</span>
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
                                </div >
                            </div >
                        </div >
                    ) : currentView === 'inventory' ? ( // 2. Check currentView === 'inventory'
                        <InventoryView // 3. Render InventoryView
                            t={t}
                            soupLevel={soupLevel}
                            noodleStock={noodleStock}
                        />
                    ) : currentView === 'telemetry' ? (
                        <TelemetryView
                            t={t}
                            freezerTemp={freezerTemp}
                            cookerTemp={cookerTemp}
                            motorLoad={motorLoad}
                            powerUsage={powerUsage}
                            motorHistory={motorHistory}
                        />
                    ) : currentView === 'food_safety' ? (
                        <FoodSafetyView
                            t={t}
                            cleaningLog={cleaningLog}
                        />
                    ) : currentView === 'financials' ? (
                        <FinancialView t={t} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <Construction size={64} className="mb-6 opacity-30" />
                            <h2 className="text-2xl font-bold text-slate-200 mb-2">{t.construction.title}</h2>
                            <p>{t.construction.desc}</p>
                        </div>
                    )}
                </main >
            </div >
        </>
    );
}

function MetricCard({ title, value, subValue, trend, trendUp, icon, indicator, highlight, alertState }: any) {
    return (
        <div className={`
            bg-[#1E293B] border rounded-xl p-6 transition-all duration-300
            ${alertState ? 'border-red-500 shadow-lg shadow-red-500/20' : highlight ? 'border-orange-500/50 shadow-lg shadow-orange-500/10' : 'border-slate-700 hover:border-slate-600'}
        `}>
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
