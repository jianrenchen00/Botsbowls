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
                    <h2 className="text-3xl sm:text-5xl font-bold text-white font-sans mb-4">
                        {t("trust.title")}
                    </h2>
                    <div className="h-1 w-20 bg-neon-orange mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                    {/* Card 1: Vision - Spans 2 columns */}
                    <GlassContainer className="md:col-span-2 relative overflow-hidden group bg-gradient-to-br from-background to-neon-blue/10 border-neon-blue/20">
                        <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-10">
                            <div className="mb-6 h-12 w-12 rounded-full bg-neon-blue/20 flex items-center justify-center">
                                <ShieldCheck className="h-6 w-6 text-neon-blue" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
                                {t("trust.vision.title")}
                            </h3>
                            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed break-words hyphens-auto">
                                {t("trust.vision.text")}
                            </p>
                        </div>
                        {/* Abstract Background Decoration */}
                        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-neon-blue/5 blur-3xl group-hover:bg-neon-blue/10 transition-colors duration-500" />
                    </GlassContainer>

                    {/* Card 2: Strategic Partner - Dufengxuan */}
                    <GlassContainer className="p-6 sm:p-8 flex flex-col justify-between group hover:border-neon-orange/30 transition-colors">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Factory className="h-5 w-5 text-gray-400 group-hover:text-neon-orange transition-colors" />
                                </div>
                                <span className="px-2 py-1 rounded text-xs font-mono bg-white/5 text-gray-400 border border-white/10">
                                    {t("trust.dufengxuan.tag")}
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">
                                {t("trust.dufengxuan.title")}
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {t("trust.dufengxuan.text")}
                            </p>
                        </div>
                    </GlassContainer>

                    {/* Card 3: Strategic Partner - PandaGold */}
                    <GlassContainer className="p-6 sm:p-8 flex flex-col justify-between group hover:border-neon-green/30 transition-colors">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Factory className="h-5 w-5 text-gray-400 group-hover:text-neon-green transition-colors" />
                                </div>
                                <span className="px-2 py-1 rounded text-xs font-mono bg-white/5 text-gray-400 border border-white/10">
                                    {t("trust.pandagold.tag")}
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">
                                {t("trust.pandagold.title")}
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {t("trust.pandagold.text")}
                            </p>
                        </div>
                    </GlassContainer>

                    {/* Card 4: Innovation Stats */}
                    <GlassContainer className="p-6 sm:p-8 flex flex-col items-center justify-center text-center bg-black/40 border-neon-orange/20">
                        <Award className="h-8 w-8 text-neon-orange mb-4 opacity-80" />
                        <span className="text-5xl sm:text-6xl font-mono font-bold text-neon-orange mb-2 tracking-tighter">
                            {t("trust.stats.value")}
                        </span>
                        <span className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                            {t("trust.stats.label")}
                        </span>
                    </GlassContainer>

                    {/* Card 5: Global Layout */}
                    <GlassContainer className="p-6 sm:p-8 flex flex-col justify-center bg-gradient-to-br from-white/5 to-transparent">
                        <div className="mb-4 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Globe className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-lg text-gray-300 font-medium leading-relaxed">
                            {t("trust.global.text")}
                        </p>
                    </GlassContainer>
                </div>
            </div>
        </section>
    );
}
