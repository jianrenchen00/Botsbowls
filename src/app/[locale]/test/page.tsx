'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

// 定義產品資料結構以確保型別安全
type ProductSpec = { label: string; value: string };
type ProductData = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[]; // 優勢特點
    specs: ProductSpec[];
    image: string; // 圖片路徑
};

type TranslationData = {
    pageTitle: string;
    navTitle: string;
    products: ProductData[];
    // UI 文字
    descriptionTitle: string;
    specsTitle: string;
    btnAnalyze: string;
    btnSuggest: string;
};

const TRANSLATIONS: Record<string, TranslationData> = {
    en: {
        pageTitle: "Product Manual 2025",
        navTitle: "Bots & Bowls Product Fleet",
        descriptionTitle: "Description",
        specsTitle: "Technical Specifications",
        btnAnalyze: "Analyze",
        btnSuggest: "Suggest",
        products: [
            {
                id: "vending-bar",
                title: "Smart Noodle Vending Bar (ZNSMJ-VII)",
                subtitle: "48 Seconds: The Perfect Balance of Convenience and Taste",
                image: "/images/page1-main-kiosk.jpg",
                description: "The Smart Noodle Vending Bar is a comprehensive solution for Chinese staple foods, integrating multiple advantages: high-tech, highly intelligent, and easy to deploy. Relying on intelligent noodle machines and a supporting IoT Big Data SaaS platform, this solution standardizes staple food catering. It requires no chefs and no kitchen, enabling 24-hour unmanned operation. It achieves the fastest production time of 48 seconds from raw flour to a bowl of beef noodles. It offers dozens of varieties including beef noodles and dry noodles, receiving high praise for taste and affordability.",
                features: [
                    "Multi-zone boiling technology with liquid level sensors to prevent burning or overflowing.",
                    "Smart self-adaptive management system for real-time monitoring and fault alarms via SaaS.",
                    "14 fault detection procedures ensuring every bowl is perfect.",
                    "Fully visible, unmanned process ensuring hygiene and zero secondary pollution.",
                    "Automated cleaning, disinfection, and sterilization controls."
                ],
                specs: [
                    { label: "Model", value: "ZNSMJ-VII" },
                    { label: "Preheat Time", value: "15 min" },
                    { label: "Capacity", value: "65-70 Bowls/Hour" },
                    { label: "Flour Capacity", value: "22 ± 0.5 kg" },
                    { label: "Power", value: "380V / 50Hz" },
                    { label: "Weight", value: "2600 kg" },
                    { label: "Dimensions", value: "4055 × 2460 × 2620 mm" },
                    { label: "Payment", value: "Visa, WeChat, Alipay" },
                    { label: "Capacity Features", value: "Toppings: 75 servings. Supports 3 soups, 2 sauces, 6 garnishes." }
                ]
            },
            {
                id: "integrated-machine",
                title: "Smart Integrated Noodle Machine (Future Noodle Shop)",
                subtitle: "Knead, Cut, Boil, Soup, Dispense - All in One",
                image: "/images/page2-machine.jpg",
                description: "This machine automates the entire sequence from raw flour to a finished bowl: kneading, sheeting, cutting, boiling, adding soup, and dispensing. It also supports rice noodle storage and cooking. Users simply scan a code for 'freshly made' noodles. The process is fully visible, combining scientific water-flour ratios with mechanical precision. After boiling and cooling, broth and garnishes are added automatically.",
                features: [
                    "Rapid Serving: Approx. 60 seconds continuous output.",
                    "Freshly Made: Flour turns into noodles instantly upon ordering.",
                    "Versatile: Supports both wheat noodles and rice noodles."
                ],
                specs: [
                    { label: "Footprint", value: "3 m²" },
                    { label: "Net Weight", value: "1300 kg" },
                    { label: "Flour Capacity", value: "20 + 0.5 kg" },
                    { label: "Powder Bin Capacity", value: "36 Blocks" },
                    { label: "Water Capacity", value: "100 L (Purified)" },
                    { label: "Empty Bowl Capacity", value: "≤ 100 Units" },
                    { label: "Brine Capacity", value: "9 L" },
                    { label: "Seasoning Packets", value: "75 Packs" },
                    { label: "Preheat Time", value: "15 min" },
                    { label: "Rated Voltage", value: "AC 380V" },
                    { label: "Rated Power", value: "≤ 12.5 kW" },
                    { label: "Max Efficiency", value: "60s / Portion" },
                    { label: "Dimensions", value: "2250 × 1200 × 2250 mm" }
                ]
            },
            {
                id: "beverage-machine",
                title: "Multi-Grain Beverage Machine",
                subtitle: "Freshly Ground, Nutritious & Healthy - 60s/Cup",
                image: "/images/page2-drink.jpg",
                description: "A perfect companion for the noodle shop. Freshly ground and brewed in seconds. Features intelligent temperature and quantity control. After scanning to pay, a steaming cup of soy milk or grain drink is ready in seconds. Flavors include Brown Rice Soy, Black Bean, Red Bean, Mung Bean, and Corn.",
                features: [
                    "24H Unmanned Self-Service.",
                    "Continuous production of up to 200 cups.",
                    "Automated grinding, brewing, and capping."
                ],
                specs: [
                    { label: "Dimensions", value: "2050(H) × 1100(W) × 800(D) mm" },
                    { label: "Weight", value: "470 kg" },
                    { label: "Voltage", value: "380V" },
                    { label: "Peak Power", value: "6 KW" },
                    { label: "Efficiency", value: "60 sec / Cup" },
                    { label: "Water Source", value: "Bottled Purified Water" }
                ]
            },
            {
                id: "robot-noodle",
                title: "Robotic Noodle Shop",
                subtitle: "The Future of Catering with Robotic Arms",
                image: "/images/page3-robot.jpg",
                description: "Features rapid meal production and a fully integrated internet payment system. The robotic arm mimics hand-made textures—Soft, Fragrant, Smooth, and Elastic. The entire process is visible, safe, and hygienic.",
                features: [
                    "Production: 1 Bowl / 1 Min (Continuous).",
                    "Texture: Mimics hand-rolled noodles, soft but chewy.",
                    "Smart Payment: WeChat/Alipay integration."
                ],
                specs: [
                    { label: "Model", value: "Robotic Noodle Shop" },
                    { label: "Power", value: "12.75 kW" },
                    { label: "Voltage", value: "380V" },
                    { label: "Weight", value: "600 kg" },
                    { label: "Dimensions", value: "2600 × 2150 × 1570 mm" },
                    { label: "Air Pressure", value: "0.4Mpa - 0.6Mpa" }
                ]
            }
        ]
    },
    "zh-TW": {
        pageTitle: "產品手冊 2025",
        navTitle: "Bots & Bowls 產品艦隊",
        descriptionTitle: "產品介紹",
        specsTitle: "技術規格",
        btnAnalyze: "分析",
        btnSuggest: "建議",
        products: [
            {
                id: "vending-bar",
                title: "智能自動售賣麵吧 (ZNSMJ-VII)",
                subtitle: "48秒麵粉到麵條、便捷與美味的最佳平衡",
                image: "/images/page1-main-kiosk.jpg",
                description: "智能自動售賣麵吧是凝聚多種優勢的中餐主食整體解決方案，具有科技含量高、智能化程度高、布點方便快捷的優點。整體解決方案依托智能熟麵機、智能機器人麵館等智能終端硬件設備和配套的物聯網大數據 SaaS 平台，將主食餐飲標準化。無需廚師、無需廚房，可無人值守 24 小時營業，實現最快 48 秒從麵粉做成一碗牛肉麵。出品有各類牛肉麵、各類拌麵等幾十種麵品，口味鮮美，好吃不貴。",
                features: [
                    "煮麵機構採用分段式多溫區煮粉/麵技術，液位傳感器杜絕糊鍋與溢鍋。",
                    "智能化自適應管理系統，實時監測設備，異常報警上傳大數據平台。",
                    "14 項故障檢測程序和應對方案，確保每一份出麵正常。",
                    "全自動無人化即視化完成，保證食材新鮮安全，無二次污染。",
                    "具備強制停機清理、定時消毒、定時滅菌等管控功能。"
                ],
                specs: [
                    { label: "產品型號", value: "ZNSMJ-VII型" },
                    { label: "啟動預熱", value: "15 min" },
                    { label: "主餐效率", value: "65-70 碗/小時" },
                    { label: "麵粉容量", value: "22 ± 0.5 kg" },
                    { label: "電源規格", value: "380V / 50Hz" },
                    { label: "整機重量", value: "2600 kg" },
                    { label: "外型尺寸", value: "4055 × 2460 × 2620 mm" },
                    { label: "支付方式", value: "Visa、微信、支付寶" },
                    { label: "容量特徵", value: "澆頭盒：75 份。支持 3 種湯底、3 種澆頭、2 種醬料和 6 種配菜。" }
                ]
            },
            {
                id: "integrated-machine",
                title: "智能粉麵一體機 (未來麵館)",
                subtitle: "和麵、壓片、切絲、煮麵、加湯、出料 - 一氣呵成",
                image: "/images/page2-machine.jpg",
                description: "可實現麵粉放入機器到和麵、壓片、切絲、煮麵、加湯、出料的系列動作；同時可實現粉絲儲存、輸送、煮製、加湯、出料。手機掃碼「現做現煮」，水與麵粉經科學配比，經機械物理工藝操作，形成定量的現製鮮麵條。全程消費者可見，安全衛生。",
                features: [
                    "快速出餐：從麵粉到煮熟裝碗，連續出餐間隔約 60 秒。",
                    "口味豐富：可挑選多種麵型與口味。",
                    "核心原理：機械物理工藝現場製麵，自動加注高湯與配菜。"
                ],
                specs: [
                    { label: "占地", value: "3 平米" },
                    { label: "整機重量", value: "1300 kg" },
                    { label: "麵粉容量", value: "20 + 0.5 kg" },
                    { label: "粉倉容量", value: "36 塊" },
                    { label: "淨水容量", value: "100 L" },
                    { label: "空碗數量", value: "≤ 100 個" },
                    { label: "鹽水容量", value: "9 L" },
                    { label: "鹵料包數量", value: "75 包" },
                    { label: "預熱時間", value: "15 min" },
                    { label: "額定電壓", value: "AC 380V" },
                    { label: "額定功率", value: "≤ 12.5 kW" },
                    { label: "最高效率", value: "60秒 / 份" },
                    { label: "外形尺寸", value: "2250 × 1200 × 2250 mm" }
                ]
            },
            {
                id: "beverage-machine",
                title: "五穀雜糧飲品機",
                subtitle: "現磨現製，營養健康，24H 無人自助",
                image: "/images/page2-drink.jpg",
                description: "可配套使用在未來麵館中。一杯只需 60 秒，可連續製作 200 杯。智能控溫、控量，手機掃碼支付後僅幾十秒就可製作出一杯熱氣騰騰的豆漿。口味多樣，包括糙米黃豆、原味黑豆沙、五穀雜糧糊、原味紅豆沙等。",
                features: [
                    "核心功能：智能自動落杯、落糖、配比原料、研磨、沖泡、封蓋。",
                    "多種口味：滿足各類人群不同營養需求。",
                    "水源：飲用桶裝純淨水。"
                ],
                specs: [
                    { label: "機器規格", value: "2050(高) × 1100(寬) × 800(厚) mm" },
                    { label: "整機重量", value: "470 kg" },
                    { label: "額定電壓", value: "380V" },
                    { label: "峰值功率", value: "6 KW" },
                    { label: "效率", value: "60 秒 / 杯" },
                    { label: "水源", value: "飲用桶裝純淨水" }
                ]
            },
            {
                id: "robot-noodle",
                title: "機器人麵館",
                subtitle: "快速出餐、互聯網支付系統",
                image: "/images/page3-robot.jpg",
                description: "採用機械手臂技術，模擬手擀麵口感。軟（軟而黏）、香（馥郁麵香）、滑（細膩爽滑）、彈（自然勁道）。全程可視，安全衛生，只需手機掃一掃即可自助操作。",
                features: [
                    "生產能力：1 碗麵 / 1 分鐘（連續做）。",
                    "主食保障：現點現做，全程可視。",
                    "智能互聯：支持微信/支付寶預定點餐與餐廳系統連接。"
                ],
                specs: [
                    { label: "產品型號", value: "機器人麵館" },
                    { label: "額定功率", value: "12.75 kW" },
                    { label: "額定電壓", value: "380V" },
                    { label: "整機重量", value: "600 kg" },
                    { label: "外型尺寸", value: "2600 × 2150 × 1570 mm" },
                    { label: "氣源氣壓", value: "0.4Mpa - 0.6Mpa" }
                ]
            }
        ]
    },
    fr: {
        pageTitle: "Manuel du Produit 2025",
        navTitle: "Flotte de Produits Bots & Bowls",
        descriptionTitle: "Description",
        specsTitle: "Technical Specifications",
        btnAnalyze: "Analyser",
        btnSuggest: "Suggérer",
        products: [
            {
                id: "vending-bar",
                title: "Smart Noodle Vending Bar (ZNSMJ-VII)",
                subtitle: "48 Secondes : L'équilibre parfait",
                image: "/images/page1-main-kiosk.jpg",
                description: "Le Smart Noodle Vending Bar est une solution complète. Il intègre de multiples avantages : haute technologie et intelligence. S'appuyant sur une plateforme IoT Big Data SaaS, il ne nécessite ni chef ni cuisine. Fonctionnement sans personnel 24h/24.",
                features: ["Technologie d'ébullition multizones.", "Surveillance intelligente SaaS.", "Processus entièrement visible et hygiénique."],
                specs: [{ label: "Modèle", value: "ZNSMJ-VII" }, { label: "Capacité", value: "65-70 Bol/H" }, { label: "Dimensions", value: "4055 × 2460 × 2620 mm" }]
            },
        ] as any
    },
    es: {
        pageTitle: "Manual del Producto 2025",
        navTitle: "Flota de Productos Bots & Bowls",
        descriptionTitle: "Description",
        specsTitle: "Technical Specifications",
        btnAnalyze: "Analizar",
        btnSuggest: "Sugerir",
        products: [] as any
    }
};

// 補全 FR 和 ES 的缺省值，避免 Array map 報錯
TRANSLATIONS.fr.products = TRANSLATIONS.en.products;
TRANSLATIONS.es.products = TRANSLATIONS.en.products;


export default function TestPage() {
    const params = useParams();
    const locale = (params?.locale as string) || 'en';
    const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-10">
            {/* Header */}
            <div className="w-full max-w-[900px] bg-slate-900 p-8 rounded-xl mb-8 shadow-lg text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-2">
                    {t.pageTitle}
                </h1>
                <p className="text-slate-400 text-lg">{t.navTitle}</p>
            </div>

            <div className={styles.container}>
                {/* 動態渲染所有產品 */}
                {t.products.map((product, index) => (
                    <div key={product.id} className={styles.page} style={{ marginBottom: '80px' }}>
                        <div className={styles.pageHeader}>
                            <span>{t.pageTitle}</span>
                            <span>0{index + 1} / {product.title.split(' ')[0]}</span>
                        </div>

                        {/* 產品圖片 */}
                        <div className={`${styles.productImageContainer} mb-6`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={product.image}
                                alt={product.title}
                                className={`${styles.productImage} ${product.id === 'beverage-machine' ? 'w-1/2 mx-auto' : 'w-full'} max-w-full h-auto object-contain block rounded-lg shadow-lg`}
                            />
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-orange-700 mb-2">{product.title}</h1>
                        <div className={styles.subtitle}>{product.subtitle}</div>

                        <div className={styles.highlightBox}>
                            <h3 className="font-bold mb-2">{t.descriptionTitle}</h3>
                            <p className="mb-4 text-sm md:text-base leading-relaxed">{product.description}</p>

                            {product.features && (
                                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <h2 className="mt-6 mb-4 text-xl font-bold border-b pb-2">{t.specsTitle}</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm md:text-base">
                                <tbody>
                                    {product.specs.map((spec, sIdx) => (
                                        <tr key={sIdx} className="border-b border-gray-200">
                                            <th className="py-2 pr-4 font-semibold text-gray-600 w-1/3 align-top">{spec.label}</th>
                                            <td className="py-2 text-gray-800 align-top">{spec.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
