import React from 'react';
import { BadgeCheck, Smartphone, Truck, Users, AlertTriangle, Circle, Package, Wrench, MessageCircle, RefreshCw, User } from 'lucide-react';

interface FleetStatusTableProps {
    t: any;
    data?: any[];
}

export function FleetStatusTable({ t, data }: FleetStatusTableProps) {
    // Usage of passed data with fallback
    const fleetData = data || [];

    const getStatusColor = (statusKey: string) => {
        if (statusKey === 'status_busy') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        if (statusKey === 'status_maintenance') return 'text-red-400 bg-red-400/10 border-red-400/20';
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'; // Online
    };

    const getChannelIcon = (channel: string) => {
        if (channel === 'kiosk') return <Users size={16} className="text-blue-400" />;
        if (channel === 'app') return <Smartphone size={16} className="text-purple-400" />;
        if (channel === 'delivery') return <Truck size={16} className="text-orange-400" />;
        return <span className="text-slate-500">-</span>;
    };

    const handleIconAction = (unitId: string, type: 'restock' | 'tech' | 'staff' | 'reboot' | 'complaint') => {
        switch (type) {
            case 'restock': alert(t.fleetTable.msg_restock); break;
            case 'tech': alert(t.fleetTable.msg_tech); break;
            case 'staff': alert(t.fleetTable.act_staff + " - Dispatched"); break;
            case 'reboot': alert(t.fleetTable.msg_reboot); break;
            case 'complaint': alert(t.fleetTable.comp_success); break;
        }
    };

    return (
        <div className="bg-[#1E293B] border border-slate-700 rounded-xl overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-200">{t.fleetTable.title}</h3>
                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">13 UNITS ACTIVE</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-800/50 text-slate-400 border-b border-slate-700">
                            <th className="px-6 py-3 font-medium">{t.fleetTable.col_id}</th>
                            <th className="px-6 py-3 font-medium">{t.fleetTable.col_type}</th>
                            <th className="px-6 py-3 font-medium text-right">{t.fleetTable.col_revenue}</th>
                            <th className="px-6 py-3 font-medium">{t.fleetTable.col_status}</th>
                            <th className="px-6 py-3 font-medium min-w-[200px]">{t.fleetTable.col_restock}</th>
                            <th className="px-6 py-3 font-medium text-right">{t.fleetTable.col_aov}</th>
                            <th className="px-6 py-3 font-medium">{t.fleetTable.col_addon}</th>
                            <th className="px-6 py-3 font-medium text-center min-w-[120px]">{t.fleetTable.col_channel}</th>
                            <th className="px-6 py-3 font-medium text-left min-w-[400px]">{t.fleetTable.col_action}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {fleetData.map((unit) => (
                            <tr key={unit.id} className="hover:bg-slate-700/20 transition-colors">
                                <td className="px-6 py-3 whitespace-nowrap">
                                    <div className="font-medium text-slate-200">{t.fleetTable[unit.location]}</div>
                                    <div className="text-xs text-slate-500 font-mono">{unit.id}</div>
                                </td>
                                <td className="px-6 py-3 text-slate-300">
                                    {t.fleetTable[unit.type]}
                                </td>
                                <td className="px-6 py-3 text-right font-mono text-emerald-400">
                                    ${unit.revenue.toLocaleString()}
                                </td>
                                <td className="px-6 py-3">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(unit.status)}`}>
                                        <Circle size={8} fill="currentColor" className="opacity-80" />
                                        {t.fleetTable[unit.status]}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-slate-300">
                                    {unit.portions < 20 && unit.status !== 'status_maintenance' ? (
                                        <div className="flex flex-col items-start gap-1 text-red-400 font-medium">
                                            <div className="flex items-center gap-2">
                                                <AlertTriangle size={14} className="shrink-0" />
                                                <span>
                                                    {unit.portions} {t.fleetTable.unit_bowls}
                                                    <span className="block text-[10px] opacity-80 whitespace-nowrap">{t.fleetTable.warn_restock}</span>
                                                </span>
                                            </div>
                                            {unit.location === 'loc_louvre' && (
                                                <div className="mt-1 text-[10px] text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-400/20 w-full whitespace-normal leading-tight">
                                                    {t.fleetTable.tip_balance
                                                        .replace('{store}', t.fleetTable.loc_arc)
                                                        .replace('{dist}', '1.2km')}
                                                </div>
                                            )}
                                        </div>
                                    ) : unit.status === 'status_maintenance' ? (
                                        <span className="text-slate-600">--</span>
                                    ) : (
                                        <span className="text-slate-400">
                                            {unit.portions} {t.fleetTable.unit_bowls}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-3 text-right font-mono text-slate-300">
                                    {unit.aov > 0 ? `€${unit.aov.toFixed(2)}` : '--'}
                                </td>
                                <td className="px-6 py-3 text-slate-400">
                                    {unit.addon !== '--' ? t.fleetTable[unit.addon] || unit.addon : '--'}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
                                        {t.fleetTable[`channel_${unit.channel}`] || unit.channel}
                                    </div>
                                </td>
                                <td className="px-6 py-3">
                                    <div className="flex flex-wrap gap-2 justify-start min-w-[380px]">
                                        <button onClick={() => handleIconAction(unit.id, 'restock')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600/50 text-slate-300 transition-colors text-xs font-medium group">
                                            <Package size={14} className="text-blue-400 group-hover:text-blue-300" />
                                            {t.fleetTable.tip_restock}
                                        </button>
                                        <button onClick={() => handleIconAction(unit.id, 'tech')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600/50 text-slate-300 transition-colors text-xs font-medium group">
                                            <Wrench size={14} className="text-orange-400 group-hover:text-orange-300" />
                                            {t.fleetTable.tip_tech}
                                        </button>
                                        <button onClick={() => handleIconAction(unit.id, 'staff')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600/50 text-slate-300 transition-colors text-xs font-medium group">
                                            <User size={14} className="text-purple-400 group-hover:text-purple-300" />
                                            {t.fleetTable.tip_staff}
                                        </button>
                                        <button onClick={() => handleIconAction(unit.id, 'reboot')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600/50 text-slate-300 transition-colors text-xs font-medium group">
                                            <RefreshCw size={14} className="text-slate-400 group-hover:text-slate-300" />
                                            {t.fleetTable.tip_reboot}
                                        </button>
                                        <button onClick={() => handleIconAction(unit.id, 'complaint')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600/50 text-slate-300 transition-colors text-xs font-medium group">
                                            <MessageCircle size={14} className="text-red-400 group-hover:text-red-300" />
                                            {t.fleetTable.tip_complaint}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
