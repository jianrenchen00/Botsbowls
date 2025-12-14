import React from 'react';

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white flex font-sans">
            {children}
        </div>
    );
}

