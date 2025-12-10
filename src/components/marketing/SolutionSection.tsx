"use client";

import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function SolutionSection() {
    const { t } = useTranslation();

    const benefits = ["benefit1", "benefit2", "benefit3"];

    return (
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#444cf7_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center rounded-full border border-neon-blue/30 bg-neon-blue/10 px-3 py-1 text-sm font-medium text-neon-blue mb-6">
                            Bots & Bowls Platform
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-sans leading-tight text-neon-orange">
                            {t("solution.title")}
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">
                            {t("solution.subtitle")}
                        </p>

                        <div className="space-y-8">
                            {benefits.map((key, index) => (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex items-start gap-4"
                                >
                                    <CheckCircle2 className="text-neon-orange flex-shrink-0 mt-1" size={28} />
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {t(`solution.${key}.title`)}
                                        </h3>
                                        <p className="text-gray-400">
                                            {t(`solution.${key}.desc`)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-neon-blue/20 blur-3xl rounded-full" />
                        <img
                            src="/images/Explain no text.png"
                            alt="AI Kitchen Solution"
                            className="relative z-10 w-full h-auto rounded-2xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
