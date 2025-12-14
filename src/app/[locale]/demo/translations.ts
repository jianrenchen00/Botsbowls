
export const DEMO_TRANSLATIONS = {
    en: {
        nav: {
            overview: "Overview",
            telemetry: "Telemetry",
            inventory: "Inventory",
            food_safety: "Food Safety",
            financials: "Financials",
            owner: "Franchise Owner",
            system_controls: "System Controls",
        },
        metrics: {
            total_revenue: "Total Revenue",
            active_fleet: "Active Fleet",
            total_orders: "Total Orders",
            online: "Online",
            uptime: "Uptime",
            today: "Today",
            high_volume: "High Volume",
            unit_offline: "1 UNIT OFFLINE",
        },
        actions: {
            simulate_lunch: "Simulate Lunch Rush",
            rush_active: "Lunch Rush Active!",
            simulate_fault: "Simulate Fault",
            repair_system: "Repair System",
        },
        status: {
            live_system: "Live System",
            peak_traffic: "🔥 PEAK TRAFFIC DETECTED",
            critical_failure: "CRITICAL SYSTEM FAILURE",
            hourly_sales: "Hourly Sales Performance",
            live_alerts: "Live Alerts",
            real_time: "Real-time",
            command_center: "Command Center",
            system_alert: "SYSTEM ALERT",
        },
        construction: {
            title: "Module Coming Soon",
            desc: "This module is under development.",
        }
    },
    'zh-TW': {
        nav: {
            overview: "總覽",
            telemetry: "遙測數據",
            inventory: "庫存管理",
            food_safety: "食品安全",
            financials: "財務報表",
            owner: "加盟業主",
            system_controls: "系統控制",
        },
        metrics: {
            total_revenue: "總營收",
            active_fleet: "活躍機隊",
            total_orders: "總訂單数",
            online: "在線",
            uptime: "正常運行時間",
            today: "今日",
            high_volume: "高流量",
            unit_offline: "1 台設備離線",
        },
        actions: {
            simulate_lunch: "模擬午餐高峰",
            rush_active: "高峰期活躍中！",
            simulate_fault: "模擬故障",
            repair_system: "修復系統",
        },
        status: {
            live_system: "實時系統",
            peak_traffic: "🔥 檢測到高峰流量",
            critical_failure: "嚴重系統故障",
            hourly_sales: "每小時銷售表現",
            live_alerts: "實時警報",
            real_time: "實時",
            command_center: "指揮中心",
            system_alert: "系統警報",
        },
        construction: {
            title: "模組即將推出",
            desc: "此模組正在開發中。",
        }
    },
    fr: {
        nav: {
            overview: "Vue d'ensemble",
            telemetry: "Télémétrie",
            inventory: "Inventaire",
            food_safety: "Sécurité Alimentaire",
            financials: "Finances",
            owner: "Propriétaire",
            system_controls: "Contrôles Système",
        },
        metrics: {
            total_revenue: "Revenu Total",
            active_fleet: "Flotte Active",
            total_orders: "Commandes Totales",
            online: "En Ligne",
            uptime: "Disponibilité",
            today: "Aujourd'hui",
            high_volume: "Volume Élevé",
            unit_offline: "1 UNITÉ HORS LIGNE",
        },
        actions: {
            simulate_lunch: "Simuler Rush Midi",
            rush_active: "Rush Actif !",
            simulate_fault: "Simuler Panne",
            repair_system: "Réparer Système",
        },
        status: {
            live_system: "Système En Direct",
            peak_traffic: "🔥 PIC DE TRAFIC DÉTECTÉ",
            critical_failure: "ÉCHEC SYSTÈME CRITIQUE",
            hourly_sales: "Performance Ventes",
            live_alerts: "Alertes En Direct",
            real_time: "Temps Réel",
            command_center: "Centre de Commande",
            system_alert: "ALERTE SYSTÈME",
        },
        construction: {
            title: "Module Bientôt Disponible",
            desc: "Ce module est en cours de développement.",
        }
    },
    es: {
        nav: {
            overview: "Resumen",
            telemetry: "Telemetría",
            inventory: "Inventario",
            food_safety: "Seguridad Alimentaria",
            financials: "Finanzas",
            owner: "Propietario",
            system_controls: "Controles del Sistema",
        },
        metrics: {
            total_revenue: "Ingresos Totales",
            active_fleet: "Flota Activa",
            total_orders: "Pedidos Totales",
            online: "En Línea",
            uptime: "Tiempo Actividad",
            today: "Hoy",
            high_volume: "Alto Volumen",
            unit_offline: "1 UNIDAD FUERA DE LÍNEA",
        },
        actions: {
            simulate_lunch: "Simular Hora Pico",
            rush_active: "¡Hora Pico Activa!",
            simulate_fault: "Simular Fallo",
            repair_system: "Reparar Sistema",
        },
        status: {
            live_system: "Sistema En Vivo",
            peak_traffic: "🔥 TRÁFICO PICO DETECTADO",
            critical_failure: "FALLO CRÍTICO DEL SISTEMA",
            hourly_sales: "Rendimiento de Ventas",
            live_alerts: "Alertas En Vivo",
            real_time: "Tiempo Real",
            command_center: "Centro de Mando",
            system_alert: "ALERTA DEL SISTEMA",
        },
        construction: {
            title: "Módulo Próximamente",
            desc: "Este módulo está en desarrollo.",
        }
    }
};

export type DemoTranslationKey = keyof typeof DEMO_TRANSLATIONS;
