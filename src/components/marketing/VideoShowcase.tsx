"use client";

import { useTranslation } from "react-i18next";

export function VideoShowcase() {
    const { t } = useTranslation();

    return (
        <section id="video-gallery" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-black font-sans mb-4">
                        {t("video_showcase.title", "See It In Action / 實機展示")}
                    </h2>
                    <div className="h-1 w-20 bg-neon-orange mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Video 1: Landscape */}
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/M2VS7o-G3-0"
                            title="Video 1"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Video 2: Landscape */}
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/wk8og91YwRw"
                            title="Video 2"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Video 3: Vertical Shorts */}
                    <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black flex justify-center items-center">
                        <div className="aspect-[9/16] h-full w-full max-w-[300px] md:max-w-full">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/d5rl86In5gc"
                                title="Video 3"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
