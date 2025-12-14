import { useState, useEffect, useRef } from 'react';

export interface SimulationState {
    revenue: number;
    activeBots: number;
    totalActiveFleet: number;
    totalOrders: number;
    recentEvents: DashboardEvent[];
    revenueHistory: { time: string; value: number }[];
    isRushActive: boolean;
    systemStatus: 'normal' | 'critical';
}

export interface DashboardEvent {
    id: string;
    type: 'warning' | 'success' | 'info' | 'critical';
    message: string;
    time: string;
}

const INITIAL_STATE: SimulationState = {
    revenue: 12450.00,
    activeBots: 124,
    totalActiveFleet: 128,
    totalOrders: 842,
    recentEvents: [],
    revenueHistory: Array.from({ length: 20 }, (_, i) => ({
        time: `${10 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`,
        value: 12000 + (Math.random() * 500)
    })),
    isRushActive: false,
    systemStatus: 'normal',
};

const SAMPLE_EVENTS = [
    { message: "Bot #04 Osaka: Restock needed", type: 'warning' as const },
    { message: "Bot #12 London: Cleaning complete", type: 'success' as const },
    { message: "Order #843: Spicy Beef Ramen prepared in Tokyo", type: 'info' as const },
    { message: "Bot #88 NYC: Maintenance required", type: 'warning' as const },
    { message: "Order #844: Miso Soup served in Paris", type: 'info' as const },
    { message: "System: Hourly backup completed", type: 'success' as const },
    { message: "Bot #09 Berlin: Sauce refilled", type: 'success' as const },
    { message: "Order #845: Tonkotsu Ramen preparing in Osaka", type: 'info' as const },
];

export function useSimulation() {
    const [state, setState] = useState<SimulationState>({
        ...INITIAL_STATE,
        recentEvents: [
            { id: '1', type: 'warning', message: "Bot #04 Osaka: Low noodle inventory (15%)", time: "2m ago" },
            { id: '2', type: 'success', message: "Bot #12 London: Automated cleaning cycle complete", time: "12m ago" },
            { id: '3', type: 'info', message: "Bot #07 NYC: Daily diagnostics passed", time: "45m ago" },
            { id: '4', type: 'warning', message: "Bot #22 Tokyo: Sauce dispenser validation needed", time: "1h ago" },
            { id: '5', type: 'success', message: "System: Firmware update v2.4.0 deployed", time: "2h ago" },
        ]
    });

    const rushTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Function to trigger lunch rush
    const triggerLunchRush = () => {
        if (state.isRushActive) return;

        setState(prev => ({ ...prev, isRushActive: true }));

        // Reset after 10 seconds
        if (rushTimeoutRef.current) clearTimeout(rushTimeoutRef.current);
        rushTimeoutRef.current = setTimeout(() => {
            setState(prev => ({ ...prev, isRushActive: false }));
        }, 10000);
    };

    // Function to trigger critical fault
    const triggerFault = () => {
        if (state.systemStatus === 'critical') return;

        const newEvent: DashboardEvent = {
            id: Date.now().toString(),
            type: 'critical',
            message: "CRITICAL: Bot #04 Motor Overheat detected. Auto-shutdown initiated.",
            time: "Just now"
        };

        setState(prev => ({
            ...prev,
            systemStatus: 'critical',
            activeBots: prev.activeBots - 1,
            recentEvents: [newEvent, ...prev.recentEvents].slice(0, 10)
        }));
    };

    // Function to resolve fault
    const resolveFault = () => {
        if (state.systemStatus === 'normal') return;

        const newEvent: DashboardEvent = {
            id: Date.now().toString(),
            type: 'success',
            message: "SYSTEM: Maintenance Ticket #992 resolved. Bot #04 back online.",
            time: "Just now"
        };

        setState(prev => ({
            ...prev,
            systemStatus: 'normal',
            activeBots: prev.activeBots + 1,
            recentEvents: [newEvent, ...prev.recentEvents].slice(0, 10)
        }));
    };

    useEffect(() => {
        // Main Ticker: Updates Revenue & Orders
        const mainTicker = setInterval(() => {
            setState(prev => {
                const isRush = prev.isRushActive;
                const isCritical = prev.systemStatus === 'critical';

                // Base increment: $12-$45. Lunch rush multiplier: 3x-5x
                let baseIncrement = Math.random() * (45 - 12) + 12;

                // Impact of critical status: 20% reduction in revenue efficiency
                if (isCritical) {
                    baseIncrement = baseIncrement * 0.8;
                }

                const multiplier = isRush ? (Math.random() * (5 - 3) + 3) : 1;
                const revenueIncrease = baseIncrement * multiplier;
                const newRevenue = prev.revenue + revenueIncrease;

                // Update history
                const now = new Date();
                const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

                const newHistoryPoint = {
                    time: timeString,
                    value: newRevenue
                };

                const newHistory = [...prev.revenueHistory, newHistoryPoint].slice(-20); // Keep last 20 points

                return {
                    ...prev,
                    revenue: newRevenue,
                    totalOrders: prev.totalOrders + (isRush ? Math.floor(Math.random() * 5) + 1 : 1),
                    revenueHistory: newHistory
                };
            });
        }, 3000); // Update every 3 seconds

        // Fluctuation Ticker: Updates Active Bots every 5 seconds (rarely changes)
        // Only run fluctuations if system is normal to avoid conflict with fault logic
        const botTicker = setInterval(() => {
            if (Math.random() > 0.8) {
                setState(prev => {
                    if (prev.systemStatus === 'critical') return prev; // Don't fluctuate while broken

                    const newActiveBots = Math.floor(Math.random() * (128 - 122 + 1) + 122);
                    return {
                        ...prev,
                        activeBots: newActiveBots
                    };
                });
            }
        }, 5000);

        // Event Ticker: Adds new event logs every ~10 seconds
        const eventTicker = setInterval(() => {
            const randomEvent = SAMPLE_EVENTS[Math.floor(Math.random() * SAMPLE_EVENTS.length)];
            const newEvent: DashboardEvent = {
                id: Date.now().toString(),
                type: randomEvent.type,
                message: randomEvent.message,
                time: "Just now"
            };

            setState(prev => ({
                ...prev,
                recentEvents: [newEvent, ...prev.recentEvents].slice(0, 10)
            }));
        }, 10000);

        return () => {
            clearInterval(mainTicker);
            clearInterval(botTicker);
            clearInterval(eventTicker);
            if (rushTimeoutRef.current) clearTimeout(rushTimeoutRef.current);
        };
    }, []);

    return { ...state, triggerLunchRush, triggerFault, resolveFault };
}
