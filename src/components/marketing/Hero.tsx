"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function Hero() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you! The investment deck will be sent to ${email}.`);
      setEmail("");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/noodlemanxbar.png"
          alt="Gourmet Ramen Bowl"
          className="h-full w-full object-cover opacity-80"
        />
        {/* Linear Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl w-full">

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start max-w-3xl"
          >


            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 font-sans drop-shadow-lg text-left">
              {t("hero.title_line1")} <br />
              <span className="text-neon-orange">
                {t("hero.title_line2")}
              </span>
            </h1>

            <p className="mt-2 text-xl sm:text-2xl text-gray-100 max-w-2xl mb-10 font-medium drop-shadow-md text-left">
              {t("hero.subtitle")}
            </p>

            {/* Email Capture Form */}
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8">
              <input
                type="email"
                placeholder={t("hero.email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-orange backdrop-blur-sm transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-[#F26B21] text-white font-bold text-lg hover:bg-[#d95305] hover:scale-105 transition-all whitespace-nowrap"
              >
                {t("hero.cta_primary")}
              </button>
            </form>

            <button
              onClick={() => handleScrollTo('video-gallery')}
              className="text-white/80 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium group"
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">{t("hero.cta_secondary")}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}

    </div>
  );
}
