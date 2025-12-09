"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";

export function Navbar() {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

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
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-xl border-black/5 shadow-sm"
                : "bg-transparent border-transparent backdrop-blur-none"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/">
                            <img src="/images/logo.jpg" alt="Bots & Bowls Logo" className="h-10 w-auto rounded-full cursor-pointer" />
                        </Link>
                        <Link href="/" className="text-xl font-bold text-foreground hidden sm:block">
                            Bots & Bowls
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#fleet" onClick={(e) => handleScrollTo(e, 'fleet')} className="text-gray-600 hover:text-neon-orange transition-colors text-sm font-medium">
                            {t("nav.fleet")}
                        </a>
                        <a href="#scenarios" onClick={(e) => handleScrollTo(e, 'scenarios')} className="text-gray-600 hover:text-neon-orange transition-colors text-sm font-medium">
                            {t("nav.scenarios")}
                        </a>
                        <a href="#solution" onClick={(e) => handleScrollTo(e, 'solution')} className="text-gray-600 hover:text-neon-orange transition-colors text-sm font-medium">
                            {t("nav.solution")}
                        </a>
                        <a href="#profit" onClick={(e) => handleScrollTo(e, 'profit')} className="text-gray-600 hover:text-neon-orange transition-colors text-sm font-medium">
                            {t("nav.profit")}
                        </a>
                        <a href="#trust" onClick={(e) => handleScrollTo(e, 'trust')} className="text-gray-600 hover:text-neon-orange transition-colors text-sm font-medium">
                            {t("nav.trust")}
                        </a>
                        <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="px-4 py-2 rounded-full bg-neon-orange text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg">
                            {t("nav.contact")}
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div>
                            <select
                                onChange={handleChange}
                                value={currentLocale}
                                className="bg-white/50 text-gray-800 border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-neon-orange"
                            >
                                <option value="en">English</option>
                                <option value="zh-TW">繁體中文</option>
                                <option value="es">Español</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
