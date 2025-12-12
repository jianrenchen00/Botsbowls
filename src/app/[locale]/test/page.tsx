'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

// NOTE: You need to provide your API Key here for the AI features to work.
const API_KEY = "AIzaSyDr5FPjo_Ake89PFkhnb7lUh76zQ2mlsk8"; // Replace with your actual Gemini API Key

export default function TestPage() {
    // State for ROI Calculator
    const [location, setLocation] = useState('');
    const [traffic, setTraffic] = useState('');
    const [roiResult, setRoiResult] = useState<string | null>(null);
    const [roiLoading, setRoiLoading] = useState(false);

    // State for Mood Matcher
    const [mood, setMood] = useState('');
    const [moodResult, setMoodResult] = useState<string | null>(null);
    const [moodLoading, setMoodLoading] = useState(false);

    // Helper to call Gemini API via REST to avoid dependencies
    const callGemini = async (prompt: string) => {
        if (!API_KEY) {
            throw new Error("API Key is missing. Please add it to the code.");
        }

        // Using gemini-1.5-flash as a reliable default. 
        // You can change 'gemini-1.5-flash' to the model you prefer if available.
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || "API Error");
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    };

    const handleAnalyzeROI = async () => {
        if (!location || !traffic) {
            alert("Please fill in both fields.");
            return;
        }

        setRoiLoading(true);
        setRoiResult("Thinking...");

        try {
            const prompt = `Business analysis for Bots & Bowls machine (ZNSMJ-VII, 65 bowls/hr) at "${location}" with traffic "${traffic}". Short verdict on profit potential (High/Med/Low) and why. Max 50 words.`;
            const text = await callGemini(prompt);
            setRoiResult(text);
        } catch (error: any) {
            setRoiResult(`Error: ${error.message}`);
        } finally {
            setRoiLoading(false);
        }
    };

    const handleRecommendNoodle = async () => {
        if (!mood) {
            alert("Please enter a mood.");
            return;
        }

        setMoodLoading(true);
        setMoodResult("Cooking up an idea...");

        try {
            const prompt = `Recommend a noodle dish (Beef, Spicy, Tomato, etc.) for someone feeling "${mood}". Short, fun reason. Add emoji.`;
            const text = await callGemini(prompt);
            setMoodResult(text);
        } catch (error: any) {
            setMoodResult(`Error: ${error.message}`);
        } finally {
            setMoodLoading(false);
        }
    };

    // Helper to render formatting (bolding)
    const renderFormatted = (text: string | null) => {
        if (!text) return null;
        // Simple bold replacement for **text**
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 flex justify-center py-10">
            <div className={styles.container}>

                {/* PAGE 1 */}
                <div className={styles.page}>
                    <div className={styles.pageHeader}>
                        <span>Product Manual 2025</span>
                        <span>01 / Overview</span>
                    </div>

                    <div className={styles.productImageContainer}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://placehold.co/800x400/e65100/ffffff?text=Replace+with:+page1-main-kiosk.jpg" alt="Bots & Bowls Storefront" className={styles.productImage} />
                    </div>

                    <h1 className="text-3xl font-bold text-orange-700 mb-2">Bots & Bowls: Smart Noodle Vending Bar</h1>
                    <div className={styles.subtitle}>From Flour to Noodles in 48 Seconds – The Perfect Balance of Convenience and Taste</div>

                    <div className={styles.highlightBox}>
                        <h3 className="font-bold mb-2">Product Overview</h3>
                        <p className="mb-2">The Smart Noodle Vending Bar is a comprehensive solution for Chinese staple foods, integrating multiple advantages. It features high technological content, a high degree of intelligence, and offers convenient deployment.</p>
                        <p>Relying on intelligent noodle machines and a supporting IoT Big Data SaaS platform, this solution standardizes staple food catering. It requires no chefs and no kitchen, enabling 24-hour unmanned operation. It achieves the fastest production time of 48 seconds from raw flour to a bowl of beef noodles.</p>
                    </div>

                    <h2>Main Technical Specifications</h2>
                    <table>
                        <tbody>
                            <tr><th>Product Model</th><td>ZNSMJ-VII</td></tr>
                            <tr><th>Preheating Time</th><td>15 min</td></tr>
                            <tr><th>Serving Capacity</th><td>65-70 Bowls/Hour</td></tr>
                            <tr><th>Flour Capacity</th><td>22 ± 0.5 kg</td></tr>
                            <tr><th>Dimensions</th><td>4055 × 2460 × 2620 mm</td></tr>
                            <tr><th>Capacity Features</th><td>Topping boxes: 75 servings. Supports 3 soup flavors, 3 topping types, 2 sauces, and 6 garnishes.</td></tr>
                        </tbody>
                    </table>

                    {/* ✨ AI FEATURE 1 */}
                    <div className={styles.aiSection}>
                        <div className={styles.aiHeader}>
                            <span style={{ fontSize: '1.5rem' }}>✨</span>
                            <h3 style={{ margin: 0 }}>Smart ROI Assistant (AI Analysis)</h3>
                        </div>
                        <p style={{ marginBottom: '15px', color: '#666' }}>Enter a location to analyze profitability potential.</p>

                        <div className={styles.aiInputGroup}>
                            <input
                                type="text"
                                className={styles.aiInput}
                                placeholder="Location (e.g., Train Station)"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <input
                                type="text"
                                className={styles.aiInput}
                                placeholder="Daily Foot Traffic (e.g., 5000)"
                                value={traffic}
                                onChange={(e) => setTraffic(e.target.value)}
                            />
                            <button
                                className={styles.aiBtn}
                                onClick={handleAnalyzeROI}
                                disabled={roiLoading}
                            >
                                {roiLoading ? (
                                    <span className={styles.loadingSpinner}></span>
                                ) : (
                                    <span className="btn-text">Analyze</span>
                                )}
                            </button>
                        </div>
                        {roiResult && (
                            <div className={styles.aiResult}>
                                {renderFormatted(roiResult)}
                            </div>
                        )}
                    </div>
                </div>

                {/* PAGE 2 */}
                <div className={styles.page}>
                    <div className={styles.pageHeader}>
                        <span>Product Manual 2025</span>
                        <span>02 / Equipment</span>
                    </div>

                    <div className={styles.grid2}>
                        {/* Product 1 */}
                        <div>
                            <div className={styles.productImageContainer} style={{ height: '220px' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://placehold.co/600x400/2196f3/ffffff?text=Replace+with:+page2-machine.jpg" alt="Smart Noodle Machine" className={styles.productImage} />
                            </div>

                            <h1 className="text-2xl font-bold mb-2">Smart Integrated Noodle Machine</h1>
                            <p><strong>Unmanned Noodle Shop: No Chef, No Kitchen. 60 seconds ready!</strong></p>

                            <h3>Core Functions</h3>
                            <p>Performs a complete sequence: kneading, sheeting, cutting, boiling, adding soup, and dispensing. Approx 60 seconds per bowl.</p>

                            {/* ✨ AI FEATURE 2 */}
                            <div className={styles.aiSection} style={{ marginTop: '20px', padding: '15px', background: '#fffde7', borderColor: '#ffe082' }}>
                                <div className={styles.aiHeader} style={{ marginBottom: '10px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>🍜</span>
                                    <h4 style={{ margin: 0, color: '#f57f17' }}>Noodle Mood Matcher</h4>
                                </div>
                                <div className={styles.aiInputGroup}>
                                    <input
                                        type="text"
                                        className={styles.aiInput}
                                        placeholder="How do you feel? (e.g., Tired)"
                                        value={mood}
                                        onChange={(e) => setMood(e.target.value)}
                                    />
                                    <button
                                        className={styles.aiBtn}
                                        style={{ backgroundColor: '#fbc02d', color: '#333' }}
                                        onClick={handleRecommendNoodle}
                                        disabled={moodLoading}
                                    >
                                        {moodLoading ? (
                                            <span className={styles.loadingSpinner} style={{ borderTopColor: '#333' }}></span>
                                        ) : (
                                            <span className="btn-text">Suggest</span>
                                        )}
                                    </button>
                                </div>
                                {moodResult && (
                                    <div className={styles.aiResult} style={{ background: 'white', display: 'block' }}>
                                        {renderFormatted(moodResult)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div>
                            <div className={styles.productImageContainer} style={{ height: '220px' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://placehold.co/600x400/8bc34a/ffffff?text=Replace+with:+page2-drink.jpg" alt="Beverage Machine" className={styles.productImage} />
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
                        <span>Product Manual 2025</span>
                        <span>03 / Robotics</span>
                    </div>

                    <div className={styles.productImageContainer}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://placehold.co/800x400/607d8b/ffffff?text=Replace+with:+page3-robot.jpg" alt="Robotic Arm Machine" className={styles.productImage} />
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
