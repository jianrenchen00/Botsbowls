"use client";

import { useTranslation } from "react-i18next";
import { GlassContainer } from "@/components/ui/GlassContainer";

export function ScenariosSection() {
    const { t } = useTranslation();

    const scenarios = [
        { key: "retail", image: "/images/supermarket.png" },
        { key: "university", image: "/images/library.png" },
        { key: "transport", image: "/images/airport.png" },
        { key: "healthcare", image: "/images/hospital.png" },
        { key: "nightlife", image: "/images/bar.png" },
        { key: "industrial", image: "/images/outside 2.png" },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        {t("scenarios.title")}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t("scenarios.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {scenarios.map((item) => (
                        <div
                            key={item.key}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
                        >
                            <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
                                <img
                                    src={item.image}
                                    alt={t(`scenarios.${item.key}.title`)}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-black mb-4">
                                    {t(`scenarios.${item.key}.title`)}
                                </h3>
                                <p className="text-gray-800 leading-relaxed text-sm flex-1">
                                    {t(`scenarios.${item.key}.desc`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
