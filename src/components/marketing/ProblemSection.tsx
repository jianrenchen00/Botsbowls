"use client";

import { useTranslation } from "react-i18next";
import { TrendingDown, Users, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export function ProblemSection() {
    const { t } = useTranslation();

    const problems = [
        {
            key: "cost",
            icon: TrendingDown,
            color: "text-red-500",
        },
        {
            key: "shortage",
            icon: Users,
            color: "text-orange-500",
        },
        {
            key: "rent",
            icon: Building2,
            color: "text-blue-500",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 font-sans">
                        {t("problem.title")}
                    </h2>
                    <p className="text-xl text-gray-600">
                        {t("problem.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {problems.map((item, index) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            <div className={`p-4 rounded-full bg-white shadow-sm mb-6 ${item.color}`}>
                                <item.icon size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {t(`problem.${item.key}.title`)}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {t(`problem.${item.key}.desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
