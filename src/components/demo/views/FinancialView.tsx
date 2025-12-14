import React from 'react';
import { DollarSign, TrendingUp, PieChart, Calendar, ArrowUpRight, BarChart3, Clock, Target, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface FinancialViewProps {
    t: any;
}

// Mock Data for Product Mix
const PRODUCT_DATA = [
    { name: 'Tonkotsu Ramen', sales: 450, margin: 'High' },
    { name: 'Spicy Miso', sales: 320, margin: 'Med' },
    { name: 'Gyoza', sales: 280, margin: 'High' },
    { name: 'Soft Drinks', sales: 150, margin: 'Low' },
];

export function FinancialView({ t }: FinancialViewProps) {
    // Generate Heatmap Data (7 Days x 12 Blocks)
    // We'll mock this with CSS grids for visual simplicity and performance
    const days = t.financials.weekdays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = ['10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];

    const getIntensity = (dayIndex: number, hourIndex: number) => {
        // Mock Logic: Lunch (1 = 12pm) and Dinner (4,5 = 6pm, 8pm) are busy
        // Weekends (5,6) are busier
        const isLunch = hourIndex === 1;
        const isDinner = hourIndex >= 4 && hourIndex <= 5;
        const isWeekend = dayIndex >= 5;

        if (isWeekend && isDinner) return 4; // Max
        if (isDinner || isLunch) return 3;   // High
        if (isWeekend) return 2;             // Med
        return 1;                            // Low
    };

    const intensityColors = {
        1: 'bg-blue-500/10',
        2: 'bg-blue-500/30',
        3: 'bg-blue-500/60',
        4: 'bg-blue-400',
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <DollarSign className="text-emerald-400" />
                        {t.financials.title}
                    </h2>
                    <p className="text-slate-400 mt-1">{t.financials.metricsTitle}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <TrendingUp size={14} className="text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">+12.4% vs Last Month</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. ROI & Metrics (Span 1) */}
                <div className="space-y-6">
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-400">{t.financials.revenue}</h3>
                            <Calendar size={16} className="text-slate-500" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">€ 30,125.00</span>
                            <span className="text-xs font-medium text-emerald-400 flex items-center">
                                <ArrowUpRight size={12} /> 8.2%
                            </span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">{t.financials.payback}</span>
                                <span className="text-white font-mono">8.5 {t.financials.months}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[65%]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                            <PieChart size={18} className="text-purple-400" />
                            {t.financials.productMix}
                        </h3>
                        <div className="space-y-4">
                            {PRODUCT_DATA.map((product) => (
                                <div key={product.name}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-300">{product.name}</span>
                                        <span className="text-slate-500">{product.sales} {t.financials.sold}</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div
                                            className="h-full bg-purple-500"
                                            style={{ width: `${(product.sales / 450) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cost Structure Card */}
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">{t.financials.cost_title}</h3>

                        {/* Stacked Bar */}
                        <div className="h-4 w-full rounded-full overflow-hidden flex mb-4 shadow-inner bg-slate-800">
                            <div className="h-full bg-red-400 w-[30%]"></div>
                            <div className="h-full bg-orange-400 w-[15%]"></div>
                            <div className="h-full bg-amber-400 w-[10%]"></div>
                            <div className="h-full bg-emerald-500 w-[45%]"></div>
                        </div>

                        {/* Legend */}
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-red-400"></div> {t.financials.cost_cogs}</div>
                                <span className="font-mono text-slate-400">30%</span>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-orange-400"></div> {t.financials.cost_rent}</div>
                                <span className="font-mono text-slate-400">15%</span>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-amber-400"></div> {t.financials.cost_labor}</div>
                                <span className="font-mono text-slate-400">10%</span>
                            </div>
                            <div className="flex justify-between border-t border-slate-700 pt-2 mt-2">
                                <div className="flex items-center gap-2 text-white font-medium"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> {t.financials.cost_profit}</div>
                                <span className="font-mono text-emerald-400 font-bold">45%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Analysis Column (Span 2) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Golden Hour Insight */}
                    <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-amber-500/30 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Zap size={120} className="text-amber-400" />
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock size={18} className="text-amber-400" />
                                    <h3 className="text-amber-200 font-medium">{t.financials.golden_title}</h3>
                                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                                        {t.financials.golden_label}
                                    </span>
                                </div>
                                <div className="text-4xl font-bold text-white mb-1 tracking-tight">00:00 - 02:00</div>
                                <p className="text-slate-400 text-sm max-w-md">{t.financials.golden_desc}</p>
                            </div>
                            <div className="bg-amber-950/40 border border-amber-500/20 p-3 rounded-lg max-w-xs backdrop-blur-sm">
                                <p className="text-xs text-amber-200 font-medium">{t.financials.insight_tip}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sales Heatmap */}
                    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                                <BarChart3 size={20} className="text-blue-400" />
                                {t.financials.heatmapTitle}
                            </h3>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500/10 rounded"></span> {t.financials.low}</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded"></span> {t.financials.high}</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[500px]">
                                {/* Header Row */}
                                <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-2 mb-2">
                                    <div></div> {/* Empty corner */}
                                    {hours.map(hour => (
                                        <div key={hour} className="text-center text-xs text-slate-500 font-mono">{hour}</div>
                                    ))}
                                </div>

                                {/* Rows */}
                                <div className="space-y-2">
                                    {days.map((day: string, dayIndex: number) => (
                                        <div key={day} className="grid grid-cols-[80px_repeat(7,1fr)] gap-2 items-center">
                                            <div className="text-xs text-slate-400 font-medium">{day}</div>
                                            {hours.map((_, hourIndex) => {
                                                const intensity = getIntensity(dayIndex, hourIndex);
                                                return (
                                                    <div
                                                        key={hourIndex}
                                                        className={`h-8 rounded-md transition-all hover:scale-105 cursor-default ${intensityColors[intensity as 1 | 2 | 3 | 4]}`}
                                                        title={`Traffic: Level ${intensity}`}
                                                    ></div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-slate-500 text-center">
                            {t.financials.disclaimer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
