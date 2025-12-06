import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassContainerProps {
    children: ReactNode;
    className?: string;
}

export function GlassContainer({ children, className }: GlassContainerProps) {
    return (
        <div
            className={cn(
                "glass rounded-2xl p-6 border border-white/10 shadow-lg",
                className
            )}
        >
            {children}
        </div>
    );
}
