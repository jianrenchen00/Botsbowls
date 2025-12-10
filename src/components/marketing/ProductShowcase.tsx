"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ProductShowcase() {
    const { t } = useTranslation();

    const products = [
        {
            id: "smart_dough",
            image: "/images/noodle-machine.png", // Placeholder, ideally specific image
        },
        {
            id: "smart_cooked",
            image: "/images/noodle-machine.png", // Placeholder
        },
        {
            id: "smart_wok",
            image: "/images/wok-robot.png",
        },
        {
            id: "smart_soup",
            image: "/images/soup-robot.png",
        },
    ];

    return (
        <section id="fleet" className="py-20 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold text-neon-orange font-sans mb-4">
                        {t("products.section_title")}
                    </h2>
                    <div className="h-1 w-20 bg-neon-orange rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col h-full"
                        >
                            {/* Image Top */}
                            <div className="relative aspect-square mb-6 group">
                                <div className="absolute inset-0 bg-neon-orange/5 rounded-2xl blur-xl group-hover:bg-neon-orange/10 transition-colors" />
                                <GlassContainer className="relative z-10 h-full flex items-center justify-center p-6 bg-white border-gray-100 hover:border-neon-orange/30 transition-colors">
                                    <img
                                        src={product.image}
                                        alt={t(`products.${product.id}.title`)}
                                        className="w-full h-full object-contain drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </GlassContainer>
                            </div>

                            {/* Content Bottom */}
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {t(`products.${product.id}.title`)}
                                </h3>
                                <p className="text-sm font-bold text-neon-orange mb-4 uppercase tracking-wider">
                                    {t(`products.${product.id}.headline`)}
                                </p>
                                
                                {/* Specs Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {[1, 2, 3].map((num) => (
                                        <span
                                            key={num}
                                            className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200"
                                        >
                                            {t(`products.${product.id}.spec${num}`)}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {t(`products.${product.id}.desc`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
