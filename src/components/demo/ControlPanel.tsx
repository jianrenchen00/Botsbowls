import React from 'react';
import { Zap, Wrench, AlertOctagon } from 'lucide-react';

type SystemStatus = 'normal' | 'critical' | 'rush';

interface ControlPanelProps {
    t: any;
    isRushActive: boolean;
    triggerLunchRush: () => void;
    systemStatus: SystemStatus;
    triggerFault: () => void;
    resolveFault: () => void;
}

export function ControlPanel({
    t,
    isRushActive,
    triggerLunchRush,
    systemStatus,
    triggerFault,
    resolveFault
}: ControlPanelProps) {
    const isCritical = systemStatus === 'critical';

    return (
        <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col justify-between h-full">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">{t.nav.system_controls}</h3>

            <div className="grid grid-cols-1 gap-4 flex-1">
                {/* Lunch Rush Button */}
                <button
                    onClick={triggerLunchRush}
                    disabled={isRushActive || isCritical}
                    className={`
                        w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl font-bold text-sm transition-all
                        ${isRushActive
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50 cursor-not-allowed'
                            : isCritical
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-lg shadow-orange-900/20 active:scale-[0.98]'}
                    `}
                >
                    <Zap size={20} className={isRushActive ? 'animate-pulse' : ''} />
                    <span className="uppercase tracking-wide">
                        {isRushActive ? t.actions.rush_active : t.actions.simulate_lunch}
                    </span>
                </button>

                {/* Fault Simulation Button */}
                <button
                    onClick={isCritical ? resolveFault : triggerFault}
                    disabled={isRushActive && !isCritical}
                    className={`
                        w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl font-bold text-sm transition-all
                        ${isCritical
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-900/20 active:scale-[0.98]'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-slate-500'}
                    `}
                >
                    {isCritical ? <Wrench size={20} /> : <AlertOctagon size={20} className="text-red-400" />}
                    <span className="uppercase tracking-wide">
                        {isCritical ? t.actions.repair_system : t.actions.simulate_fault}
                    </span>
                </button>
            </div>

            {/* Status Indicator Micro-copy */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
                <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-500 animate-pulse' : isRushActive ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></span>
                {isCritical ? 'SYSTEM CRITICAL' : isRushActive ? 'PEAK LOAD' : 'SYSTEM OPTIMAL'}
            </div>
        </div>
    );
}
