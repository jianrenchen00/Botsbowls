import { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { ROICalculator } from '@/components/business/ROICalculator';
import { ProductShowcase } from '@/components/marketing/ProductShowcase';
import { TrustSection } from '@/components/marketing/TrustSection';
import { VideoGallery } from '@/components/home/VideoGallery';
import { ContactSection } from '@/components/marketing/ContactSection';

export const metadata: Metadata = {
  title: 'Bots & Bowls - Automated Dining Future',
  description: 'The World\'s First AI-Powered Robotic Kitchen Ecosystem.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <VideoGallery />
      <div id="roi">
        <ROICalculator />
      </div>
      <div id="products">
        <ProductShowcase />
      </div>
      <div id="trust">
        <TrustSection />
      </div>
      <ContactSection />
    </main>
  );
}
