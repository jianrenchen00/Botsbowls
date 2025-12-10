"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Constants
const DAYS_PER_MONTH = 30;
const GROSS_MARGIN = 0.7; // 70%
const FIXED_COSTS = 6500; // €6,500
const TOTAL_INVESTMENT = 290000; // €290,000

// Helper for currency formatting
const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(value);

export function ROICalculator() {
    const { t } = useTranslation();
    const [dailySales, setDailySales] = useState(120);
    const [ticketPrice, setTicketPrice] = useState(13);

    const { monthlyRevenue, monthlyNetProfit, annualNetProfit, paybackPeriod } =
        useMemo(() => {
            const monthlyRevenue = dailySales * ticketPrice * DAYS_PER_MONTH;
            const monthlyNetProfit = monthlyRevenue * GROSS_MARGIN - FIXED_COSTS;
            const annualNetProfit = monthlyNetProfit * 12;

            // Payback period in months
            let paybackPeriod = 0;
            if (monthlyNetProfit > 0) {
                paybackPeriod = TOTAL_INVESTMENT / monthlyNetProfit;
            }

            return {
                monthlyRevenue,
                monthlyNetProfit,
                annualNetProfit,
                paybackPeriod,
            };
        }, [dailySales, ticketPrice]);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans">
                        {t('roi.calculate_returns')} <span className="text-neon-orange">{t('roi.potential_returns')}</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t('roi.estimate_earnings')}
                    </p>
                </div>

                {/* High Contrast Card */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                    {/* Inputs Section */}
                    <div className="p-8 lg:p-12 space-y-10">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-gray-900 font-bold text-lg break-words max-w-[70%]">{t('roi.label_daily_sales')}</label>
                                <span className="text-neon-blue font-mono font-bold text-2xl">
                                    {dailySales}
                                </span>
                            </div>
                            <div className="relative w-full py-4">
                                <div
                                    className="absolute bottom-8 px-3 py-1.5 rounded-lg bg-[#F26B21] text-white text-sm font-bold shadow-lg transform -translate-x-1/2 pointer-events-none transition-all duration-75 z-50 min-w-[3rem] text-center flex justify-center items-center"
                                    style={{ left: `${((dailySales - 50) / (500 - 50)) * 100}%` }}
                                >
                                    {dailySales}
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#F26B21] rotate-45"></div>
                                </div>
                                <input
                                    type="range"
                                    min="50"
                                    max="500"
                                    step="10"
                                    value={dailySales}
                                    onChange={(e) => setDailySales(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-neon-blue relative z-10"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                                <span>50</span>
                                <span>500</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-gray-900 font-bold text-lg">{t('roi.label_price')}</label>
                                <span className="text-neon-orange font-mono font-bold text-2xl">
                                    €{ticketPrice}
                                </span>
                            </div>
                            <div className="relative w-full py-4">
                                <div
                                    className="absolute bottom-8 px-3 py-1.5 rounded-lg bg-[#F26B21] text-white text-sm font-bold shadow-lg transform -translate-x-1/2 pointer-events-none transition-all duration-75 z-50 min-w-[3rem] text-center flex justify-center items-center"
                                    style={{ left: `${((ticketPrice - 5) / (15 - 5)) * 100}%` }}
                                >
                                    €{ticketPrice}
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#F26B21] rotate-45"></div>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="15"
                                    step="0.5"
                                    value={ticketPrice}
                                    onChange={(e) => setTicketPrice(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-neon-orange relative z-10"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                                <span>€5</span>
                                <span>€15</span>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600 space-y-3">
                            <div className="flex justify-between">
                                <span>{t('roi.gross_margin')}</span>
                                <span className="text-gray-900 font-bold font-mono">70%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('roi.fixed_costs')}</span>
                                <span className="text-gray-900 font-bold font-mono">€6,500</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('roi.total_investment')}</span>
                                <span className="text-gray-900 font-bold font-mono">€290,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Results Section - High Contrast Brand Orange */}
                    <div className="bg-[#FF6B00] p-8 lg:p-12 flex flex-col justify-center space-y-8 text-white">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                                <p className="text-white/80 text-sm mb-2 font-medium">{t('roi.monthly_revenue')}</p>
                                <AnimatedNumber
                                    value={monthlyRevenue}
                                    formatter={formatCurrency}
                                    className="text-3xl font-mono font-bold text-white"
                                />
                            </div>
                            <div className="p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                                <p className="text-white/80 text-sm mb-2 font-medium">{t('roi.result_monthly_profit')}</p>
                                <AnimatedNumber
                                    value={monthlyNetProfit}
                                    formatter={formatCurrency}
                                    className="text-3xl font-mono font-bold text-white"
                                />
                            </div>
                        </div>

                        <div className="p-8 rounded-xl bg-white text-gray-900 shadow-lg">
                            <p className="text-gray-500 text-sm mb-2 font-bold uppercase tracking-wider">{t('roi.annual_net_profit')}</p>
                            <AnimatedNumber
                                value={annualNetProfit}
                                formatter={formatCurrency}
                                className={`text-5xl sm:text-6xl font-mono font-bold ${annualNetProfit >= 0 ? "text-neon-blue" : "text-red-500"
                                    }`}
                            />
                        </div>

                        <div className="flex items-center justify-between p-6 rounded-xl bg-black/20 border border-white/10">
                            <p className="text-white font-bold text-lg">{t('roi.result_payback')}</p>
                            <div className="text-right">
                                {monthlyNetProfit > 0 ? (
                                    <span className="text-4xl font-mono font-bold text-white">
                                        {paybackPeriod.toFixed(1)} <span className="text-lg font-sans font-normal text-white/70">{t('roi.unit_months')}</span>
                                    </span>
                                ) : (
                                    <span className="text-3xl font-mono font-bold text-white/50">N/A</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AnimatedNumber({
    value,
    formatter,
    className,
}: {
    value: number;
    formatter: (val: number) => string;
    className?: string;
}) {
    return (
        <motion.span
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={className}
        >
            {formatter(value)}
        </motion.span>
    );
}
