"use client";

import { useSettings } from "@/lib/settings-context";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    const { siteName, aboutUs } = useSettings();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">من نحن</h1>
                    <p className="text-lg text-muted-foreground">
                        تعرف على {siteName || "متجرنا"}
                    </p>
                </div>

                <Card>
                    <CardContent className="p-8">
                        {aboutUs ? (
                            <div className="prose prose-lg max-w-none dark:prose-invert">
                                {aboutUs.split('\n').map((paragraph, index) => (
                                    paragraph.trim() && (
                                        <p key={index} className="mb-4 leading-relaxed text-foreground">
                                            {paragraph}
                                        </p>
                                    )
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <p className="text-lg mb-2">لم يتم إضافة محتوى "من نحن" بعد.</p>
                                <p className="text-sm">يرجى إضافة المحتوى من لوحة التحكم → الإعدادات.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {aboutUs && (
                    <div className="grid gap-6 md:grid-cols-3 mt-12">
                        <Card className="text-center p-6">
                            <div className="text-4xl font-bold text-amber-600 mb-2">10+</div>
                            <p className="text-muted-foreground">سنوات من الخبرة</p>
                        </Card>
                        <Card className="text-center p-6">
                            <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
                            <p className="text-muted-foreground">عميل راضٍ</p>
                        </Card>
                        <Card className="text-center p-6">
                            <div className="text-4xl font-bold text-amber-600 mb-2">100%</div>
                            <p className="text-muted-foreground">جودة مضمونة</p>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
