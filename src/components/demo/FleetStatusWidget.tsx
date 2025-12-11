"use client";

import { useState } from "react";
import { Server, Activity, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FleetStatusWidget() {
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

    // Mock Data
    const data = [
        { id: "online", label: "Online", value: 42, color: "#10B981", percent: 84 },
        { id: "maintenance", label: "Maint.", value: 5, color: "#F59E0B", percent: 10 },
        { id: "offline", label: "Offline", value: 3, color: "#EF4444", percent: 6 },
    ];

    // SVG Donut calculation constants
    const size = 160;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    let currentOffset = 0;

    return (
        <div className="h-full bg-slate-900 border border-slate-800 rounded-3xl p-6 relative flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-slate-400 font-medium text-sm flex items-center gap-2">
                    <Server className="w-4 h-4 text-purple-500" />
                    Fleet Status
                </h2>
                <span className="text-slate-500 text-xs">50 Units</span>
            </div>

            <div className="flex items-center justify-center relative my-4">
                {/* SVG Donut Chart */}
                <div className="relative w-40 h-40">
                    <svg width={size} height={size} className="transform -rotate-90">
                        {data.map((segment) => {
                            const dashArray = (segment.percent / 100) * circumference;
                            const dashOffset = (100 - segment.percent) / 100 * circumference; // Correct logic done differently below

                            const strokeDasharray = `${dashArray} ${circumference}`;
                            const strokeDashoffset = -currentOffset;
                            currentOffset += dashArray;

                            return (
                                <motion.circle
                                    key={segment.id}
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    fill="transparent"
                                    stroke={segment.color}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    className="transition-all duration-300 cursor-pointer hover:opacity-100 opacity-80"
                                    onMouseEnter={() => setHoveredSegment(segment.id)}
                                    onMouseLeave={() => setHoveredSegment(null)}
                                    whileHover={{ strokeWidth: strokeWidth + 4 }}
                                />
                            );
                        })}
                    </svg>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                        <span className="text-3xl font-bold text-white font-mono">
                            {hoveredSegment ? data.find(d => d.id === hoveredSegment)?.value : "98%"}
                        </span>
                        <span className="text-xs text-slate-400 uppercase tracking-widest">
                            {hoveredSegment ? data.find(d => d.id === hoveredSegment)?.label : "Uptime"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {data.map(item => (
                    <div key={item.id} className="flex flex-col items-center p-2 rounded-lg bg-slate-950/50 hover:bg-slate-800/50 transition-colors">
                        <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-400">{item.label}</span>
                        <span className="font-mono text-white font-bold">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
