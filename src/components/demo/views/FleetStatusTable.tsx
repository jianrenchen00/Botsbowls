import React from 'react';
import { BadgeCheck, Smartphone, Truck, Users, AlertTriangle, Circle } from 'lucide-react';

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
        { id: "ZNS-001", location: "loc_arc", type: "type_znsmj", revenue: 1250, status: "status_busy", restock: "2h", bestseller: "Tonkotsu Ramen", channel: "kiosk" },
        { id: "ZNS-002", location: "loc_louvre", type: "type_znsmj", revenue: 1480, status: "status_online", restock: "5h", bestseller: "Spicy Miso", channel: "app" },
        { id: "ZNS-003", location: "loc_concorde", type: "type_znsmj", revenue: 980, status: "status_online", restock: ">12h", bestseller: "Beef Ramen", channel: "kiosk" },
        { id: "ZNS-004", location: "loc_bastille", type: "type_znsmj", revenue: 1120, status: "status_online", restock: "8h", bestseller: "Tomato Ramen", channel: "delivery" },
        { id: "ZNS-005", location: "loc_montmartre", type: "type_znsmj", revenue: 1350, status: "status_busy", restock: "1h", bestseller: "Tonkotsu Ramen", channel: "app" },

        // Integrated (4)
        { id: "INT-101", location: "loc_tower", type: "type_integrated", revenue: 2100, status: "status_busy", restock: "30m", bestseller: "Signature Beef", channel: "kiosk" },
        { id: "INT-102", location: "loc_champs", type: "type_integrated", revenue: 1850, status: "status_online", restock: "6h", bestseller: "Truffle Ramen", channel: "app" },
        { id: "INT-103", location: "loc_defense", type: "type_integrated", revenue: 1600, status: "status_maintenance", restock: "--", bestseller: "--", channel: "--" },
        { id: "INT-104", location: "loc_opera", type: "type_integrated", revenue: 1720, status: "status_online", restock: "4h", bestseller: "Shoyu Ramen", channel: "delivery" },

        // Drink (2)
        { id: "DRK-201", location: "loc_marais", type: "type_drink", revenue: 450, status: "status_online", restock: ">24h", bestseller: "Oat Milk Tea", channel: "kiosk" },
        { id: "DRK-202", location: "loc_latin", type: "type_drink", revenue: 520, status: "status_online", restock: "10h", bestseller: "Berry Smoothie", channel: "app" },

        // Robot (2)
        { id: "ROB-301", location: "loc_cdg1", type: "type_robot", revenue: 3200, status: "status_busy", restock: "3h", bestseller: "Global Mix", channel: "kiosk" },
        { id: "ROB-302", location: "loc_cdg2", type: "type_robot", revenue: 2950, status: "status_online", restock: "7h", bestseller: "Chef Special", channel: "app" },
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
                            <th className="px-6 py-3 font-medium">{t.fleetTable.col_restock}</th>
                            <th className="px-6 py-3 font-medium">{t.fleetTable.col_bestseller}</th>
                            <th className="px-6 py-3 font-medium text-center">{t.fleetTable.col_channel}</th>
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
                                <td className="px-6 py-3 font-mono text-slate-400">
                                    {unit.restock}
                                </td>
                                <td className="px-6 py-3 text-slate-300">
                                    {unit.bestseller}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    <div className="flex justify-center" title={t.fleetTable[`channel_${unit.channel}`] || unit.channel}>
                                        {getChannelIcon(unit.channel)}
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
