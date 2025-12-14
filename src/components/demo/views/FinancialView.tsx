import React from 'react';
import { DollarSign, TrendingUp, PieChart, Calendar, ArrowUpRight, BarChart3 } from 'lucide-react';
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
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
                    <p className="text-slate-400 mt-1">ROI projections & automated P&L reporting</p>
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
                            <span className="text-3xl font-bold text-white">$38,450</span>
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
                </div>

                {/* 2. Sales Heatmap (Span 2) */}
                <div className="lg:col-span-2 bg-[#1E293B] border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                            <BarChart3 size={20} className="text-blue-400" />
                            {t.financials.heatmapTitle}
                        </h3>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500/10 rounded"></span> Low</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded"></span> High</span>
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
                                {days.map((day, dayIndex) => (
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
                        *Based on aggregated fleet data. Darker blocks indicate higher order velocity.
                    </p>
                </div>
            </div>
        </div>
    );
}
