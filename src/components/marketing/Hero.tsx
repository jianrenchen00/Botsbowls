"use client";

import { GlassContainer } from "@/components/ui/GlassContainer";
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
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Futuristic Technology"
          className="h-full w-full object-cover opacity-90"
        />
        {/* Gradient Overlay (Light Mode) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-background" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center rounded-full border border-neon-orange/30 bg-neon-orange/10 px-3 py-1 text-sm font-medium text-neon-orange backdrop-blur-md mb-6">
              <span className="flex h-2 w-2 rounded-full bg-neon-orange mr-2 animate-pulse"></span>
              {t("hero.badge")}
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-6 font-sans">
              {t("hero.title_line1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-red-500">
                {t("hero.title_line2")}
              </span>
            </h1>
            
            <p className="mt-4 text-xl text-gray-600 max-w-lg mb-10 font-light">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handleScrollTo('contact')}
                className="px-8 py-4 rounded-full bg-neon-orange text-white font-bold text-lg hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all transform hover:scale-105"
              >
                {t("hero.cta_primary")}
              </button>
              <button 
                onClick={() => handleScrollTo('video-gallery')}
                className="px-8 py-4 rounded-full glass text-foreground font-bold text-lg hover:bg-white/80 transition-all border border-black/10"
              >
                 {t("hero.cta_secondary")}
              </button>
            </div>
          </motion.div>

          {/* Hero Visual / Data */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="hidden lg:block relative"
          >
             {/* Floating Elements */}
             <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 z-20"
             >
                <GlassContainer className="p-6 bg-white/80 border-black/5">
                    <div className="text-4xl font-mono font-bold text-neon-orange">48s</div>
                    <div className="text-sm text-gray-500">{t("hero.stat_speed")}</div>
                </GlassContainer>
             </motion.div>

             <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -left-10 z-20"
             >
                <GlassContainer className="p-6 bg-white/80 border-black/5">
                    <div className="text-4xl font-mono font-bold text-neon-blue">64%</div>
                    <div className="text-sm text-gray-500">{t("hero.stat_margin")}</div>
                </GlassContainer>
             </motion.div>
             
             {/* Main Hero Graphic Placeholder (Abstract 3D) */}
             <div className="w-full h-[500px] rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/noodle-machine.png')] bg-contain bg-center bg-no-repeat opacity-90" />
             </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
