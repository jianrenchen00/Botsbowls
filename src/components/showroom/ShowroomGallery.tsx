"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function ShowroomGallery() {
    const { t } = useTranslation();

    // Placeholder images for now - user will upload more later
    // Using existing assets as placeholders to demonstrate layout
    const images = [
        { src: "/images/noodle-machine.png", alt: "Noodle Machine Close-up", span: "col-span-1 md:col-span-2 row-span-2" },
        { src: "/images/soup-robot.png", alt: "Soup Robot Operation", span: "col-span-1" },
        { src: "/images/wok-robot.png", alt: "Wok Robot Action", span: "col-span-1" },
        { src: "/images/hero-bg.png", alt: "Finished Dish Presentation", span: "col-span-1 md:col-span-2" },
    ];

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {t("showroom.gallery_title")}
                    </h2>
                    <div className="h-1 w-16 bg-neon-orange rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-2xl overflow-hidden group ${img.span}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>

                {/* Upload Placeholder for User */}
                <div className="mt-12 p-8 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50">
                    <p className="text-gray-500">
                        [User to upload more showroom images here]
                    </p>
                </div>
            </div>
        </section>
    );
}
