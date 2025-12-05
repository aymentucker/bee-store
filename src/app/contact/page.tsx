"use client";

import { useSettings } from "@/lib/settings-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    const { siteName, phone, whatsapp, email, address } = useSettings();

    const contactMethods = [
        {
            icon: Phone,
            title: "الهاتف",
            value: phone,
            href: `tel:${phone}`,
            show: !!phone,
        },
        {
            icon: MessageCircle,
            title: "واتساب",
            value: whatsapp,
            href: `https://wa.me/${whatsapp}`,
            show: !!whatsapp,
        },
        {
            icon: Mail,
            title: "البريد الإلكتروني",
            value: email,
            href: `mailto:${email}`,
            show: !!email,
        },
        {
            icon: MapPin,
            title: "العنوان",
            value: address,
            href: null,
            show: !!address,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>
                    <p className="text-lg text-muted-foreground">
                        نحن هنا للإجابة على استفساراتك ومساعدتك
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {contactMethods.filter(method => method.show).map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                            <Icon className="h-6 w-6 text-amber-600" />
                                        </div>
                                        {method.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {method.href ? (
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="w-full justify-start"
                                        >
                                            <a
                                                href={method.href}
                                                target={method.icon === MessageCircle ? "_blank" : undefined}
                                                rel={method.icon === MessageCircle ? "noopener noreferrer" : undefined}
                                                dir="ltr"
                                            >
                                                {method.value}
                                            </a>
                                        </Button>
                                    ) : (
                                        <p className="text-muted-foreground">{method.value}</p>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {!phone && !whatsapp && !email && !address && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>لم يتم تكوين معلومات الاتصال بعد.</p>
                        <p className="text-sm mt-2">يرجى إضافة معلومات الاتصال من لوحة التحكم.</p>
                    </div>
                )}

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>ساعات العمل</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">السبت - الخميس</span>
                                <span className="font-medium">9:00 صباحاً - 6:00 مساءً</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">الجمعة</span>
                                <span className="font-medium">مغلق</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
