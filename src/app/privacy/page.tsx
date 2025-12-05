"use client";

import { useSettings } from "@/lib/settings-context";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
    const { siteName, privacyPolicy } = useSettings();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">سياسة الخصوصية</h1>
                    <p className="text-lg text-muted-foreground">
                        {siteName || "متجرنا"}
                    </p>
                </div>

                <Card>
                    <CardContent className="p-8">
                        {privacyPolicy ? (
                            <div className="prose prose-lg max-w-none dark:prose-invert">
                                {privacyPolicy.split('\n\n').map((paragraph, index) => (
                                    paragraph.trim() && (
                                        <p key={index} className="mb-4 leading-relaxed text-foreground">
                                            {paragraph}
                                        </p>
                                    )
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <p className="text-lg mb-2">لم يتم إضافة سياسة الخصوصية بعد.</p>
                                <p className="text-sm">يرجى إضافة المحتوى من لوحة التحكم → الإعدادات.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
