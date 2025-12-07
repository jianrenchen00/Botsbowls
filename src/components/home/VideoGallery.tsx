"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { useTranslation } from "react-i18next";

export function VideoGallery() {
    const { t } = useTranslation();

    return (
        <section id="video-gallery" className="py-20 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-sans mb-4">
                        {t("video_gallery.title")}
                    </h2>
                    <div className="h-1 w-20 bg-neon-orange rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Video (16:9) */}
                    <div className="lg:col-span-2">
                        <GlassContainer className="h-full p-2 overflow-hidden">
                            <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden">
                                <iframe
                                    src="https://www.youtube.com/embed/M2VS7o-G3-0"
                                    title="Bots & Bowls Main Video"
                                    className="absolute top-0 left-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </GlassContainer>
                    </div>

                    {/* Vertical Video (Shorts) */}
                    <div className="lg:col-span-1">
                        <GlassContainer className="h-full p-2 overflow-hidden flex items-center justify-center bg-black/5">
                            <div className="relative w-full h-0 pb-[177.77%] rounded-xl overflow-hidden max-w-[350px] mx-auto">
                                <iframe
                                    src="https://www.youtube.com/embed/d5rl86In5gc"
                                    title="Bots & Bowls Shorts"
                                    className="absolute top-0 left-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </GlassContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}
