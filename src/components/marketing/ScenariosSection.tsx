"use client";

import { useTranslation } from "react-i18next";
import { Building, GraduationCap, Plane, HeartPulse } from "lucide-react";

export function ScenariosSection() {
    const { t } = useTranslation();

    const scenarios = [
        { key: "retail", icon: Building },
        { key: "university", icon: GraduationCap },
        { key: "transport", icon: Plane },
        { key: "healthcare", icon: HeartPulse },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans">
                        {t("scenarios.title")}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {t("scenarios.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {scenarios.map((item) => (
                        <div
                            key={item.key}
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-neon-orange/50 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-neon-orange/10 transition-colors">
                                <item.icon className="text-gray-600 group-hover:text-neon-orange transition-colors" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {t(`scenarios.${item.key}.title`)}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {t(`scenarios.${item.key}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
