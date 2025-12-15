"use client";

import React, { useState, use } from 'react';
import { Construction } from 'lucide-react';
import { useSimulation } from '@/hooks/useSimulation';
import { translations as DEMO_TRANSLATIONS } from './translations';
import { Sidebar } from '@/components/demo/Sidebar';
import { Header } from '@/components/demo/Header';
import { OverviewView } from '@/components/demo/views/OverviewView';
import { InventoryView } from '@/components/demo/views/InventoryView';
import { TelemetryView } from '@/components/demo/views/TelemetryView';
import { FoodSafetyView } from '@/components/demo/views/FoodSafetyView';
import { FinancialView } from '@/components/demo/views/FinancialView';

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
        ...DEMO_TRANSLATIONS.en, // Base
        ...tRaw,                 // Override
        construction: tRaw.construction || DEMO_TRANSLATIONS.en.construction, // Guarantee
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
        soupLevel,
        noodleStock,
        freezerTemp,
        cookerTemp,
        motorLoad,
        powerUsage,
        motorHistory,
        cleaningLog
    } = useSimulation();

    // Format revenue as currency
    const formattedRevenue = new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'zh-TW', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
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
                        <OverviewView
                            t={t}
                            formattedRevenue={formattedRevenue}
                            activeBots={activeBots}
                            totalActiveFleet={totalActiveFleet}
                            totalOrders={totalOrders}
                            isRushActive={isRushActive}
                            isCritical={isCritical}
                            systemStatus={systemStatus}
                            triggerLunchRush={triggerLunchRush}
                            triggerFault={triggerFault}
                            resolveFault={resolveFault}
                            revenueHistory={revenueHistory}
                            recentEvents={recentEvents}
                        />
                    ) : currentView === 'inventory' ? (
                        <InventoryView
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
                </main>
            </div>
        </>
    );
}
