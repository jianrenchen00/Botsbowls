"use client";

import { useRef, useState, useEffect } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ProductShowcase() {
    const { t } = useTranslation();

    const products = [
        {
            id: "noodle-bar",
            titleKey: "products.noodle.title",
            descKey: "products.noodle.desc",
            specs: ["48s/bowl", "24/7 Ops", "2.5m² Footprint"],
            image: "/images/noodle-machine.png",
        },
        {
            id: "soup-bot",
            titleKey: "products.soup.title",
            descKey: "products.soup.desc",
            specs: ["±0.5g Precision", "Smart Temp Control", "Auto-Cleaning"],
            image: "/images/soup-robot.png",
        },
        {
            id: "wok-bot",
            titleKey: "products.wok.title",
            descKey: "products.wok.desc",
            specs: ["Induction Heating", "Toss Motion", "300+ Recipes"],
            image: "/images/wok-robot.png",
        },
    ];

    return (
        <section id="products" className="py-20 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl sm:text-5xl font-bold text-neon-orange font-sans mb-4">
                        {t("products.section_title")}
                    </h2>
                    <div className="h-1 w-20 bg-neon-orange rounded-full mx-auto" />
                </div>

                <div className="space-y-32">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                                } items-center gap-12`}
                        >
                            {/* Image Side */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="flex-1 w-full"
                            >
                                <div className="relative aspect-square max-w-lg mx-auto">
                                    <div className="absolute inset-0 bg-neon-orange/10 rounded-full blur-3xl" />
                                    <GlassContainer className="relative z-10 h-full flex items-center justify-center p-8 bg-white/40 border-black/5">
                                        <img
                                            src={product.image}
                                            alt="Product"
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                        />
                                    </GlassContainer>
                                </div>
                            </motion.div>

                            {/* Content Side */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex-1 text-left"
                            >
                                <h3 className="text-3xl font-bold text-foreground mb-6">
                                    {t(product.titleKey)}
                                </h3>
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {product.specs.map((spec, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-full bg-neon-orange/10 text-neon-orange text-sm font-mono border border-neon-orange/20"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed break-words hyphens-auto">
                                    {t(product.descKey)}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
