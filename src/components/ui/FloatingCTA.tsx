"use client";

import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function FloatingCTA() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleScrollToContact}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#F26B21] text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all group"
                >
                    <MessageCircle className="w-5 h-5 animate-pulse" />
                    <span className="font-bold text-sm hidden sm:inline-block">
                        {t("cta.consult")}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
