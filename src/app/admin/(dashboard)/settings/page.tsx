"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Scripts
    const [headerScripts, setHeaderScripts] = useState("");
    const [footerScripts, setFooterScripts] = useState("");

    // Site Info
    const [siteName, setSiteName] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [faviconUrl, setFaviconUrl] = useState("");
    const [currency, setCurrency] = useState("ر.س");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    // Theme Settings
    const [primaryColor, setPrimaryColor] = useState("#D97706");
    const [fontFamily, setFontFamily] = useState("Cairo");

    // About Us
    const [aboutUs, setAboutUs] = useState("");

    // SEO Settings
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [seoKeywords, setSeoKeywords] = useState("");

    // Policy Pages
    const [privacyPolicy, setPrivacyPolicy] = useState("");
    const [termsConditions, setTermsConditions] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "global");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setHeaderScripts(data.headerScripts || "");
                    setFooterScripts(data.footerScripts || "");
                    setSiteName(data.siteName || "");
                    setLogoUrl(data.logoUrl || "");
                    setFaviconUrl(data.faviconUrl || "");
                    setCurrency(data.currency || "ر.س");
                    setPhone(data.phone || "");
                    setWhatsapp(data.whatsapp || "");
                    setEmail(data.email || "");
                    setAddress(data.address || "");
                    setPrimaryColor(data.primaryColor || "#D97706");
                    setFontFamily(data.fontFamily || "Cairo");
                    setAboutUs(data.aboutUs || "");
                    setSeoTitle(data.seoTitle || "");
                    setSeoDescription(data.seoDescription || "");
                    setSeoKeywords(data.seoKeywords || "");
                    setPrivacyPolicy(data.privacyPolicy || "");
                    setTermsConditions(data.termsConditions || "");
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        const file = e.target.files[0];

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "settings"); // Specify settings folder

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setLogoUrl(data.urls[0]);

        } catch (error) {
            console.error("Upload error:", error);
            alert("فشل رفع الشعار");
        } finally {
            setUploading(false);
        }
    };

    const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        const file = e.target.files[0];

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "settings");

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setFaviconUrl(data.urls[0]);

        } catch (error) {
            console.error("Upload error:", error);
            alert("فشل رفع الأيقونة");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "settings", "global"), {
                headerScripts,
                footerScripts,
                siteName,
                logoUrl,
                faviconUrl,
                currency,
                phone,
                whatsapp,
                email,
                address,
                primaryColor,
                fontFamily,
                aboutUs,
                seoTitle,
                seoDescription,
                seoKeywords,
                privacyPolicy,
                termsConditions,
            }, { merge: true });
            alert("تم حفظ الإعدادات بنجاح");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("حدث خطأ أثناء الحفظ");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>معلومات الموقع</CardTitle>
                    <CardDescription>
                        البيانات الأساسية للموقع التي تظهر في الرأس والتذييل وصفحات التواصل.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="siteName">اسم الموقع</Label>
                        <Input
                            id="siteName"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            placeholder="مثال: كتالوج معدات النحل"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>شعار الموقع (Logo)</Label>
                        {logoUrl && (
                            <div className="relative w-32 h-32 border rounded overflow-hidden mb-2 bg-muted">
                                <Image src={logoUrl} alt="Logo" fill className="object-contain p-2" />
                                <button
                                    type="button"
                                    onClick={() => setLogoUrl("")}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                disabled={uploading}
                                className="cursor-pointer"
                            />
                            {uploading && <Loader2 className="animate-spin" />}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Favicon (أيقونة الموقع)</Label>
                        {faviconUrl && (
                            <div className="relative w-16 h-16 border rounded overflow-hidden mb-2 bg-muted">
                                <Image src={faviconUrl} alt="Favicon" fill className="object-contain p-2" />
                                <button
                                    type="button"
                                    onClick={() => setFaviconUrl("")}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFaviconUpload}
                                disabled={uploading}
                                className="cursor-pointer"
                            />
                            {uploading && <Loader2 className="animate-spin" />}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            يُفضل استخدام صورة مربعة 32x32 أو 64x64 بكسل
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="currency">العملة</Label>
                        <Input
                            id="currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            placeholder="ر.س"
                            className="max-w-xs"
                        />
                        <p className="text-xs text-muted-foreground">
                            العملة المستخدمة في عرض الأسعار (مثال: ر.س، $، €)
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+966..."
                                dir="ltr"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp">رقم الواتساب</Label>
                            <Input
                                id="whatsapp"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="966..."
                                dir="ltr"
                            />
                            <p className="text-xs text-muted-foreground">بدون علامة + أو مسافات</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="info@example.com"
                            dir="ltr"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">العنوان</Label>
                        <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="المدينة، الدولة"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>تخصيص المظهر</CardTitle>
                    <CardDescription>
                        اختر الألوان والخطوط المناسبة لعلامتك التجارية.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="primaryColor">اللون الأساسي</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="primaryColor"
                                    type="color"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="w-20 h-10 cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    placeholder="#D97706"
                                    dir="ltr"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fontFamily">الخط</Label>
                            <select
                                id="fontFamily"
                                value={fontFamily}
                                onChange={(e) => setFontFamily(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="Cairo">Cairo - القاهرة</option>
                                <option value="Tajawal">Tajawal - تجول</option>
                                <option value="Almarai">Almarai - المرعى</option>
                                <option value="Amiri">Amiri - أميري</option>
                                <option value="Noto Kufi Arabic">Noto Kufi Arabic</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">معاينة:</p>
                        <div
                            style={{
                                color: primaryColor,
                                fontFamily: fontFamily
                            }}
                            className="text-2xl font-bold"
                        >
                            {siteName || "كتالوج معدات النحل"}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>من نحن</CardTitle>
                    <CardDescription>
                        محتوى صفحة "من نحن" الذي سيظهر للزوار.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="aboutUs">المحتوى</Label>
                        <Textarea
                            id="aboutUs"
                            value={aboutUs}
                            onChange={(e) => setAboutUs(e.target.value)}
                            placeholder="اكتب نبذة عن متجرك وخدماتك..."
                            className="min-h-[200px]"
                            rows={10}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>إعدادات SEO</CardTitle>
                    <CardDescription>
                        تحسين ظهور موقعك في محركات البحث
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="seoTitle">عنوان الموقع (SEO Title)</Label>
                        <Input
                            id="seoTitle"
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            placeholder="كتالوج معدات النحل - كل ما تحتاجه لمناحلك"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="seoDescription">وصف الموقع (Meta Description)</Label>
                        <Textarea
                            id="seoDescription"
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            placeholder="كتالوج شامل لمعدات المناحل..."
                            rows={3}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="seoKeywords">الكلمات المفتاحية (Keywords)</Label>
                        <Input
                            id="seoKeywords"
                            value={seoKeywords}
                            onChange={(e) => setSeoKeywords(e.target.value)}
                            placeholder="معدات النحل, صناديق النحل, شمع الأساس"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>سياسة الخصوصية</CardTitle>
                    <CardDescription>
                        محتوى صفحة سياسة الخصوصية
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="privacyPolicy">المحتوى</Label>
                        <Textarea
                            id="privacyPolicy"
                            value={privacyPolicy}
                            onChange={(e) => setPrivacyPolicy(e.target.value)}
                            placeholder="اكتب سياسة الخصوصية الخاصة بموقعك..."
                            className="min-h-[200px] font-mono text-sm"
                            rows={10}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>الشروط والأحكام</CardTitle>
                    <CardDescription>
                        محتوى صفحة الشروط والأحكام
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="termsConditions">المحتوى</Label>
                        <Textarea
                            id="termsConditions"
                            value={termsConditions}
                            onChange={(e) => setTermsConditions(e.target.value)}
                            placeholder="اكتب الشروط والأحكام الخاصة بموقعك..."
                            className="min-h-[200px] font-mono text-sm"
                            rows={10}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>أكواد التتبع والتحليلات</CardTitle>
                    <CardDescription>
                        يمكنك إضافة أكواد HTML/JS هنا ليتم تضمينها في الموقع.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="headerScripts">أكواد الرأس (Header Scripts)</Label>
                        <Textarea
                            id="headerScripts"
                            placeholder="<script>...</script>"
                            className="font-mono text-sm min-h-[150px] text-left"
                            dir="ltr"
                            value={headerScripts}
                            onChange={(e) => setHeaderScripts(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="footerScripts">أكواد التذييل (Footer Scripts)</Label>
                        <Textarea
                            id="footerScripts"
                            placeholder="<script>...</script>"
                            className="font-mono text-sm min-h-[150px] text-left"
                            dir="ltr"
                            value={footerScripts}
                            onChange={(e) => setFooterScripts(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        حفظ التغييرات
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
