"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Settings, LogOut, FileText, Shield, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const sidebarItems = [
    {
        title: "لوحة التحكم",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "المنتجات",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "الفئات",
        href: "/admin/categories",
        icon: FolderTree,
    },
    {
        title: "من نحن",
        href: "/admin/about",
        icon: FileText,
    },
    {
        title: "سياسة الخصوصية",
        href: "/admin/privacy",
        icon: Shield,
    },
    {
        title: "الشروط والأحكام",
        href: "/admin/terms",
        icon: ScrollText,
    },
    {
        title: "الإعدادات",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { signOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut();
            router.push("/admin/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="flex h-screen w-64 flex-col border-l bg-card text-card-foreground">
            <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-xl text-amber-600">Admin Panel</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-2 text-sm font-medium">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-amber-600",
                                    isActive
                                        ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50"
                                        : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    تسجيل الخروج
                </Button>
            </div>
        </div>
    );
}
