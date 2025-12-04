import { cn } from "@/lib/utils"

interface SectionTitleProps {
    children: React.ReactNode;
    subtitle?: string;
    className?: string;
    centered?: boolean;
}

export function SectionTitle({ children, subtitle, className, centered = false }: SectionTitleProps) {
    return (
        <div className={cn("mb-8", centered && "text-center", className)}>
            <h2 className="text-3xl font-bold tracking-tight mb-2">{children}</h2>
            {subtitle && (
                <p className="text-[var(--muted-foreground)] text-lg">{subtitle}</p>
            )}
        </div>
    )
}
