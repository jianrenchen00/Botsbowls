# Bots & Bowls - Robotic Dining Platform

## 🌍 Project Overview
Bots & Bowls is a Fintech-enabled robotic dining franchise concept. This project demonstrates a comprehensive **Next.js 14** web application featuring a high-conversion landing page and a complex **B2B Operations Dashboard**.

**Live Demo:** [https://botsbowls.com](https://botsbowls.com)

## 🚀 Key Features

### 1. Modern Tech Stack
-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript (Strict Mode)
-   **Styling:** Tailwind CSS + Framer Motion
-   **Internationalization (i18n):** Complete support for English, Traditional Chinese (zh-TW), Spanish (es), and French (fr).

### 2. B2B Operations Dashboard (`/dashboard`)
-   **Real-time Simulation:** A custom hook (`useSimulation`) mimics IoT telemetry data (motor load, temperature).
-   **Data Visualization:** Interactive charts for Revenue, Sales Mix, and Heatmaps.
-   **Financial Metrics:** Dynamic calculation of COGS, Margins, and ROI forecasts.

### 3. Serverless Backend Integration
-   **Contact Form:** Integrated with **Google Apps Script** to function as a serverless database.
-   **Automated Workflow:** Submissions are saved to Google Sheets and automatically trigger a PDF investment deck email to the user.

## 📂 Project Structure
-   `src/app/[locale]`: Dynamic routes for i18n.
-   `src/components/demo`: Dashboard components.
-   `src/hooks/useSimulation.ts`: The "Brain" behind the mock data.

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
