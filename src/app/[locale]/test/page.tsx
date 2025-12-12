'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

// NOTE: You need to provide your API Key here for the AI features to work.
const API_KEY = "AIzaSyB4cpXNAIik1GGG1fvFEuuAlwalb28cSWU"; // TODO: Paste your key starting with 'AIza...' here

const TRANSLATIONS = {
    en: {
        title: "Product Manual 2025",
        overview: "01 / Overview",
        equipment: "02 / Equipment",
        robotics: "03 / Robotics",
        aiRoiHeader: "Smart ROI Assistant",
        aiMoodHeader: "Noodle Mood Matcher",
        aiPrompt: "Ask about this product...",
        btnAnalyze: "Analyze",
        btnSuggest: "Suggest",
        overviewTitle: "Product Overview",
        overviewText: "The Smart Noodle Vending Bar is a comprehensive solution for Chinese staple foods, integrating multiple advantages. It features high technological content, a high degree of intelligence, and offers convenient deployment. Relying on intelligent noodle machines and a supporting IoT Big Data SaaS platform, this solution standardizes staple food catering. It requires no chefs and no kitchen, enabling 24-hour unmanned operation. It achieves the fastest production time of 48 seconds from raw flour to a bowl of beef noodles.",
        specsTitle: "Specifications",
        specsList: [
            { label: "Product Model", value: "ZNSMJ-VII" },
            { label: "Preheating Time", value: "15 min" },
            { label: "Serving Capacity", value: "65-70 Bowls/Hour" },
            { label: "Flour Capacity", value: "22 ± 0.5 kg" },
            { label: "Dimensions", value: "4055 × 2460 × 2620 mm" },
            { label: "Capacity Features", value: "Topping boxes: 75 servings. Supports 3 soup flavors, 3 topping types, 2 sauces, and 6 garnishes." }
        ]
    },
    "zh-TW": {
        title: "產品手冊 2025",
        overview: "01 / 產品概覽",
        equipment: "02 / 設備介紹",
        robotics: "03 / 機器人技術",
        aiRoiHeader: "智慧 ROI 分析助手",
        aiMoodHeader: "麵食心情搭配",
        aiPrompt: "請問關於此產品...",
        btnAnalyze: "分析",
        btnSuggest: "建議",
        overviewTitle: "產品概述",
        overviewText: "智能煮麵販賣機是中式主食的綜合解決方案，集多種優勢於一身。具有高科技含量、高度智能化，且部署方便。依託智能麵機及配套的 IoT 大數據 SaaS 平台，實現主食餐飲標準化。無須廚師、無須廚房，實現 24 小時無人化運營。從麵粉到一碗牛肉麵，最快僅需 48 秒。",
        specsTitle: "產品規格",
        specsList: [
            { label: "產品型號", value: "ZNSMJ-VII" },
            { label: "預熱時間", value: "15 分鐘" },
            { label: "出餐能力", value: "65-70 碗/小時" },
            { label: "麵粉容量", value: "22 ± 0.5 kg" },
            { label: "設備尺寸", value: "4055 × 2460 × 2620 mm" },
            { label: "容量特徵", value: "澆頭盒：75 份。支持 3 種湯底、3 種澆頭、2 種醬料和 6 種配菜。" }
        ]
    },
    fr: {
        title: "Manuel du Produit 2025",
        overview: "01 / Aperçu",
        equipment: "02 / Équipement",
        robotics: "03 / Robotique",
        aiRoiHeader: "Assistant ROI Intelligent",
        aiMoodHeader: "Suggérer des Nouilles",
        aiPrompt: "Demandez sur ce produit...",
        btnAnalyze: "Analyser",
        btnSuggest: "Suggérer",
        overviewTitle: "Aperçu du Produit",
        overviewText: "Le Smart Noodle Vending Bar est une solution complète pour les aliments de base chinois. Il se caractérise par un contenu technologique élevé et une grande intelligence. S'appuyant sur des machines à nouilles intelligentes et une plateforme IoT Big Data SaaS, cette solution standardise la restauration. Elle ne nécessite ni chef ni cuisine, permettant un fonctionnement sans personnel 24h/24. Il atteint le temps de production le plus rapide de 48 secondes, de la farine crue à un bol de nouilles au bœuf.",
        specsTitle: "Spécifications",
        specsList: [
            { label: "Modèle", value: "ZNSMJ-VII" },
            { label: "Préchauffage", value: "15 min" },
            { label: "Capacité", value: "65-70 Bols/Heure" },
            { label: "Capacité Farine", value: "22 ± 0.5 kg" },
            { label: "Dimensions", value: "4055 × 2460 × 2620 mm" },
            { label: "Caractéristiques", value: "Garnitures : 75 portions. Supporte 3 soupes, 3 garnitures, 2 sauces." }
        ]
    },
    es: {
        title: "Manual del Producto 2025",
        overview: "01 / Resumen",
        equipment: "02 / Equipo",
        robotics: "03 / Robótica",
        aiRoiHeader: "Asistente ROI Inteligente",
        aiMoodHeader: "Combinador de Fideos",
        aiPrompt: "Pregunte sobre este producto...",
        btnAnalyze: "Analizar",
        btnSuggest: "Sugerir",
        overviewTitle: "Descripción del Producto",
        overviewText: "La Barra Expendedora de Fideos Inteligente es una solución integral. Se caracteriza por un alto contenido tecnológico y gran inteligencia. Apoyándose en máquinas de fideos inteligentes y una plataforma IoT Big Data SaaS, esta solución estandariza la restauración. No requiere chefs ni cocina, permitiendo una operación no tripulada las 24 horas. Logra el tiempo de producción más rápido de 48 segundos.",
        specsTitle: "Especificaciones",
        specsList: [
            { label: "Modelo", value: "ZNSMJ-VII" },
            { label: "Precalentamiento", value: "15 min" },
            { label: "Capacidad", value: "65-70 Tazones/Hora" },
            { label: "Capacidad Harina", value: "22 ± 0.5 kg" },
            { label: "Dimensiones", value: "4055 × 2460 × 2620 mm" },
            { label: "Características", value: "Coberturas: 75 porciones. Soporta 3 sopas, 3 coberturas, 2 salsas." }
        ]
    }
};

export default function TestPage() {
    const params = useParams();
    const locale = (params?.locale as string) || 'en';
    const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

    // Check for API Key on mount
    useEffect(() => {
        if (!API_KEY) {
            console.error("API KEY MISSING: Please add your Gemini API Key to src/app/[locale]/test/page.tsx");
        }
    }, []);




    // Helper to call Gemini API via REST to avoid dependencies
    const callGemini = async (prompt: string) => {
        if (!API_KEY || API_KEY.includes("TODO")) {
            alert("API Key is missing or invalid.");
            throw new Error("API Key is missing.");
        }

        // 修改這裡：加上 "-001" 版本號
        const model = "gemini-1.5-flash-001"; // 改成這個，支援 v1beta/v1

        // 確保網址是 v1（從 v1beta 改為 v1，更穩定）
        const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`;

        const fullPrompt = `${prompt} Answer in ${locale} language. Keep it short.`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: fullPrompt }] }]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Gemini API Error Details:", data);
                // 這裡會把錯誤印得更清楚
                throw new Error(data.error?.message || `API Error: ${response.status}`);
            }

            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return text;

            throw new Error("No content generated.");

        } catch (error: any) {
            console.error("Call Gemini Failed:", error);
            throw new Error(error.message || "Failed to fetch response");
        }
    };





    // Helper to render formatting (bolding)
    const renderFormatted = (text: string | null) => {
        if (!text) return null;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-10">

            {/* Hero Header for Title to satisfy text-white requirement */}
            <div className="w-full max-w-[900px] bg-slate-900 p-8 rounded-xl mb-8 shadow-lg text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                    {t.title}
                </h1>
                <p className="text-slate-400 text-lg">
                    Bots & Bowls Intelligent Catering Solutions
                </p>
            </div>

            <div className={styles.container}>

                {/* PAGE 1 */}
                <div className={styles.page}>
                    <div className={styles.pageHeader}>
                        <span>{t.title}</span>
                        <span>{t.overview}</span>
                    </div>

                    {/* // TODO: User, please ensure your images are in 'public/images/' and update the <img src="..."> tags below. */}

                    <div className={styles.productImageContainer}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/page1-main-kiosk.jpg" alt="Bots & Bowls Storefront" className={`${styles.productImage} w-full max-w-full h-auto object-contain block rounded-lg shadow-lg`} />
                    </div>

                    <h1 className="text-3xl font-bold text-orange-700 mb-2">Bots & Bowls: Smart Noodle Vending Bar</h1>
                    <div className={styles.subtitle}>From Flour to Noodles in 48 Seconds – The Perfect Balance of Convenience and Taste</div>

                    <div className={styles.highlightBox}>
                        <h3 className="font-bold mb-2">{t.overviewTitle}</h3>
                        <p className="mb-2">{t.overviewText}</p>
                    </div>

                    <h2>{t.specsTitle}</h2>
                    <table>
                        <tbody>
                            {t.specsList.map((spec, index) => (
                                <tr key={index}>
                                    <th>{spec.label}</th>
                                    <td>{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>

                {/* PAGE 2 */}
                <div className={styles.page}>
                    <div className={styles.pageHeader}>
                        <span>{t.title}</span>
                        <span>{t.equipment}</span>
                    </div>

                    <div className={styles.grid2}>
                        {/* Product 1 */}
                        <div>
                            {/* Removed inline height style */}
                            <div className={styles.productImageContainer}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/page2-machine.jpg" alt="Smart Noodle Machine" className={`${styles.productImage} w-full max-w-full h-auto object-contain block rounded-lg shadow-lg`} />
                            </div>

                            <h1 className="text-2xl font-bold mb-2">Smart Integrated Noodle Machine</h1>
                            <p><strong>Unmanned Noodle Shop: No Chef, No Kitchen. 60 seconds ready!</strong></p>

                            <h3>Core Functions</h3>
                            <p>Performs a complete sequence: kneading, sheeting, cutting, boiling, adding soup, and dispensing. Approx 60 seconds per bowl.</p>


                        </div>

                        {/* Product 2 */}
                        <div>
                            {/* Removed inline height style */}
                            <div className={styles.productImageContainer}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/page2-drink.jpg" alt="Beverage Machine" className={`${styles.productImage} w-full max-w-full h-auto object-contain block rounded-lg shadow-lg`} />
                            </div>

                            <h1 className="text-2xl font-bold mb-2">Multi-Grain Beverage Machine</h1>
                            <p><strong>Freshly Ground, Nutritious & Healthy. 24h Self-Service.</strong></p>

                            <h3>Core Functions</h3>
                            <p>Intelligent temperature control. A steaming cup of soy milk (Brown Rice, Black Bean, etc.) ready in seconds.</p>

                            <h3>Specs</h3>
                            <ul>
                                <li><strong>Size:</strong> 2050(H) × 1100(W) × 800(D) mm</li>
                                <li><strong>Efficiency:</strong> 60 sec/cup</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* PAGE 3 */}
                <div className={styles.page}>
                    <div className={styles.pageHeader}>
                        <span>{t.title}</span>
                        <span>{t.robotics}</span>
                    </div>

                    <div className={styles.productImageContainer}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/page3-robot.jpg" alt="Robotic Arm Machine" className={`${styles.productImage} w-full max-w-full h-auto object-contain block rounded-lg shadow-lg`} />
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Robotic Noodle Shop</h1>
                    <div className={styles.subtitle}>Fast Service & Internet Payment System</div>

                    <div className={styles.grid2}>
                        <div>
                            <h3>Main Features</h3>
                            <ul>
                                <li><strong>Rapid Production:</strong> ~60 seconds continuous output.</li>
                                <li><strong>Hygiene:</strong> Fully visible, no human contact.</li>
                                <li><strong>Payment:</strong> WeChat/Alipay integration.</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Technical Parameters</h3>
                            <table>
                                <tbody>
                                    <tr><th>Capacity</th><td>1 Bowl / 1 Min</td></tr>
                                    <tr><th>Power</th><td>12.75 kW</td></tr>
                                    <tr><th>Weight</th><td>600 kg</td></tr>
                                    <tr><th>Size</th><td>2600 × 2150 × 1570 mm</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
