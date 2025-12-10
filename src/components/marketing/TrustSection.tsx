"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Globe, Award, ShieldCheck, Factory } from "lucide-react";

export function TrustSection() {
    const { t } = useTranslation();

    return (
        <section className="py-20 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold text-black font-sans mb-4">
                        {t("trust.title")}
                    </h2>
                    <div className="h-1 w-20 bg-black mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                    {/* Card 1: Vision - Spans 2 columns */}
                    <GlassContainer className="md:col-span-2 relative overflow-hidden group bg-gradient-to-br from-background to-neon-blue/10 border-neon-blue/20">
                        <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-10">
                            <div className="mb-6 h-12 w-12 rounded-full bg-neon-blue/20 flex items-center justify-center">
                                <ShieldCheck className="h-6 w-6 text-neon-blue" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 font-sans">
                                {t("trust.vision.title")}
                            </h3>
                            <p className="text-gray-900 text-lg sm:text-xl max-w-2xl leading-relaxed break-words hyphens-auto">
                                {t("trust.vision.text")}
                            </p>
                        </div>
                        {/* Abstract Background Decoration */}
                        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-neon-blue/5 blur-3xl group-hover:bg-neon-blue/10 transition-colors duration-500" />
                    </GlassContainer>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h3 className="text-2xl font-bold text-black mb-4">
                            {t("trust.vision.title")}
                        </h3>
                        <p className="text-xl text-gray-900 leading-relaxed">
                            {t("trust.vision.text")}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="text-4xl font-bold text-black mb-2">
                                {t("trust.stats.value")}
                            </div>
                            <div className="text-gray-900 font-medium">
                                {t("trust.stats.label")}
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="text-4xl font-bold text-black mb-2">
                                16,000
                            </div>
                            <div className="text-gray-900 font-medium">
                                Nodes by 2028
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <ShieldCheck className="text-neon-orange" size={32} />
                            <h3 className="text-xl font-bold text-black">
                                {t("trust.dufengxuan.title")}
                            </h3>
                        </div>
                        <div className="inline-block px-3 py-1 rounded-full bg-neon-orange/10 text-black text-sm font-medium mb-4">
                            {t("trust.dufengxuan.tag")}
                        </div>
                        <p className="text-gray-900">
                            {t("trust.dufengxuan.text")}
                        </p>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <Globe className="text-neon-orange" size={32} />
                            <h3 className="text-xl font-bold text-black">
                                {t("trust.pandagold.title")}
                            </h3>
                        </div>
                        <div className="inline-block px-3 py-1 rounded-full bg-neon-orange/10 text-black text-sm font-medium mb-4">
                            {t("trust.pandagold.tag")}
                        </div>
                        <p className="text-gray-900">
                            {t("trust.pandagold.text")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
