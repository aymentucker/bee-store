import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbItem {
    href: string;
    label: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-6">
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center gap-2">
                    {index > 0 && <ChevronLeft className="h-4 w-4 rotate-180" />}
                    {index === items.length - 1 ? (
                        <span className="text-[var(--foreground)] font-medium">{item.label}</span>
                    ) : (
                        <Link href={item.href} className="hover:text-[var(--foreground)] transition-colors">
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
