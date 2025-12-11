"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, Bell, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Alert = {
    id: number;
    location: string;
    message: string;
    severity: "high" | "medium";
    time: string;
};

export function AlertStreamWidget() {
    const [alerts, setAlerts] = useState<Alert[]>([
        { id: 1, location: "Paris Unit #04", message: "Noodle Pre-mix Low", severity: "medium", time: "2m ago" },
        { id: 2, location: "Barcelona Unit #01", message: "Front Door Locked", severity: "high", time: "12m ago" },
        { id: 3, location: "Berlin Unit #12", message: "Temp Variance +2°C", severity: "medium", time: "45m ago" },
        { id: 4, location: "London Unit #03", message: "Network Latency High", severity: "medium", time: "1h ago" },
    ]);

    const resolveAll = () => {
        setAlerts([]);
    };

    const removeAlert = (id: number) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    return (
        <div className="h-full bg-slate-900 border border-slate-800 rounded-3xl p-6 relative flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-slate-400 font-medium text-sm flex items-center gap-2">
                    <Bell className="w-4 h-4 text-orange-500" />
                    Live Alerts
                </h2>
                {alerts.length > 0 ? (
                    <span className="bg-orange-500/10 text-orange-400 text-xs px-2 py-1 rounded-full border border-orange-500/20 font-mono animate-pulse">
                        {alerts.length} Active
                    </span>
                ) : (
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-full border border-emerald-500/20 font-mono">
                        All Clear
                    </span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                <AnimatePresence>
                    {alerts.length > 0 ? (
                        alerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className={`p-3 rounded-xl border ${alert.severity === "high"
                                        ? "bg-red-500/10 border-red-500/20"
                                        : "bg-orange-500/5 border-orange-500/10"
                                    } group relative`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${alert.severity === "high" ? "text-red-400" : "text-orange-400"
                                        }`}>
                                        {alert.severity === "high" ? "Critical" : "Warning"}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-mono">{alert.time}</span>
                                </div>
                                <p className="text-slate-300 text-sm font-medium mb-1">{alert.location}</p>
                                <p className="text-slate-400 text-sm">{alert.message}</p>

                                <button
                                    onClick={() => removeAlert(alert.id)}
                                    className="absolute top-2 right-2 text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex flex-col items-center justify-center text-slate-500"
                        >
                            <CheckCircle className="w-12 h-12 text-slate-700 mb-4" />
                            <p className="text-sm">No active alerts</p>
                            <p className="text-xs text-slate-600">System operating normally</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {alerts.length > 0 && (
                <button
                    onClick={resolveAll}
                    className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors border border-slate-700"
                >
                    Resolve All Issues
                </button>
            )}
        </div>
    );
}
