"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import Image from "next/image";

interface CategoryFormData {
    name: string;
    slug: string;
    description: string;
}

interface CategoryFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export function CategoryForm({ initialData, onSuccess, onCancel }: CategoryFormProps) {
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl || "");

    const { register, handleSubmit } = useForm<CategoryFormData>({
        defaultValues: initialData || {},
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        const file = e.target.files[0];

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "categories"); // Specify categories folder

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setImageUrl(data.urls[0]);

        } catch (error) {
            console.error("Upload error:", error);
            alert("فشل رفع الصورة");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: CategoryFormData) => {
        setSaving(true);
        try {
            const categoryData = {
                ...data,
                imageUrl,
            };

            if (initialData?.docId) {
                await updateDoc(doc(db, "categories", initialData.docId), categoryData);
            } else {
                await addDoc(collection(db, "categories"), {
                    ...categoryData,
                    id: Date.now(),
                });
            }
            onSuccess();
        } catch (error) {
            console.error("Save error:", error);
            alert("فشل حفظ الفئة");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>اسم الفئة</Label>
                    <Input {...register("name", { required: true })} />
                </div>
                <div className="space-y-2">
                    <Label>Slug (الرابط)</Label>
                    <Input {...register("slug", { required: true })} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>الوصف</Label>
                <Textarea {...register("description")} />
            </div>

            <div className="space-y-2">
                <Label>صورة الفئة</Label>
                {imageUrl && (
                    <div className="relative w-full h-48 border rounded overflow-hidden mb-2">
                        <Image src={imageUrl} alt="Category" fill className="object-cover" />
                        <button
                            type="button"
                            onClick={() => setImageUrl("")}
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
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="cursor-pointer"
                    />
                    {uploading && <Loader2 className="animate-spin" />}
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onCancel}>إلغاء</Button>
                <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    حفظ
                </Button>
            </div>
        </form>
    );
}
