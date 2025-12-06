"use client";

import { useState, useMemo } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4 font-sans">
                        {t('roi.calculate_returns')} <span className="text-neon-blue">{t('roi.potential_returns')}</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t('roi.estimate_earnings')}
                    </p>
                </div>

                <GlassContainer className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
                    {/* Inputs Section */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-white font-medium break-words max-w-[70%]">{t('roi.label_daily_sales')}</label>
                                <span className="text-neon-blue font-mono font-bold text-xl">
                                    {dailySales}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="50"
                                max="500"
                                step="10"
                                value={dailySales}
                                onChange={(e) => setDailySales(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-blue"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                                <span>50</span>
                                <span>500</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-white font-medium">{t('roi.label_price')}</label>
                                <span className="text-neon-orange font-mono font-bold text-xl">
                                    €{ticketPrice}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="20"
                                step="0.5"
                                value={ticketPrice}
                                onChange={(e) => setTicketPrice(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-orange"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                                <span>€10</span>
                                <span>€20</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 space-y-2">
                            <div className="flex justify-between">
                                <span>{t('roi.gross_margin')}</span>
                                <span className="text-white font-mono">70%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('roi.fixed_costs')}</span>
                                <span className="text-white font-mono">€6,500</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('roi.total_investment')}</span>
                                <span className="text-white font-mono">€290,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl bg-black/20 border border-white/5">
                                <p className="text-gray-400 text-sm mb-2">{t('roi.monthly_revenue')}</p>
                                <AnimatedNumber
                                    value={monthlyRevenue}
                                    formatter={formatCurrency}
                                    className="text-2xl font-mono font-bold text-white"
                                />
                            </div>
                            <div className="p-6 rounded-xl bg-black/20 border border-white/5">
                                <p className="text-gray-400 text-sm mb-2">{t('roi.result_monthly_profit')}</p>
                                <AnimatedNumber
                                    value={monthlyNetProfit}
                                    formatter={formatCurrency}
                                    className={`text-2xl font-mono font-bold ${monthlyNetProfit >= 0 ? "text-neon-green" : "text-red-500"
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="p-8 rounded-xl bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border border-neon-blue/20">
                            <p className="text-gray-300 text-sm mb-2">{t('roi.annual_net_profit')}</p>
                            <AnimatedNumber
                                value={annualNetProfit}
                                formatter={formatCurrency}
                                className={`text-4xl sm:text-5xl font-mono font-bold ${annualNetProfit >= 0 ? "text-neon-blue" : "text-red-500"
                                    }`}
                            />
                        </div>

                        <div className="flex items-center justify-between p-6 rounded-xl bg-neon-orange/10 border border-neon-orange/20">
                            <p className="text-white font-medium">{t('roi.result_payback')}</p>
                            <div className="text-right">
                                {monthlyNetProfit > 0 ? (
                                    <span className="text-3xl font-mono font-bold text-neon-orange">
                                        {paybackPeriod.toFixed(1)} <span className="text-base font-sans font-normal text-gray-300">{t('roi.unit_months')}</span>
                                    </span>
                                ) : (
                                    <span className="text-3xl font-mono font-bold text-gray-500">N/A</span>
                                )}
                            </div>
                        </div>
                    </div>
                </GlassContainer>
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
