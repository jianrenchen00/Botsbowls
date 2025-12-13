"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { motion } from "framer-motion";
import Link from 'next/link';
import { useTranslation } from "react-i18next";


const HOME_TRANSLATIONS = {
    en: {
        btnSpec: "Product Specification",
        videos: {
            integrated: "Smart Integrated Noodle Machine",
            beverage: "Multi Grain Beverage Machine",
            robot: "Robotic Noodle Shop",
            bar: "Smart Noodle Bar",
            theme: "Bots & Bowls Official Theme",
            barcelona: "Future Noodle Restaurant (Barcelona)"
        }
    },
    "zh-TW": {
        btnSpec: "產品規格",
        videos: {
            integrated: "智能粉麵一體機",
            beverage: "五穀雜糧飲品機",
            robot: "機器人麵館",
            bar: "智能自動售賣麵吧",
            theme: "Bots & Bowls 官方主題曲",
            barcelona: "未來麵館 (巴塞隆納店)"
        }
    },
    fr: {
        btnSpec: "Spécifications du Produit",
        videos: {
            integrated: "Machine à Nouilles Intégrée",
            beverage: "Machine à Boissons Multi-Grains",
            robot: "Robot Noodle Shop",
            bar: "Bar à Nouilles Intelligent",
            theme: "Thème Officiel Bots & Bowls",
            barcelona: "Futur Restaurant de Nouilles (Barcelone)"
        }
    },
    es: {
        btnSpec: "Especificaciones del Producto",
        videos: {
            integrated: "Máquina Integral de Fideos",
            beverage: "Máquina de Bebidas Multigrano",
            robot: "Tienda de Fideos Robótica",
            bar: "Barra de Fideos Inteligente",
            theme: "Tema Oficial Bots & Bowls",
            barcelona: "Restaurante de Fideos del Futuro (Barcelona)"
        }
    }
};

export function ProductShowcase() {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    const homeT = HOME_TRANSLATIONS[locale as keyof typeof HOME_TRANSLATIONS] || HOME_TRANSLATIONS.en;

    const products = [
        {
            id: "smart_dough",
            image: "/images/Smart Noodle Bar.png",
        },
        {
            id: "smart_cooked",
            image: "/images/DOUGH.png",
        },
        {
            id: "smart_wok",
            image: "/images/Wok.png",
        },
        {
            id: "smart_soup",
            image: "/images/Soup 1.png",
        },
    ];

    return (
        <section id="fleet" className="py-24 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        {t("products.section_title")}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t("products.subtitle")}
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Link href="/products">
                            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                                {homeT.btnSpec}
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col h-full p-6 rounded-3xl hover:bg-white/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Image Top */}
                            <div className="relative aspect-square mb-6 group">
                                <div className="absolute inset-0 bg-neon-orange/5 rounded-3xl blur-xl group-hover:bg-neon-orange/10 transition-colors" />
                                <div className="relative z-10 h-full flex items-center justify-center rounded-3xl overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={t(`products.${product.id}.title`)}
                                        className="w-full h-full object-contain drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
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

                                <p className="text-sm text-gray-600 leading-relaxed flex-grow">
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
