"use client";

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

export function VideoShowcase() {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    const homeT = HOME_TRANSLATIONS[locale as keyof typeof HOME_TRANSLATIONS] || HOME_TRANSLATIONS.en;

    return (
        <section id="video-gallery" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        {t("video_showcase.title")}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t("video_showcase.subtitle")}
                    </p>
                </div>

                {/* 6-Video Grid - Responsive Layout */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4">

                    {/* 1. Smart Integrated Noodle Machine */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black group">
                            <iframe
                                src="https://www.youtube.com/embed/9H4O3il-E54"
                                title={homeT.videos.integrated}
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md font-bold text-slate-800 text-center mt-2">{homeT.videos.integrated}</h3>
                    </div>

                    {/* 2. Multi Grain Beverage Machine */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black group">
                            <iframe
                                src="https://www.youtube.com/embed/zwJIiKpp5rc"
                                title={homeT.videos.beverage}
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md font-bold text-slate-800 text-center mt-2">{homeT.videos.beverage}</h3>
                    </div>

                    {/* 3. Robotic Noodle Shop */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black group">
                            <iframe
                                src="https://www.youtube.com/embed/gw1hNUwSGBg"
                                title={homeT.videos.robot}
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md font-bold text-slate-800 text-center mt-2">{homeT.videos.robot}</h3>
                    </div>

                    {/* 4. Smart Noodle Bar */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black group">
                            <iframe
                                src="https://www.youtube.com/embed/I1vN4Cy3EvM"
                                title={homeT.videos.bar}
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md font-bold text-slate-800 text-center mt-2">{homeT.videos.bar}</h3>
                    </div>

                    {/* 5. Bots & Bowls Official Theme */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black group">
                            <iframe
                                src="https://www.youtube.com/embed/M2VS7o-G3-0"
                                title={homeT.videos.theme}
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md font-bold text-slate-800 text-center mt-2">{homeT.videos.theme}</h3>
                    </div>

                    {/* 6. Future Noodle Restaurant (Barcelona) - Shorts */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black group">
                            <iframe
                                src="https://www.youtube.com/embed/d5rl86In5gc"
                                title={homeT.videos.barcelona}
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md font-bold text-slate-800 text-center mt-2">{homeT.videos.barcelona}</h3>
                    </div>

                </div>
            </div>
        </section>
    );
}
