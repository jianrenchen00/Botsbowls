import "@/app/globals.css";
import { Sidebar } from "@/components/demo/Sidebar";

export const metadata = {
    title: "Bots & Bowls OS | Franchisee Demo",
    description: "Experience the operating system powering the future of food.",
};

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-blue-500/30">
                <div className="flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-64 min-h-screen bg-slate-950 relative overflow-hidden">
                        {/* Background Grid Effect */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />

                        {/* Radial Gradient Glow */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 p-8">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}
