"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { collection, addDoc, updateDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, X, Plus } from "lucide-react";
import Image from "next/image";

interface ProductFormData {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    categorySlug: string;
    price: number;
    tags: string;
    specs: { key: string; value: string }[];
}

interface ProductFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export function ProductForm({ initialData, onSuccess, onCancel }: ProductFormProps) {
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [images, setImages] = useState<string[]>(initialData?.images || []);
    const [categories, setCategories] = useState<any[]>([]);

    // Convert specs object to array for form
    const specsArray = initialData?.specs
        ? Object.entries(initialData.specs).map(([key, value]) => ({ key, value: value as string }))
        : [{ key: "", value: "" }];

    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
        defaultValues: initialData ? {
            ...initialData,
            tags: initialData.tags.join(", "),
            specs: specsArray,
        } : {
            specs: [{ key: "", value: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "specs",
    });

    const categorySlug = watch("categorySlug");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "categories"));
                const categoriesData = querySnapshot.docs.map(doc => ({
                    docId: doc.id,
                    ...doc.data()
                }));
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        const files = Array.from(e.target.files);

        try {
            const formData = new FormData();
            files.forEach(file => formData.append("file", file));

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setImages(prev => [...prev, ...data.urls]);

        } catch (error) {
            console.error("Upload error:", error);
            alert("فشل رفع الصورة");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: ProductFormData) => {
        setSaving(true);
        try {
            // Convert specs array back to object
            const specsObject = data.specs.reduce((acc, spec) => {
                if (spec.key && spec.value) {
                    acc[spec.key] = spec.value;
                }
                return acc;
            }, {} as Record<string, string>);

            const productData = {
                ...data,
                price: Number(data.price),
                tags: data.tags.split(",").map(t => t.trim()).filter(Boolean),
                specs: specsObject,
                images,
                inStock: true,
                isNew: true,
            };

            if (initialData?.docId) {
                await updateDoc(doc(db, "products", initialData.docId), productData);
            } else {
                await addDoc(collection(db, "products"), {
                    ...productData,
                    id: Date.now(),
                });
            }
            onSuccess();
        } catch (error) {
            console.error("Save error:", error);
            alert("فشل حفظ المنتج");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>اسم المنتج</Label>
                    <Input {...register("name", { required: true })} />
                </div>
                <div className="space-y-2">
                    <Label>Slug (الرابط)</Label>
                    <Input {...register("slug", { required: true })} placeholder="product-name" />
                </div>
            </div>

            <div className="space-y-2">
                <Label>وصف قصير</Label>
                <Input {...register("shortDescription", { required: true })} />
            </div>

            <div className="space-y-2">
                <Label>وصف كامل</Label>
                <Textarea {...register("description")} rows={4} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>السعر (ريال)</Label>
                    <Input type="number" step="0.01" {...register("price", { required: true })} />
                </div>
                <div className="space-y-2">
                    <Label>الفئة</Label>
                    <Select
                        value={categorySlug}
                        onValueChange={(value) => setValue("categorySlug", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.docId} value={category.slug}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label>الصور</Label>
                <div className="flex flex-wrap gap-4 mb-2">
                    {images.map((url, idx) => (
                        <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                            <Image src={url} alt="Product" fill className="object-cover" />
                            <button
                                type="button"
                                onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="cursor-pointer"
                    />
                    {uploading && <Loader2 className="animate-spin" />}
                </div>
            </div>

            <div className="space-y-2">
                <Label>الوسوم (مفصولة بفاصلة)</Label>
                <Input {...register("tags")} placeholder="جديد, مميز, عرض خاص" />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label>المواصفات</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ key: "", value: "" })}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        إضافة مواصفة
                    </Button>
                </div>
                <div className="space-y-2">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start">
                            <div className="flex-1">
                                <Input
                                    {...register(`specs.${index}.key` as const)}
                                    placeholder="اسم المواصفة (مثال: الوزن)"
                                />
                            </div>
                            <div className="flex-1">
                                <Input
                                    {...register(`specs.${index}.value` as const)}
                                    placeholder="القيمة (مثال: 1 كجم)"
                                />
                            </div>
                            {fields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="text-red-500"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onCancel}>إلغاء</Button>
                <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    حفظ المنتج
                </Button>
            </div>
        </form>
    );
}
