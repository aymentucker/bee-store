"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, TrendingUp, Eye } from "lucide-react";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        views: 0,
        loading: true,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [productsSnap, categoriesSnap, analyticsSnap] = await Promise.all([
                    getDocs(collection(db, "products")),
                    getDocs(collection(db, "categories")),
                    getDoc(doc(db, "analytics", "stats")),
                ]);

                const analyticsData = analyticsSnap.exists() ? analyticsSnap.data() : { totalViews: 0 };

                setStats({
                    products: productsSnap.size,
                    categories: categoriesSnap.size,
                    views: analyticsData.totalViews || 0,
                    loading: false,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "إجمالي المنتجات",
            value: stats.products,
            icon: Package,
            color: "text-blue-600",
            bgColor: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            title: "إجمالي الفئات",
            value: stats.categories,
            icon: FolderTree,
            color: "text-green-600",
            bgColor: "bg-green-100 dark:bg-green-900/30",
        },
        {
            title: "معدل النمو",
            value: "+12%",
            icon: TrendingUp,
            color: "text-amber-600",
            bgColor: "bg-amber-100 dark:bg-amber-900/30",
        },
        {
            title: "المشاهدات",
            value: stats.views,
            icon: Eye,
            color: "text-purple-600",
            bgColor: "bg-purple-100 dark:bg-purple-900/30",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
                <p className="text-muted-foreground">
                    نظرة عامة على إحصائيات المتجر
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.loading ? "..." : stat.value}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>نشاط حديث</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">تم إضافة منتج جديد</p>
                                    <p className="text-xs text-muted-foreground">منذ ساعتين</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">تحديث الإعدادات</p>
                                    <p className="text-xs text-muted-foreground">منذ 5 ساعات</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-amber-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">تعديل فئة</p>
                                    <p className="text-xs text-muted-foreground">منذ يوم</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>روابط سريعة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <a
                                href="/admin/products"
                                className="block p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                                <p className="font-medium">إدارة المنتجات</p>
                                <p className="text-xs text-muted-foreground">
                                    إضافة وتعديل المنتجات
                                </p>
                            </a>
                            <a
                                href="/admin/categories"
                                className="block p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                                <p className="font-medium">إدارة الفئات</p>
                                <p className="text-xs text-muted-foreground">
                                    تنظيم الفئات
                                </p>
                            </a>
                            <a
                                href="/admin/settings"
                                className="block p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                                <p className="font-medium">الإعدادات</p>
                                <p className="text-xs text-muted-foreground">
                                    تخصيص الموقع
                                </p>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
