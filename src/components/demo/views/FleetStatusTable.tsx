import React from 'react';
import { BadgeCheck, Smartphone, Truck, Users, AlertTriangle, Circle, Package, Wrench, MessageCircle, RefreshCw, User } from 'lucide-react';

interface FleetStatusTableProps {
    t: any;
}

export function FleetStatusTable({ t }: FleetStatusTableProps) {
    // 13 Specific Units Data Mock
    // Locations: 
    // ZNSMJ-VII (5): 凱旋門店, 羅浮宮店, 協和廣場, 巴士底獄, 蒙馬特
    // Integrated (4): 鐵塔店, 香榭大道, 拉德芳斯, 歌劇院
    // Drink (2): 瑪黑區, 拉丁區
    // Robot (2): 戴高樂機場 T1, 戴高樂機場 T2

    // We use keys for translation lookups where possible, but location names might be static or mapped. 
    // For this demo, we'll keep location names essentially static or bilingual-friendly if needed, 
    // but the request implies specific names. We'll use the Chinese names as primary ID or English equivalents if preferred.
    // Let's use English/Pinyin/Original for ID to look technical, and Location names as requested.

    const fleetData = [
        // ZNSMJ-VII (5)
        // Louvre: Low stock, High AOV
        { id: "ZNS-001", location: "loc_louvre", type: "type_znsmj", revenue: 1480, status: "status_busy", portions: 8, aov: 15.50, addon: "addon_coke", channel: "app" },
        { id: "ZNS-002", location: "loc_arc", type: "type_znsmj", revenue: 1250, status: "status_online", portions: 45, aov: 13.20, addon: "addon_egg", channel: "kiosk" },
        { id: "ZNS-003", location: "loc_concorde", type: "type_znsmj", revenue: 980, status: "status_online", portions: 62, aov: 12.80, addon: "addon_tea", channel: "web" },
        { id: "ZNS-004", location: "loc_bastille", type: "type_znsmj", revenue: 1120, status: "status_online", portions: 33, aov: 13.50, addon: "addon_tofu", channel: "3rd" },
        { id: "ZNS-005", location: "loc_montmartre", type: "type_znsmj", revenue: 1350, status: "status_busy", portions: 12, aov: 14.80, addon: "addon_egg", channel: "app" },

        // Integrated (4)
        // Tower: Safe stock, High AOV
        { id: "INT-101", location: "loc_tower", type: "type_integrated", revenue: 2100, status: "status_busy", portions: 15, aov: 16.20, addon: "addon_egg", channel: "kiosk" },
        { id: "INT-102", location: "loc_champs", type: "type_integrated", revenue: 1850, status: "status_online", portions: 55, aov: 14.50, addon: "addon_coke", channel: "app" },
        { id: "INT-103", location: "loc_defense", type: "type_integrated", revenue: 1600, status: "status_maintenance", portions: 0, aov: 0, addon: "addon_tea", channel: "--" },
        { id: "INT-104", location: "loc_opera", type: "type_integrated", revenue: 1720, status: "status_online", portions: 28, aov: 13.90, addon: "addon_tofu", channel: "3rd" },

        // Drink (2)
        { id: "DRK-201", location: "loc_marais", type: "type_drink", revenue: 450, status: "status_online", portions: 120, aov: 4.50, addon: "--", channel: "kiosk" },
        { id: "DRK-202", location: "loc_latin", type: "type_drink", revenue: 520, status: "status_online", portions: 85, aov: 5.20, addon: "--", channel: "web" },

        // Robot (2)
        { id: "ROB-301", location: "loc_cdg1", type: "type_robot", revenue: 3200, status: "status_busy", portions: 42, aov: 18.50, addon: "addon_egg", channel: "kiosk" },
        { id: "ROB-302", location: "loc_cdg2", type: "type_robot", revenue: 2950, status: "status_online", portions: 150, aov: 17.90, addon: "addon_tofu", channel: "app" },
    ];

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
                                        <button onClick={() => handleIconAction(unit.id, 'restock')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors text-xs font-medium">
                                            <Package size={14} />
                                            {t.fleetTable.tip_restock}
                                        </button>
                                        <button onClick={() => handleIconAction(unit.id, 'tech')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 transition-colors text-xs font-medium">
                                            <Wrench size={14} />
                                            {t.fleetTable.tip_tech}
                                        </button>
                                        <button onClick={() => handleIconAction(unit.id, 'staff')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-colors text-xs font-medium">
                                            <User size={14} />
                                            {t.fleetTable.tip_staff}
                                        </button>
                                        <button onClick={() => handleIconAction(unit.id, 'reboot')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors text-xs font-medium">
                                            <RefreshCw size={14} />
                                            {t.fleetTable.tip_reboot}
                                        </button>
                                        <button onClick={() => handleIconAction(unit.id, 'complaint')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-colors text-xs font-medium">
                                            <MessageCircle size={14} />
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
