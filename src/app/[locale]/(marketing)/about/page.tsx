import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bots & Bowls - About',
    description: 'Learn about our mission.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
            <p className="text-gray-400">Revolutionizing catering with blockchain technology.</p>
        </main>
    );
}
