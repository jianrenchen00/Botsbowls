"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Hero() {
    const { t } = useTranslation();

    return (
        <div className="relative h-screen w-full overflow-hidden bg-background">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                    alt="Futuristic Technology"
                    className="h-full w-full object-cover opacity-60"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <GlassContainer className="backdrop-blur-xl border-white/5 bg-white/5">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <h1 className="mb-4 font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl">
                                {t('hero.headline')}
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mb-8 text-xl font-medium text-neon-blue sm:text-2xl"
                        >
                            {t('hero.subheadline')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="mb-10 flex flex-wrap justify-center gap-4 sm:gap-8"
                        >
                            <div className="flex flex-col items-center rounded-lg bg-white/5 px-4 py-2 border border-white/10">
                                <span className="text-sm text-gray-400">Operation</span>
                                <span className="font-mono text-xl font-bold text-neon-green">
                                    24/7
                                </span>
                            </div>
                            <div className="flex flex-col items-center rounded-lg bg-white/5 px-4 py-2 border border-white/10">
                                <span className="text-sm text-gray-400">Margin</span>
                                <span className="font-mono text-xl font-bold text-neon-orange">
                                    64%
                                </span>
                            </div>
                            <div className="flex flex-col items-center rounded-lg bg-white/5 px-4 py-2 border border-white/10">
                                <span className="text-sm text-gray-400">Efficiency</span>
                                <span className="font-mono text-xl font-bold text-neon-blue">
                                    99.9%
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                        >
                            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-neon-orange to-red-500 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,0,0.5)]">
                                <span className="relative z-10">{t('hero.cta_partner')}</span>
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-500 to-neon-orange opacity-0 transition-opacity group-hover:opacity-100" />
                            </button>

                            <button className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-neon-blue/50">
                                <Play className="h-5 w-5 fill-current text-neon-blue transition-transform group-hover:scale-110" />
                                <span>{t('hero.cta_watch')}</span>
                            </button>
                        </motion.div>
                    </GlassContainer>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="h-10 w-6 rounded-full border-2 border-white/20 p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-2 w-full rounded-full bg-neon-blue"
                    />
                </div>
            </motion.div>
        </div>
    );
}
