import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { ReactNode } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/layout/Footer";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bots & Bowls | AI-Powered Robotic Kitchen Ecosystem",
  description: "Revolutionizing the €600B Food Service Industry. 48 seconds from flour to feast. 24/7 autonomous operation with 64% profit margins.",
  keywords: ["AI Kitchen", "Robotic Noodle Bar", "Unmanned Restaurant", "Franchise Opportunity", "Food Tech", "Smart Catering"],
  openGraph: {
    title: "Invest in the Future of Dining: Bots & Bowls",
    description: "See how our AI robots prepare fresh meals in 48 seconds. Scalable, High-Margin, Automated.",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Bots & Bowls AI Kitchen",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bots & Bowls | AI-Powered Robotic Kitchen Ecosystem",
    description: "Revolutionizing the €600B Food Service Industry. 48 seconds from flour to feast.",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: "/images/logo.jpg", // Using brand logo as favicon
  },
};

const i18nNamespaces = ["hero", "roi", "products", "trust", "contact", "footer", "nav", "showroom"];

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-background text-foreground`}
      >
        <TranslationsProvider
          locale={locale}
          namespaces={i18nNamespaces}
          resources={resources}
        >
          <Navbar />
          {children}
          <Footer />
        </TranslationsProvider>
      </body>
    </html>
  );
}
