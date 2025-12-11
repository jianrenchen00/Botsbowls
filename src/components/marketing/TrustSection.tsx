"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Globe, Award, ShieldCheck, Factory } from "lucide-react";

export function TrustSection() {
    const { t } = useTranslation();

    return (
        <section id="trust" className="py-24 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        {t("trust.title")}
                    </h2>
                    <div className="h-1 w-20 bg-black mx-auto rounded-full" />
                </div>

                {/* Iron Triangle Text */}
                <div className="max-w-7xl mx-auto mb-20">
                    <h3 className="text-3xl font-bold text-black text-center mb-12">
                        {t("trust.vision.title")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Speed */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden shadow-md">
                                <img src="/images/triangle-speed.png" alt="Speed" className="object-cover w-full h-full" />
                            </div>
                            <h4 className="text-xl font-bold text-black mb-2">{t("trust.vision.speed.title")}</h4>
                            <p className="text-gray-600">{t("trust.vision.speed.desc")}</p>
                        </div>
                        {/* Quality */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden shadow-md">
                                <img src="/images/triangle-quality.png" alt="Quality" className="object-cover w-full h-full" />
                            </div>
                            <h4 className="text-xl font-bold text-black mb-2">{t("trust.vision.quality.title")}</h4>
                            <p className="text-gray-600">{t("trust.vision.quality.desc")}</p>
                        </div>
                        {/* Cost */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden shadow-md">
                                <img src="/images/triangle-cost.png" alt="Cost" className="object-cover w-full h-full" />
                            </div>
                            <h4 className="text-xl font-bold text-black mb-2">{t("trust.vision.cost.title")}</h4>
                            <p className="text-gray-600">{t("trust.vision.cost.desc")}</p>
                        </div>
                    </div>
                </div>

                {/* 5-Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1: Patents */}
                    <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="text-4xl font-bold text-black mb-2">
                            {t("trust.patents.title")}
                        </div>
                        <div className="text-gray-900 font-medium">
                            {t("trust.patents.desc")}
                        </div>
                    </div>

                    {/* Card 2: Scale */}
                    <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="text-4xl font-bold text-black mb-2">
                            {t("trust.scale.title")}
                        </div>
                        <div className="text-gray-900 font-medium">
                            {t("trust.scale.desc")}
                        </div>
                    </div>

                    {/* Card 3: Partner 1 (Dufengxuan) */}
                    <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="flex items-center justify-center mb-6 h-32">
                            <img src="/images/dufengxuan.png" alt="Dufengxuan" className="h-full w-auto object-contain" />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2">
                            {t("trust.dufengxuan.title")}
                        </h3>
                        <p className="text-gray-900">
                            {t("trust.dufengxuan.desc")}
                        </p>
                    </div>

                    {/* Card 4: Partner 2 (Golden Panda) */}
                    <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="flex items-center justify-center mb-6 h-32">
                            <img src="/images/pandagold.png" alt="PandaGold" className="h-full w-auto object-contain" />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2">
                            {t("trust.pandagold.title")}
                        </h3>
                        <p className="text-gray-900">
                            {t("trust.pandagold.desc")}
                        </p>
                    </div>

                    {/* Card 5: Contact */}
                    <a href="#contact" className="p-10 bg-black rounded-3xl border border-gray-800 flex flex-col justify-center hover:bg-gray-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-orange transition-colors">
                            {t("trust.contact_card.title")}
                        </h3>
                        <p className="text-gray-400">
                            {t("trust.contact_card.desc")}
                        </p>
                    </a>
                </div>
            </div>
        </section>
    );
}
