"use client";

import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";
import { Users, Building2, TrendingUp, Star, ShieldCheck, Coins } from "lucide-react";

export function AIRoboticSolutions() {
    const { t } = useTranslation();

    const solutions = [
        {
            key: "personnel",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            key: "rent",
            icon: Building2,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
        {
            key: "labor",
            icon: TrendingUp,
            color: "text-green-500",
            bg: "bg-green-50",
        },
        {
            key: "reputation",
            icon: Star,
            color: "text-yellow-500",
            bg: "bg-yellow-50",
        },
        {
            key: "safety",
            icon: ShieldCheck,
            color: "text-red-500",
            bg: "bg-red-50",
        },
        {
            key: "revenue",
            icon: Coins,
            color: "text-orange-500",
            bg: "bg-orange-50",
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 font-sans mb-4">
                        {t("ai_solutions.title")}
                    </h2>
                    <div className="h-1 w-20 bg-neon-orange mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((item, index) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className={`inline-flex p-3 rounded-xl ${item.bg} ${item.color} mb-6`}>
                                <item.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {t(`ai_solutions.${item.key}.title`)}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                <Trans
                                    i18nKey={`ai_solutions.${item.key}.desc`}
                                    components={{ strong: <strong className="font-bold text-gray-900" /> }}
                                />
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
