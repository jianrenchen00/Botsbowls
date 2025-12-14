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
    soupLevel: number;
    noodleStock: number;
    freezerTemp: number;
    cookerTemp: number;
    motorLoad: number;
    powerUsage: number;
    motorHistory: number[];
    cleaningLog: { id: string, time: string, action: string, status: 'Verified' | 'Pending' }[];
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
    soupLevel: 100,
    noodleStock: 100,
    freezerTemp: -18.0,
    cookerTemp: 95.0,
    motorLoad: 45,
    powerUsage: 2.4,
    motorHistory: Array(30).fill(45),
    cleaningLog: [
        { id: '1', time: '11:45:00', action: 'High-Temp Nozzle Flush', status: 'Verified' as const },
        { id: '2', time: '11:15:00', action: 'UV-C Sterilization Cycle', status: 'Verified' as const },
        { id: '3', time: '10:45:00', action: 'Filter Integrity Check', status: 'Verified' as const },
    ]
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

                // Inventory Logic
                let newSoupLevel = prev.soupLevel - (Math.random() * 0.1 + 0.05) * multiplier;
                let newNoodleStock = prev.noodleStock - (Math.floor(Math.random() * 2) + 1) * multiplier * 0.1;

                // Sensor Logic (Telemetry)
                // Freezer: Target -18.0, fluctuate slightly
                const freezerNoise = (Math.random() - 0.5) * 0.4;
                let newFreezerTemp = -18.0 + freezerNoise;

                // Cooker: Target 95.0, fluctuate
                const cookerNoise = (Math.random() - 0.5) * 1.0;
                let newCookerTemp = 95.0 + cookerNoise;

                // Motor Load: Spikes on activity, decays otherwise
                let newMotorLoad = prev.motorLoad;
                if (Math.random() > 0.7) {
                    newMotorLoad = Math.min(95, prev.motorLoad + Math.random() * 30); // Spike
                } else {
                    newMotorLoad = Math.max(25, prev.motorLoad - 5); // Decay
                }

                // Power Usage: correlated with motor load + base load
                const newPowerUsage = 1.2 + (newMotorLoad / 100) * 2.5; // Base 1.2kW + up to 2.5kW variable

                // Motor History
                const newMotorHistory = [...prev.motorHistory, newMotorLoad].slice(-30);

                // Cleaning Log Logic (Food Safety)
                let newCleaningLog = prev.cleaningLog;
                if (Math.random() > 0.95) { // 5% chance per tick (approx every 20s)
                    const actions = [
                        "High-Temp Nozzle Flush (95°C)",
                        "UV-C Sterilization Cycle",
                        "Filter Integrity Check",
                        "Surface Sanitization Spray"
                    ];
                    const randomAction = actions[Math.floor(Math.random() * actions.length)];
                    const now = new Date();
                    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

                    newCleaningLog = [{
                        id: Date.now().toString(),
                        time: timeString,
                        action: randomAction,
                        status: 'Verified'
                    }, ...prev.cleaningLog].slice(0, 50);
                }

                // Auto-Restock Logic
                let inventoryEvents: DashboardEvent[] = [];

                if (newSoupLevel < 15) {
                    newSoupLevel = 100;
                    inventoryEvents.push({
                        id: Date.now().toString() + '-soup',
                        type: 'info',
                        message: "System: Auto-Refill initiated for Soup Tank A",
                        time: "Just now"
                    });
                }

                if (newNoodleStock < 10) {
                    newNoodleStock = 100;
                    inventoryEvents.push({
                        id: Date.now().toString() + '-noodle',
                        type: 'info',
                        message: "System: Noodle Hopper restocked by Bot #01",
                        time: "Just now"
                    });
                }

                // Update history
                const now = new Date();
                const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

                const newHistoryPoint = {
                    time: timeString,
                    value: newRevenue
                };

                const newHistory = [...prev.revenueHistory, newHistoryPoint].slice(-20); // Keep last 20 points

                const combinedEvents = [...inventoryEvents, ...prev.recentEvents].slice(0, 10);

                return {
                    ...prev,
                    revenue: newRevenue,
                    totalOrders: prev.totalOrders + (isRush ? Math.floor(Math.random() * 5) + 1 : 1),
                    revenueHistory: newHistory,
                    soupLevel: Math.max(0, newSoupLevel),
                    noodleStock: Math.max(0, newNoodleStock),
                    recentEvents: inventoryEvents.length > 0 ? combinedEvents : prev.recentEvents,
                    freezerTemp: newFreezerTemp,
                    cookerTemp: newCookerTemp,
                    motorLoad: newMotorLoad,
                    powerUsage: newPowerUsage,
                    motorHistory: newMotorHistory,
                    cleaningLog: newCleaningLog
                };
            });
        }, 1000); // Increased tick rate to 1 second for smoother animation

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
