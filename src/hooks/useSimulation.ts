import { useState, useEffect, useRef } from 'react';

export interface SimulationState {
    revenue: number;
    activeBots: number;
    totalActiveFleet: number;
    totalOrders: number;
    recentEvents: DashboardEvent[];
}

export interface DashboardEvent {
    id: string;
    type: 'warning' | 'success' | 'info';
    message: string;
    time: string;
}

const INITIAL_STATE = {
    revenue: 12450.00,
    activeBots: 124,
    totalActiveFleet: 128,
    totalOrders: 842,
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

    // Use refs to access latest state inside intervals without re-triggering effects
    const stateRef = useRef(state);
    stateRef.current = state;

    useEffect(() => {
        // Main Ticker: Updates Revenue & Orders every 3 seconds
        const mainTicker = setInterval(() => {
            const revenueIncrease = Math.random() * (45 - 12) + 12; // Random increment between $12 and $45

            setState(prev => ({
                ...prev,
                revenue: prev.revenue + revenueIncrease,
                totalOrders: prev.totalOrders + 1,
            }));
        }, 3000);

        // Fluctuation Ticker: Updates Active Bots every 5 seconds (rarely changes)
        const botTicker = setInterval(() => {
            // 20% chance to change bot count
            if (Math.random() > 0.8) {
                const newActiveBots = Math.floor(Math.random() * (128 - 122 + 1) + 122); // Random between 122 and 128
                setState(prev => ({
                    ...prev,
                    activeBots: newActiveBots
                }));
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
                recentEvents: [newEvent, ...prev.recentEvents].slice(0, 10) // Keep last 10
            }));
        }, 10000);

        return () => {
            clearInterval(mainTicker);
            clearInterval(botTicker);
            clearInterval(eventTicker);
        };
    }, []);

    return state;
}
