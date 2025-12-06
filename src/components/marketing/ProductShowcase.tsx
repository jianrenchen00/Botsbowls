"use client";

import { useRef, useState, useEffect } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const products = [
    {
        id: "noodle_bar",
        image: "https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?q=80&w=1936&auto=format&fit=crop", // Abstract Tech / Lab
    },
    {
        id: "soup_robot",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop", // Industrial Robot Arm
    },
    {
        id: "wok_robot",
        image: "https://images.unsplash.com/photo-1555664424-778a69fdb0c8?q=80&w=2085&auto=format&fit=crop", // Electronics / Heat
    },
];

export function ProductShowcase() {
    const { t } = useTranslation();
    const [activeProduct, setActiveProduct] = useState(products[0].id);

    // Refs for scroll tracking
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Simple intersection observer to detect which product is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-id");
                        if (id) setActiveProduct(id);
                    }
                });
            },
            {
                root: null,
                rootMargin: "-40% 0px -40% 0px", // Trigger when element is in the middle 20% of screen
                threshold: 0.1,
            }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <section className="py-20 relative z-10 bg-background" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white font-sans mb-4">
                        {t("products.title")}
                    </h2>
                    <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Sticky Left Column - Images */}
                    <div className="hidden lg:block relative h-[600px]">
                        <div className="sticky top-32 h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: activeProduct === product.id ? 1 : 0,
                                        scale: activeProduct === product.id ? 1 : 1.1,
                                    }}
                                    transition={{ duration: 0.7, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.id}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Scrollable Right Column - Content */}
                    <div className="space-y-24 lg:space-y-48 pb-24">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                data-id={product.id}
                                ref={(el) => {
                                    sectionRefs.current[index] = el;
                                }}
                                className="min-h-[400px] flex flex-col justify-center"
                            >
                                {/* Mobile Image (Visible only on small screens) */}
                                <div className="lg:hidden mb-8 rounded-xl overflow-hidden h-64 border border-white/10 relative">
                                    <img
                                        src={product.image}
                                        alt={product.id}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                                </div>

                                <GlassContainer className="p-8 border-l-4 border-l-neon-blue">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">
                                        {t(`products.${product.id}.headline`)}
                                    </h3>
                                    <p className="text-gray-400 mb-8 text-lg leading-relaxed break-words">
                                        {t(`products.${product.id}.description`)}
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {Object.entries(
                                            t(`products.${product.id}.specs`, { returnObjects: true }) as Record<string, string>
                                        ).map(([key, value]) => (
                                            <span
                                                key={key}
                                                className="px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-sm font-mono font-medium"
                                            >
                                                {value}
                                            </span>
                                        ))}
                                    </div>
                                </GlassContainer>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
