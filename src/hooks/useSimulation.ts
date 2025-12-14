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
    revenue: 30125.00,
    activeBots: 13,
    totalActiveFleet: 13,
    totalOrders: 2450,
    recentEvents: [],
    // Static initial history
    revenueHistory: Array.from({ length: 20 }, (_, i) => ({
        time: "00:00",
        value: 30000
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
    cleaningLog: []
};

const SAMPLE_EVENTS = [
    { message: "Bot #03 (Full-Auto): Restock needed", type: 'warning' as const },
    { message: "Bot #08 (Vending): Cleaning complete", type: 'success' as const },
    { message: "Order #2451: Spicy Beef Ramen prepared", type: 'info' as const },
    { message: "Bot #12 (Kiosk): Paper refill required", type: 'warning' as const },
    { message: "Order #2452: Miso Soup served", type: 'info' as const },
    { message: "System: Hourly backup completed", type: 'success' as const },
    { message: "Bot #05 (Semi): Sauce refilled", type: 'success' as const },
    { message: "Order #2453: Tonkotsu Ramen preparing", type: 'info' as const },
];

export function useSimulation() {
    const [state, setState] = useState<SimulationState>(INITIAL_STATE);
    const [isMounted, setIsMounted] = useState(false);

    const rushTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize random data ONLY on client
    useEffect(() => {
        setIsMounted(true);
        console.log("Fleet Mix: 3 Full-Auto, 3 Semi-Auto, 4 Vending, 3 Kiosks");

        // Generate initial random history
        const initialHistory = Array.from({ length: 20 }, (_, i) => ({
            time: `${10 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`,
            value: 30000 + (Math.random() * 500)
        }));

        // Generate initial cleaning log
        const initialCleaningLog = [
            { id: '1', time: '11:45:00', action: 'High-Temp Nozzle Flush', status: 'Verified' as const },
            { id: '2', time: '11:15:00', action: 'UV-C Sterilization Cycle', status: 'Verified' as const },
            { id: '3', time: '10:45:00', action: 'Filter Integrity Check', status: 'Verified' as const },
        ];

        // Generate initial events
        const initialEvents = [
            { id: '1', type: 'warning' as const, message: "Bot #03 (Full-Auto): Low noodle inventory (15%)", time: "2m ago" },
            { id: '2', type: 'success' as const, message: "Bot #08 (Vending): Automated cleaning cycle complete", time: "12m ago" },
            { id: '3', type: 'info' as const, message: "Bot #11 (Kiosk): Daily diagnostics passed", time: "45m ago" },
            { id: '4', type: 'warning' as const, message: "Bot #04 (Semi): Sauce dispenser validation needed", time: "1h ago" },
            { id: '5', type: 'success' as const, message: "System: Firmware update v2.4.0 deployed", time: "2h ago" },
        ];

        setState(prev => ({
            ...prev,
            revenueHistory: initialHistory,
            cleaningLog: initialCleaningLog,
            recentEvents: initialEvents
        }));

    }, []);

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
            activeBots: prev.activeBots > 0 ? prev.activeBots - 1 : 0,
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
            activeBots: 13, // Restore to full fleet
            recentEvents: [newEvent, ...prev.recentEvents].slice(0, 10)
        }));
    };

    useEffect(() => {
        if (!isMounted) return;

        // Main Ticker: Updates Revenue & Orders
        // Slowed down to 3.5 seconds
        const mainTicker = setInterval(() => {
            setState(prev => {
                const isRush = prev.isRushActive;
                const isCritical = prev.systemStatus === 'critical';

                // Realistic increment: $9 - $15 per tick
                let baseIncrement = Math.random() * (15 - 9) + 9;

                // Impact of critical status: 20% reduction in revenue efficiency
                if (isCritical) {
                    baseIncrement = baseIncrement * 0.8;
                }

                const multiplier = isRush ? (Math.random() * (2.5 - 1.5) + 1.5) : 1;
                const revenueIncrease = baseIncrement * multiplier;
                const newRevenue = prev.revenue + revenueIncrease;

                // Inventory Logic (slower drain)
                let newSoupLevel = prev.soupLevel - (Math.random() * 0.05 + 0.02) * multiplier;
                let newNoodleStock = prev.noodleStock - (Math.floor(Math.random() * 1.5)) * 0.1;

                // Sensor Logic (Telemetry)
                const freezerNoise = (Math.random() - 0.5) * 0.4;
                let newFreezerTemp = -18.0 + freezerNoise;

                const cookerNoise = (Math.random() - 0.5) * 1.0;
                let newCookerTemp = 95.0 + cookerNoise;

                // Motor Load
                let newMotorLoad = prev.motorLoad;
                if (Math.random() > 0.8) {
                    newMotorLoad = Math.min(95, prev.motorLoad + Math.random() * 10);
                } else {
                    newMotorLoad = Math.max(25, prev.motorLoad - 2);
                }

                // Power Usage
                const newPowerUsage = 1.2 + (newMotorLoad / 100) * 1.5;

                const newMotorHistory = [...prev.motorHistory, newMotorLoad].slice(-30);

                // Cleaning Log Logic
                let newCleaningLog = prev.cleaningLog;
                if (Math.random() > 0.98) { // Rare
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
                        message: "System: Noodle Hopper restocked",
                        time: "Just now"
                    });
                }

                // Update history
                const now = new Date();
                const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

                // Add revenue to history only occasionally to avoid cluttering graph too fast? 
                // Creating a smooth graph requires points. We'll keep it but maybe it pushes too fast previously.
                // With 3.5s interval, it's fine.
                const newHistoryPoint = {
                    time: timeString,
                    value: newRevenue
                };
                const newHistory = [...prev.revenueHistory, newHistoryPoint].slice(-20);

                const combinedEvents = [...inventoryEvents, ...prev.recentEvents].slice(0, 10);

                return {
                    ...prev,
                    revenue: newRevenue,
                    totalOrders: prev.totalOrders + (isRush ? Math.floor(Math.random() * 2) + 1 : (Math.random() > 0.5 ? 1 : 0)),
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
        }, 3500); // 3.5 seconds per tick

        return () => {
            clearInterval(mainTicker);
            if (rushTimeoutRef.current) clearTimeout(rushTimeoutRef.current);
        };
    }, []);

    return { ...state, triggerLunchRush, triggerFault, resolveFault };
}
