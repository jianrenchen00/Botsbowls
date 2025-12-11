"use client";

import { useEffect, useState } from "react";
import { TrendingUp, DollarSign, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function RevenueWidget() {
    const [revenue, setRevenue] = useState(12450);
    const [orders, setOrders] = useState(842);
    const [lastIncrement, setLastIncrement] = useState(0);

    // Simulate live revenue ticker
    useEffect(() => {
        const interval = setInterval(() => {
            // Random increment between 5 and 25 euros
            const increment = Math.floor(Math.random() * 20) + 5;
            setLastIncrement(increment);
            setRevenue((prev) => prev + increment);
            setOrders((prev) => prev + 1);
        }, 3500); // Every 3.5 seconds

        return () => clearInterval(interval);
    }, []);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(val);

    return (
        <div className="h-full bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-slate-400 font-medium text-sm flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-500" />
                        Total Revenue Today
                    </h2>
                </div>
                <span className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-500/20 font-mono">
                    Live
                </span>
            </div>

            <div className="flex items-end gap-3 mb-8">
                <h3 className="text-5xl font-bold text-white font-mono tracking-tight relative">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={revenue}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="inline-block"
                        >
                            {formatCurrency(revenue)}
                        </motion.span>
                    </AnimatePresence>
                </h3>
                <AnimatePresence>
                    {lastIncrement > 0 && (
                        <motion.span
                            key={revenue} // Re-trigger on change
                            initial={{ opacity: 0, y: 10, x: -10 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-emerald-400 text-sm font-bold mb-2 font-mono"
                        >
                            +{lastIncrement}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-slate-500 text-xs mb-1">Total Orders</p>
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-blue-400" />
                        <span className="text-xl font-bold text-slate-200 font-mono">{orders}</span>
                    </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-slate-500 text-xs mb-1">Avg. Order Value</p>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-xl font-bold text-slate-200 font-mono">€14.80</span>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
}
