"use client";

import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { AIRoboticSolutions } from "@/components/marketing/AIRoboticSolutions";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { ScenariosSection } from "@/components/marketing/ScenariosSection";
import { TrustSection } from "@/components/marketing/TrustSection";
import { ROICalculator } from "@/components/business/ROICalculator";
import { ContactSection } from "@/components/marketing/ContactSection";
import { VideoShowcase } from "@/components/marketing/VideoShowcase";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <ProblemSection />

      <div id="fleet">
        <ProductShowcase />
      </div>
      <div id="scenarios">
        <ScenariosSection />
      </div>
      <div id="solution">
        <SolutionSection />
      </div>
      <div id="profit">
        <ROICalculator />
      </div>
      <div id="trust">
        <TrustSection />
      </div>
      <VideoShowcase />
      <AIRoboticSolutions />
      <div id="contact">
        <ContactSection />
      </div>
      <FloatingCTA />
    </main>
  );
}
