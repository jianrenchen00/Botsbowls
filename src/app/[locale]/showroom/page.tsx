"use client";

import { useTranslation } from "react-i18next";
import { ShowroomGallery } from "@/components/showroom/ShowroomGallery";
import { motion } from "framer-motion";

export default function ShowroomPage() {
    const { t } = useTranslation();

    return (
        <main className="min-h-screen pt-20 bg-white">
            {/* Showroom Hero */}
            <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-orange/20 to-neon-blue/20 opacity-30" />
                    {/* Abstract Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl font-bold mb-6 font-sans"
                    >
                        {t("showroom.title")}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        {t("showroom.subtitle")}
                    </motion.p>
                </div>
            </section>

            <ShowroomGallery />

        </main>
    );
}
