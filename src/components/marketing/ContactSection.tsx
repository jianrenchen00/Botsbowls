"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactSection() {
    const { t } = useTranslation();

    return (
        <section id="contact" className="py-20 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Global HQ Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans mb-2">
                                {t("contact.title")}
                            </h2>
                            <div className="h-1 w-20 bg-neon-orange rounded-full" />
                        </div>

                        <GlassContainer className="p-8 bg-white/5 border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <MapPin className="text-neon-blue" /> {t("contact.hq_title")}
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <p className="flex items-start gap-3">
                                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-neon-orange" />
                                    {t("contact.address")}
                                </p>
                                <p className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    {t("contact.phone")}
                                </p>
                                <p className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    {t("contact.email")}
                                </p>
                            </div>

                            {/* Placeholder Map Graphic */}
                            <div className="mt-8 h-40 w-full rounded-lg bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden relative">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale" />
                                <div className="relative z-10 h-3 w-3 bg-neon-blue rounded-full animate-ping" />
                                <div className="absolute z-10 h-3 w-3 bg-neon-blue rounded-full" />
                            </div>
                        </GlassContainer>
                    </div>

                    {/* Right Column: Smart Form */}
                    <div>
                        <GlassContainer className="p-8 sm:p-10 border-t-4 border-t-neon-orange">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">
                                            {t("contact.form.role_label")}
                                        </label>
                                        <select className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all appearance-none">
                                            <option>{t("contact.form.role_franchisee")}</option>
                                            <option>{t("contact.form.role_investor")}</option>
                                            <option>{t("contact.form.role_media")}</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">
                                            {t("contact.form.region_label")}
                                        </label>
                                        <select className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all appearance-none">
                                            <option>{t("contact.form.region_europe")}</option>
                                            <option>{t("contact.form.region_asia")}</option>
                                            <option>{t("contact.form.region_americas")}</option>
                                            <option>{t("contact.form.region_other")}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">
                                        {t("contact.form.name_label")}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">
                                        {t("contact.form.contact_label")}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-gradient-to-r from-neon-orange to-red-500 text-white font-bold py-4 rounded-lg hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all transform hover:scale-[1.02]"
                                >
                                    {t("contact.form.submit")}
                                </button>
                            </form>
                        </GlassContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}
