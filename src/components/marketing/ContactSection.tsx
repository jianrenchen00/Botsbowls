"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
import { useTranslation } from "react-i18next";
import { Globe, Phone, Mail } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        role: "End user (Individual)",
        region: "United States",
        name: "",
        email: ""
    });

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUXowHXgU_iZiPq0e4COdthg_N99MvW-lUwqWQvSGU1cmqVU_Vf8-_BSn5VRKOtpWmJw/exec';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // With no-cors, we can't check response.ok, so we assume success if no error is thrown.
            alert("Thank you! Your consultation request has been sent.");

            // Reset form
            setFormData({
                role: "End user (Individual)",
                region: "United States",
                name: "",
                email: ""
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error sending your request. Please try again.");
        }
    };

    return (
        <section id="contact" className="py-24 relative z-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Global HQ Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans mb-2">
                                {t("contact.title")}
                            </h2>
                            <div className="h-1 w-20 bg-[#F26B21] rounded-full" />
                        </div>

                        <div className="p-10 bg-white shadow-xl rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Globe className="text-[#F26B21]" /> {t("contact.hq_title")}
                            </h3>
                            <div className="grid gap-4 text-gray-600">
                                <div className="grid grid-cols-[24px_1fr] gap-4 items-center group">
                                    <div className="mt-1 flex justify-center">
                                        <span className="block h-1.5 w-1.5 rounded-full bg-[#F26B21] group-hover:scale-125 transition-transform" />
                                    </div>
                                    <a
                                        href="https://www.google.com/maps/place/Future+Noodles/@41.392277,2.155469,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a30051540ec7:0xf3b574c87ee40cbb!8m2!3d41.392273!4d2.1580439!16s%2Fg%2F11w2gr6ch2?authuser=0&entry=ttu&g_ep=EgoyMDI1MTIwNy4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[#F26B21] transition-colors underline underline-offset-4 decoration-orange-500/50"
                                    >
                                        Calle Provenza 209, 08008, Barcelona, Spain
                                    </a>
                                </div>
                                <div className="grid grid-cols-[24px_1fr] gap-4 items-center group">
                                    <div className="flex justify-center">
                                        <Phone className="h-5 w-5 text-[#F26B21]" />
                                    </div>
                                    <a href="tel:+34930388052" className="hover:text-[#F26B21] transition-colors">
                                        +34930388052
                                    </a>
                                </div>
                                <div className="grid grid-cols-[24px_1fr] gap-4 items-center group">
                                    <div className="flex justify-center">
                                        <Mail className="h-5 w-5 text-[#F26B21]" />
                                    </div>
                                    <a href="mailto:hello@botsandbowls.com" className="hover:text-[#F26B21] transition-colors">
                                        {t("contact.email")}
                                    </a>
                                </div>
                            </div>

                            {/* Placeholder Map Graphic */}
                            {/* Linked Map Graphic */}
                            <a
                                href="https://www.google.com/maps/place/Future+Noodles/@41.392277,2.155469,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a30051540ec7:0xf3b574c87ee40cbb!8m2!3d41.392273!4d2.1580439!16s%2Fg%2F11w2gr6ch2?authuser=0&entry=ttu&g_ep=EgoyMDI1MTIwNy4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 h-40 w-full rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden relative group cursor-pointer block hover:opacity-90 transition-opacity"
                            >
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="relative z-10 h-3 w-3 bg-[#F26B21] rounded-full animate-ping" />
                                <div className="absolute z-10 h-3 w-3 bg-[#F26B21] rounded-full" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Smart Form (High Contrast) */}
                    <div>
                        <div className="p-8 sm:p-10 bg-white shadow-2xl rounded-3xl border-t-4 border-t-neon-orange">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-black">
                                            {t("contact.form.role_label")}
                                        </label>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-neon-orange focus:ring-1 focus:ring-neon-orange transition-all appearance-none"
                                        >
                                            <option value="End user (Individual)">{t("contact.form.role_end_user")}</option>
                                            <option value="Business">{t("contact.form.role_business")}</option>
                                            <option value="Supply Chain">{t("contact.form.role_supply_chain")}</option>
                                            <option value="Others">{t("contact.form.role_others")}</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-black">
                                            {t("contact.form.region_label")}
                                        </label>
                                        <select
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-neon-orange focus:ring-1 focus:ring-neon-orange transition-all appearance-none"
                                        >
                                            <option value="United States">{t("contact.form.region_us")}</option>
                                            <option value="United Kingdom">{t("contact.form.region_uk")}</option>
                                            <option value="Germany">{t("contact.form.region_germany")}</option>
                                            <option value="France">{t("contact.form.region_france")}</option>
                                            <option value="Japan">{t("contact.form.region_japan")}</option>
                                            <option value="Singapore">{t("contact.form.region_singapore")}</option>
                                            <option value="Canada">{t("contact.form.region_canada")}</option>
                                            <option value="Australia">{t("contact.form.region_australia")}</option>
                                            <option value="Other">{t("contact.form.region_other")}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black">
                                        {t("contact.form.name_label")}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-neon-orange focus:ring-1 focus:ring-neon-orange transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black">
                                        {t("contact.form.email_label")}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-neon-orange focus:ring-1 focus:ring-neon-orange transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#F26B21] text-white font-bold py-4 rounded-lg hover:bg-orange-700 hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-95"
                                >
                                    {t("contact.form.submit")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
