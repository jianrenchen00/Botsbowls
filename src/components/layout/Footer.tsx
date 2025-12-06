"use client";

import { useTranslation } from "react-i18next";
import { Twitter, Instagram, Linkedin, Disc } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-background border-t border-white/5 py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink mb-2">
                            Bots & Bowls
                        </span>
                        <p className="text-gray-500 text-sm">
                            {t("footer.copyright")}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-6 text-sm text-gray-400">
                        <Link href="#products" className="hover:text-white transition-colors">
                            {t("footer.products")}
                        </Link>
                        <Link href="#roi" className="hover:text-white transition-colors">
                            {t("footer.roi")}
                        </Link>
                        <Link href="#contact" className="hover:text-white transition-colors">
                            {t("footer.contact")}
                        </Link>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-500 hover:text-neon-blue transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-neon-purple transition-colors">
                            <Disc className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex justify-center gap-6 text-xs text-gray-600">
                    <a href="#" className="hover:text-gray-400">{t("footer.privacy")}</a>
                    <a href="#" className="hover:text-gray-400">{t("footer.terms")}</a>
                </div>
            </div>
        </footer>
    );
}
