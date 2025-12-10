"use client";

import { useTranslation } from "react-i18next";
import { Twitter, Instagram, Linkedin, Disc, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-background border-t border-white/5 py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <img src="/images/logo.jpg" alt="Bots & Bowls" className="h-10 w-auto rounded-full mb-4" />
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Kensington Knowledge Crafts Ltd. Copy Right.
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
                        <a
                            href="https://x.com/botsbowls52063?s=21&t=fLyb2AtOjb8bwrJ6l_0k-g"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-neon-blue transition-colors"
                        >
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.youtube.com/@BotsandBowls"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                            <Youtube className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.instagram.com/botbowls2025?igsh=ZGV1ajBiaG92d2Y4&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-pink-500 transition-colors"
                        >
                            <Instagram className="h-5 w-5" />
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
