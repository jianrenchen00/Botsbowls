import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bots & Bowls - Dashboard',
    description: 'Manage your catering bot fleet.',
};

export default function DashboardPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold text-neon-green mb-4">Dashboard</h1>
            <div className="glass p-8 rounded-xl">
                <p className="text-gray-300">Wallet connection and stats will go here.</p>
            </div>
        </main>
    );
}
