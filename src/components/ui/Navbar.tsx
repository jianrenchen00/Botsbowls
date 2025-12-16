"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;

        // set cookie for next-i18n-router
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "; expires=" + date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

        // redirect to the new locale path
        if (
            currentLocale === i18nConfig.defaultLocale &&
            !i18nConfig.prefixDefault
        ) {
            router.push("/" + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }

        router.refresh();
    };

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        const element = document.getElementById(id);
        if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false); // Close mobile menu on click
        }
    };

    return (
        /* Navbar updated for sticky positioning */
        <nav
            className="sticky top-0 left-0 right-0 z-50 border-b border-black/5 transition-all duration-300 backdrop-blur-md bg-white/90 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/">
                            <img src="/images/logo.jpg" alt="Bots & Bowls Logo" className="h-10 w-auto rounded-full cursor-pointer" />
                        </Link>

                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center space-x-4">
                        <a href="/#fleet" onClick={(e) => handleScrollTo(e, 'fleet')} className="text-[#F26B21] hover:text-orange-600 transition-colors text-sm font-bold">
                            {t("nav.fleet")}
                        </a>
                        <a href="/#scenarios" onClick={(e) => handleScrollTo(e, 'scenarios')} className="text-[#F26B21] hover:text-orange-600 transition-colors text-sm font-bold">
                            {t("nav.scenarios")}
                        </a>
                        <a href="/#solution" onClick={(e) => handleScrollTo(e, 'solution')} className="text-[#F26B21] hover:text-orange-600 transition-colors text-sm font-bold">
                            {t("nav.solution")}
                        </a>
                        <a href="/#profitability" onClick={(e) => handleScrollTo(e, 'profitability')} className="text-[#F26B21] hover:text-orange-600 transition-colors text-sm font-bold">
                            {t("nav.profit")}
                        </a>
                        <a href="/#trust" onClick={(e) => handleScrollTo(e, 'trust')} className="text-[#F26B21] hover:text-orange-600 transition-colors text-sm font-bold">
                            {t("nav.trust")}
                        </a>
                        <a href="https://botsbowls.com/products" className="bg-orange-500 text-white px-3 py-2 rounded-full hover:bg-orange-600 transition text-sm font-bold shadow-md hover:shadow-lg">
                            {t("nav.product_specs")}
                        </a>
                        <a href="/#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="px-3 py-2 rounded-full bg-[#F26B21] text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg">
                            {t("nav.contact")}
                        </a>
                    </div>

                    <div className="hidden xl:flex items-center space-x-4">
                        <button
                            onClick={() => alert("Tokenomics Whitepaper coming soon.")}
                            className="text-[#F26B21] hover:text-orange-600 transition-colors text-sm font-bold"
                        >
                            {t("nav.tokenomics")}
                        </button>
                        <Link
                            href={`/${currentLocale}/dashboard`}
                            className="hidden sm:block px-3 py-2 rounded-full bg-[#F26B21] hover:bg-orange-600 text-white text-sm font-bold transition-colors shadow-md hover:shadow-lg"
                        >
                            {currentLocale === 'zh-TW' ? '登入 (儀表板)' : 'Login (Dashboard)'}
                        </Link>
                        <div>
                            <select
                                onChange={handleChange}
                                value={currentLocale}
                                className="bg-white/50 text-gray-800 border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-neon-orange"
                            >
                                <option value="en">🇬🇧 English</option>
                                <option value="zh-TW">🇹🇼 繁體中文</option>
                                <option value="es">🇪🇸 Español</option>
                                <option value="fr">🇫🇷 Français</option>
                            </select>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="xl:hidden flex items-center gap-4">
                        <div>
                            <select
                                onChange={handleChange}
                                value={currentLocale}
                                className="bg-white/50 text-gray-800 border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-neon-orange w-full max-w-[140px]"
                            >
                                <option value="en">🇬🇧 English</option>
                                <option value="zh-TW">🇹🇼 繁體中文</option>
                                <option value="es">🇪🇸 Español</option>
                                <option value="fr">🇫🇷 Français</option>
                            </select>
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-neon-orange focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="xl:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 top-16 py-4 px-4 flex flex-col space-y-4">
                    <a href="/#fleet" onClick={(e) => handleScrollTo(e, 'fleet')} className="text-[#F26B21] font-bold text-lg py-2 border-b border-gray-50">
                        {t("nav.fleet")}
                    </a>
                    <a href="/#scenarios" onClick={(e) => handleScrollTo(e, 'scenarios')} className="text-[#F26B21] font-bold text-lg py-2 border-b border-gray-50">
                        {t("nav.scenarios")}
                    </a>
                    <a href="/#solution" onClick={(e) => handleScrollTo(e, 'solution')} className="text-[#F26B21] font-bold text-lg py-2 border-b border-gray-50">
                        {t("nav.solution")}
                    </a>
                    <a href="/#profitability" onClick={(e) => handleScrollTo(e, 'profitability')} className="text-[#F26B21] font-bold text-lg py-2 border-b border-gray-50">
                        {t("nav.profit")}
                    </a>
                    <a href="/#trust" onClick={(e) => handleScrollTo(e, 'trust')} className="text-[#F26B21] font-bold text-lg py-2 border-b border-gray-50">
                        {t("nav.trust")}
                    </a>
                    <a href="https://botsbowls.com/products" className="text-[#F26B21] font-bold text-lg py-2 border-b border-gray-50">
                        {t("nav.product_specs")}
                    </a>
                    <button
                        onClick={() => {
                            alert("Tokenomics Whitepaper coming soon.");
                            setIsOpen(false);
                        }}
                        className="text-left text-[#F26B21] font-bold text-lg py-2 border-b border-gray-50"
                    >
                        {t("nav.tokenomics")}
                    </button>
                    <Link
                        href={`/${currentLocale}/dashboard`}
                        onClick={() => setIsOpen(false)}
                        className="text-left text-[#F26B21] font-bold text-lg py-2 border-b border-gray-50"
                    >
                        {currentLocale === 'zh-TW' ? '登入 (儀表板)' : 'Login (Dashboard)'}
                    </Link>
                    <a href="/#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="bg-[#F26B21] text-white text-center font-bold text-lg py-3 rounded-xl shadow-md">
                        {t("nav.contact")}
                    </a>
                </div>
            )}
        </nav>
    );
}
