"use client"

import { useState } from "react"
import type { Metadata } from "next"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react"

// TEXT CONTENT: Edit contact information and form labels below
export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        alert("شكراً لتواصلك معنا! هذا نموذج تجريبي ولا يرسل بيانات فعلية.")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <SectionTitle
                subtitle="نحن هنا للإجابة على جميع استفساراتك"
                centered
            >
                تواصل معنا
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-6">معلومات التواصل</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[var(--primary)]/10 p-3 rounded-full">
                                        <Phone className="h-5 w-5 text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">الهاتف</h4>
                                        <p className="text-[var(--muted-foreground)]" dir="ltr">
                                            +966 XX XXX XXXX
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[var(--primary)]/10 p-3 rounded-full">
                                        <MessageCircle className="h-5 w-5 text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">واتساب</h4>
                                        <p className="text-[var(--muted-foreground)]" dir="ltr">
                                            +966 XX XXX XXXX
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[var(--primary)]/10 p-3 rounded-full">
                                        <Mail className="h-5 w-5 text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">البريد الإلكتروني</h4>
                                        <p className="text-[var(--muted-foreground)]">
                                            info@bee-equipment.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[var(--primary)]/10 p-3 rounded-full">
                                        <MapPin className="h-5 w-5 text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">العنوان</h4>
                                        <p className="text-[var(--muted-foreground)]">
                                            الرياض، المملكة العربية السعودية
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[var(--secondary)]">
                        <CardContent className="p-6">
                            <h4 className="font-bold mb-2">ساعات العمل</h4>
                            <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
                                <div className="flex justify-between">
                                    <span>السبت - الخميس</span>
                                    <span>9:00 ص - 6:00 م</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>الجمعة</span>
                                    <span>مغلق</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-6">أرسل رسالة</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">الاسم *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="أدخل اسمك"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">البريد الإلكتروني *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+966 XX XXX XXXX"
                                />
                            </div>

                            <div>
                                <Label htmlFor="message">الرسالة *</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="اكتب رسالتك هنا..."
                                    rows={5}
                                />
                            </div>

                            <Button type="submit" className="w-full" size="lg">
                                إرسال الرسالة
                            </Button>

                            <p className="text-xs text-[var(--muted-foreground)] text-center">
                                * هذا النموذج تجريبي ولا يرسل بيانات فعلية
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
