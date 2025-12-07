"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image - High Quality Food First */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Gourmet Ramen Bowl"
          className="h-full w-full object-cover opacity-80"
        />
        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl w-full text-center">

          {/* Main Content - Clean & Bold */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-8 font-sans drop-shadow-lg">
              {t("hero.title_line1")} <br />
              <span className="text-neon-orange">
                {t("hero.title_line2")}
              </span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl text-gray-100 max-w-2xl mb-12 font-medium drop-shadow-md">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => handleScrollTo('contact')}
                className="px-10 py-5 rounded-full bg-neon-orange text-white font-bold text-xl hover:bg-orange-600 hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] transition-all transform hover:scale-105"
              >
                {t("hero.cta_primary")}
              </button>
              <button
                onClick={() => handleScrollTo('video-gallery')}
                className="px-10 py-5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xl hover:bg-white/20 transition-all"
              >
                {t("hero.cta_secondary")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
