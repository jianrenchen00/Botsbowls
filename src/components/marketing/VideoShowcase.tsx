"use client";

import { useTranslation } from "react-i18next";

export function VideoShowcase() {
    const { t } = useTranslation();

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

                {/* 2x2 Video Grid - Responsive Layout */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto px-4">
                    {/* 1. Smart Integrated Noodle Machine */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                            <iframe
                                src="https://www.youtube.com/embed/9H4O3il-E54"
                                title="Smart Integrated Noodle Machine"
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md md:text-lg font-bold text-slate-800 text-center mt-2">Smart Integrated Noodle Machine</h3>
                    </div>

                    {/* 2. Multi Grain Beverage Machine */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                            <iframe
                                src="https://www.youtube.com/embed/zwJIiKpp5rc"
                                title="Multi Grain Beverage Machine"
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md md:text-lg font-bold text-slate-800 text-center mt-2">Multi Grain Beverage Machine</h3>
                    </div>

                    {/* 3. Robotic Noodle Shop */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                            <iframe
                                src="https://www.youtube.com/embed/gw1hNUwSGBg"
                                title="Robotic Noodle Shop"
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md md:text-lg font-bold text-slate-800 text-center mt-2">Robotic Noodle Shop</h3>
                    </div>

                    {/* 4. Smart Noodle Bar */}
                    <div className="flex flex-col gap-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                            <iframe
                                src="https://www.youtube.com/embed/I1vN4Cy3EvM"
                                title="Smart Noodle Bar"
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <h3 className="text-md md:text-lg font-bold text-slate-800 text-center mt-2">Smart Noodle Bar</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}
