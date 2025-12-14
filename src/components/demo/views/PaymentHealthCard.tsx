import React from 'react';
import { CreditCard, Smartphone, CheckCircle2, AlertOctagon, Activity } from 'lucide-react';

interface PaymentHealthCardProps {
    t: any;
}

export function PaymentHealthCard({ t }: PaymentHealthCardProps) {
    return (
        <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-200 font-semibold flex items-center gap-2">
                    <Activity size={18} className="text-blue-400" />
                    {t.paymentHealth.title}
                </h3>
                <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full border border-slate-700">
                    Live
                </span>
            </div>

            <div className="space-y-4">
                {/* Credit Card - Healthy */}
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <CreditCard size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-slate-200">{t.paymentHealth.method_cc}</div>
                            <div className="text-xs text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 size={12} />
                                {t.paymentHealth.status_normal}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-white">99.8%</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t.paymentHealth.success_rate}</div>
                    </div>
                </div>

                {/* Apple Pay - Issue */}
                <div className="flex items-center justify-between p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                            <Smartphone size={20} className="text-red-400" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-slate-200">{t.paymentHealth.method_apple}</div>
                            <div className="text-xs text-red-400 flex items-center gap-1 animate-pulse">
                                <AlertOctagon size={12} />
                                {t.paymentHealth.status_abnormal}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-red-400">60%</div>
                        <div className="text-[10px] text-red-400/70 uppercase tracking-wider">{t.paymentHealth.fail_rate}</div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/50 text-center">
                <span className="text-xs text-red-400/80 font-mono">
                    ⚠ {t.paymentHealth.method_apple}: {t.paymentHealth.check_network}
                </span>
            </div>
        </div>
    );
}
