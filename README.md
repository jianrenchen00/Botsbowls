# Bots & Bowls - Official Global Landing Page

![Bots & Bowls](public/og-image.jpg)

**High-performance, localized marketing platform built for the future of automated dining.**

## 🚀 Project Overview

**Bots & Bowls** is the world's first AI-powered robotic kitchen ecosystem. This repository contains the source code for the official global landing page, designed to showcase the hardware fleet, demonstrate ROI potential, and attract franchise partners.

- **Status**: Production Ready (Web 2.0)
- **Version**: 1.0.0
- **Localization**: English (en), Traditional Chinese (zh-TW), Spanish (es)

## 🛠 Tech Stack & Architecture

This project utilizes a modern, edge-ready stack optimized for performance and SEO.

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Alpha/Beta)
  - *Design System*: Glassmorphism, Neon Accents, "Digital Gastronomy" aesthetic.
- **Localization**: 
  - `react-i18next` & `i18next` for translation management.
  - `next-i18n-router` for middleware-based locale routing.
  - **Translation Files**: Located in `src/locales/*.json`.
- **Animation**: [Framer Motion](https://www.framer.com/motion/) for complex UI transitions.

## 🏁 Getting Started

### Prerequisites

- **Node.js**: v20.11.0 (LTS) or higher.
- **Package Manager**: npm

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server on http://localhost:3000
npm run dev
```

### Production Build

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

## ⚙️ Key Configuration Notes

### SEO & Metadata
Global metadata (Title, Description, Open Graph) is managed in `src/app/[locale]/layout.tsx`. 
- **Dynamic Metadata**: Page-specific metadata can be found in individual `page.tsx` files.
- **i18n Configuration**: Routing logic is defined in `src/i18nConfig.ts`.

### Styling
Global styles and Tailwind v4 configuration are located in `src/app/globals.css`. The project uses CSS variables for theming (e.g., `--color-neon-blue`, `--color-neon-orange`).

## 🤝 For Web3 Integration Team (Yunshi Group)

**Attention**: This codebase is ready for Web3 integration. Please follow these guidelines to ensure UI consistency:

1.  **Wallet Connection**: 
    - The UI is built with Glassmorphism. When integrating **Wagmi** or **RainbowKit**, please customize the connect button styles to match our `GlassContainer` aesthetic (Backdrop blur, white borders).
    - Avoid using default unstyled buttons that break the immersion.

2.  **State Management**:
    - `TanStack Query` is already installed (implicitly via Web3 dependencies if added). Ensure your query clients do not conflict with existing hydration boundaries.

3.  **Localization**:
    - If adding new DApp features, please add new keys to `src/locales/*.json` under a new namespace (e.g., `"dapp": { ... }`) to keep marketing content separate.

---

**Copyright © 2025 Can Ramen 2024 SL. All Rights Reserved.**
