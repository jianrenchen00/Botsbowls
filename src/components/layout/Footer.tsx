"use client";

import { useTranslation } from "react-i18next";
import { Twitter, Instagram, Linkedin, Disc, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-16 relative z-10 text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
                    {/* Brand Column (2 cols wide) */}
                    <div className="lg:col-span-2">
                        <img src="/images/logo.jpg" alt="Bots & Bowls" className="h-12 w-auto rounded-full mb-6" />
                        <p className="text-gray-500 text-sm mb-6 max-w-xs">
                            {t("hero.subtitle")}
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://x.com/botsbowls52063?s=21&t=fLyb2AtOjb8bwrJ6l_0k-g"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.youtube.com/@BotsandBowls"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/botbowls2025?igsh=ZGV1ajBiaG92d2Y4&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-pink-500 transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">{t("footer.company.title")}</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="#hero" className="hover:text-neon-orange transition-colors">{t("footer.company.about")}</Link></li>
                            <li><Link href="#trust" className="hover:text-neon-orange transition-colors">{t("footer.company.story")}</Link></li>
                            <li><Link href="#contact" className="hover:text-neon-orange transition-colors">{t("footer.company.careers")}</Link></li>
                        </ul>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">{t("footer.product.title")}</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="#fleet" className="hover:text-neon-orange transition-colors">{t("footer.product.fleet")}</Link></li>
                            <li><Link href="#fleet" className="hover:text-neon-orange transition-colors">{t("footer.product.bar")}</Link></li>
                            <li><Link href="/showroom" className="hover:text-neon-orange transition-colors">{t("footer.product.showroom")}</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">{t("footer.resources.title")}</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="#roi" className="hover:text-neon-orange transition-colors">{t("footer.resources.roi")}</Link></li>
                            <li><a href="https://gamma.app/docs/Bots-Bowls-Investment-Thesis-70q80058910101" target="_blank" rel="noopener noreferrer" className="hover:text-neon-orange transition-colors">{t("footer.resources.thesis")}</a></li>
                            <li><Link href="#contact" className="hover:text-neon-orange transition-colors">{t("footer.resources.faq")}</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">{t("footer.legal.title")}</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-neon-orange transition-colors">{t("footer.legal.privacy")}</a></li>
                            <li><a href="#" className="hover:text-neon-orange transition-colors">{t("footer.legal.terms")}</a></li>
                            <li><a href="#" className="hover:text-neon-orange transition-colors">{t("footer.legal.cookie")}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Kensington Knowledge Crafts Ltd. Copy Right.
                    </p>
                </div>
            </div>
        </footer>
    );
}
