"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function AboutUsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [aboutUs, setAboutUs] = useState("");

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const docRef = doc(db, "settings", "global");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setAboutUs(docSnap.data().aboutUs || "");
                }
            } catch (error) {
                console.error("Error fetching content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "settings", "global"), {
                aboutUs,
            }, { merge: true });
            alert("تم حفظ المحتوى بنجاح");
        } catch (error) {
            console.error("Error saving content:", error);
            alert("حدث خطأ أثناء الحفظ");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">من نحن</h2>
                <p className="text-muted-foreground">
                    إدارة محتوى صفحة "من نحن"
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>محتوى الصفحة</CardTitle>
                    <CardDescription>
                        اكتب نبذة عن متجرك وخدماتك. سيظهر هذا المحتوى في صفحة "من نحن" العامة.
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
                            className="min-h-[400px]"
                            rows={15}
                        />
                        <p className="text-sm text-muted-foreground">
                            استخدم فقرات منفصلة بسطر فارغ لتنسيق أفضل
                        </p>
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
