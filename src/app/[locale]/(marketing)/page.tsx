"use client";

import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { ScenariosSection } from "@/components/marketing/ScenariosSection";
import { VideoGallery } from "@/components/home/VideoGallery";
import { TrustSection } from "@/components/marketing/TrustSection";
import { ROICalculator } from "@/components/business/ROICalculator";
import { ContactSection } from "@/components/marketing/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ProductShowcase />
      <ScenariosSection />
      <VideoGallery />
      <TrustSection />
      <div id="roi">
        <ROICalculator />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
