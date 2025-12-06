import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bots & Bowls - Tokenomics',
    description: 'Understanding the $BOWL token.',
};

export default function TokenomicsPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold text-neon-blue mb-4">Tokenomics</h1>
            <p className="text-gray-400">$BOWL Token distribution and utility.</p>
        </main>
    );
}
