import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bots & Bowls - Franchise',
    description: 'Join our global network.',
};

export default function FranchisePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold text-white mb-4">Franchise Opportunities</h1>
            <p className="text-gray-400">Become a partner in the smart catering revolution.</p>
        </main>
    );
}
