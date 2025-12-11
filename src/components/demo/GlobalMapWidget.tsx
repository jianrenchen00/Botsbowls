"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function GlobalMapWidget() {
    // Simplified stylized map points
    const points = [
        { id: 1, x: "48%", y: "28%", label: "Paris" }, // Europe
        { id: 2, x: "50%", y: "30%", label: "Berlin" }, // Europe
        { id: 3, x: "46%", y: "38%", label: "Barcelona" }, // Europe
        { id: 4, x: "82%", y: "45%", label: "Tokyo" }, // Asia
        { id: 5, x: "78%", y: "48%", label: "Singapore" }, // Asia
    ];

    return (
        <div className="h-full bg-slate-900 border border-slate-800 rounded-3xl p-0 relative overflow-hidden group">
            {/* Header Overlay */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h2 className="text-slate-400 font-medium text-sm flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    Global Operation Map
                </h2>
                <p className="text-white font-bold text-lg">5 Active Regions</p>
            </div>

            {/* Map Background (Abstract) */}
            <div className="w-full h-full bg-[#0B1120] relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 z-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* World Map Silhouette (CSS-only approximation for vibe) */}
                {/* In a real app we'd use a GeoJSON SVG or library. Here we simulated the "Tech" look with dots */}

                {points.map((point) => (
                    <div
                        key={point.id}
                        className="absolute"
                        style={{ left: point.x, top: point.y }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: point.id * 0.1 }}
                            className="relative group cursor-pointer"
                        >
                            {/* Pulse */}
                            <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />

                            {/* Dot */}
                            <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-900 relative z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform" />

                            {/* Label */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                {point.label}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}
