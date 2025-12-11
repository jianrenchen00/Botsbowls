import { RevenueWidget } from "@/components/demo/RevenueWidget";
import { FleetStatusWidget } from "@/components/demo/FleetStatusWidget";
import { AlertStreamWidget } from "@/components/demo/AlertStreamWidget";
import { GlobalMapWidget } from "@/components/demo/GlobalMapWidget";

export default function DemoPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <header className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
                        Command Center
                    </h1>
                    <p className="text-slate-400">Global Franchise Operations Overview</p>
                </div>
                <div className="flex gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Data Feed
                    </span>
                </div>
            </header>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                {/* Revenue Widget - Large (2x2) */}
                <div className="md:col-span-2 md:row-span-1 lg:col-span-2">
                    <RevenueWidget />
                </div>

                {/* Fleet Status - Medium (1x1) */}
                <div className="md:col-span-1 md:row-span-1">
                    <FleetStatusWidget />
                </div>

                {/* Quick Actions / Stat - Small (1x1) to fill row */}
                <div className="md:col-span-1 md:row-span-1 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Avg. Prep Time</p>
                        <p className="text-3xl font-bold text-white font-mono">48s</p>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
                    </div>
                    <p className="text-xs text-emerald-400 mt-2">12% faster than target</p>
                </div>

                {/* Global Map - Large Width (3x2) */}
                <div className="md:col-span-3 lg:col-span-3 min-h-[300px]">
                    <GlobalMapWidget />
                </div>

                {/* Alert Stream - Tall Side Panel (1x2) */}
                <div className="md:col-span-1 lg:col-span-1 md:row-span-2">
                    <AlertStreamWidget />
                </div>
            </div>
        </div>
    );
}
