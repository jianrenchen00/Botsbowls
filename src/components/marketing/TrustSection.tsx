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
                    <h2 className="text-3xl sm:text-5xl font-bold text-black font-sans mb-4">
                        {t("trust.title")}
                    </h2>
                    <div className="h-1 w-20 bg-black mx-auto rounded-full" />
                </div>

                {/* Iron Triangle Text */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h3 className="text-2xl font-bold text-black mb-4">
                        {t("trust.vision.title")}
                    </h3>
                    <p className="text-xl text-gray-900 leading-relaxed">
                        {t("trust.vision.text")}
                    </p>
                </div>

                {/* 5-Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1: Patents */}
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center">
                        <div className="text-4xl font-bold text-black mb-2">
                            {t("trust.patents.title")}
                        </div>
                        <div className="text-gray-900 font-medium">
                            {t("trust.patents.desc")}
                        </div>
                    </div>

                    {/* Card 2: Scale */}
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center">
                        <div className="text-4xl font-bold text-black mb-2">
                            {t("trust.scale.title")}
                        </div>
                        <div className="text-gray-900 font-medium">
                            {t("trust.scale.desc")}
                        </div>
                    </div>

                    {/* Card 3: Partner 1 (Dufengxuan) */}
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <img src="/images/dufengxuan.png" alt="Dufengxuan" className="h-12 w-auto object-contain" />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2">
                            {t("trust.dufengxuan.title")}
                        </h3>
                        <p className="text-gray-900">
                            {t("trust.dufengxuan.desc")}
                        </p>
                    </div>

                    {/* Card 4: Partner 2 (Golden Panda) */}
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <img src="/images/pandagold.png" alt="PandaGold" className="h-12 w-auto object-contain" />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2">
                            {t("trust.pandagold.title")}
                        </h3>
                        <p className="text-gray-900">
                            {t("trust.pandagold.desc")}
                        </p>
                    </div>

                    {/* Card 5: Contact */}
                    <a href="#contact" className="p-8 bg-black rounded-2xl border border-gray-800 flex flex-col justify-center hover:bg-gray-900 transition-colors group cursor-pointer">
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
