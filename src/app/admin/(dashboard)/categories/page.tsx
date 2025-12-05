"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Database, Loader2 } from "lucide-react";
import { categories as staticCategories } from "@/data/categories";
import Image from "next/image";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<any>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [seedDialogOpen, setSeedDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<any>(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "categories"));
            const categoriesData = querySnapshot.docs.map(doc => ({
                docId: doc.id,
                ...doc.data()
            }));
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteImageFromS3 = async (imageUrl: string) => {
        try {
            await fetch("/api/delete-image", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: imageUrl }),
            });
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleDelete = async () => {
        if (!categoryToDelete) return;

        try {
            // Delete image from S3
            if (categoryToDelete.imageUrl) {
                await deleteImageFromS3(categoryToDelete.imageUrl);
            }

            // Delete from Firestore
            await deleteDoc(doc(db, "categories", categoryToDelete.docId));
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {
            setDeleteDialogOpen(false);
            setCategoryToDelete(null);
        }
    };

    const handleSeedData = async () => {
        setLoading(true);
        try {
            const batch = writeBatch(db);
            staticCategories.forEach((category) => {
                const docRef = doc(collection(db, "categories"));
                batch.set(docRef, category);
            });

            await batch.commit();
            fetchCategories();
        } catch (error) {
            console.error("Error seeding data:", error);
        } finally {
            setLoading(false);
            setSeedDialogOpen(false);
        }
    };

    if (isEditing) {
        return (
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>{currentCategory ? "تعديل فئة" : "إضافة فئة جديدة"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CategoryForm
                            initialData={currentCategory}
                            onSuccess={() => {
                                setIsEditing(false);
                                setCurrentCategory(null);
                                fetchCategories();
                            }}
                            onCancel={() => {
                                setIsEditing(false);
                                setCurrentCategory(null);
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">الفئات</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSeedDialogOpen(true)} disabled={loading}>
                        <Database className="mr-2 h-4 w-4" />
                        استيراد البيانات الافتراضية
                    </Button>
                    <Button onClick={() => setIsEditing(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        إضافة فئة
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Card key={category.docId} className="overflow-hidden">
                            <div className="relative h-40 w-full">
                                {category.imageUrl && (
                                    <Image
                                        src={category.imageUrl}
                                        alt={category.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold">{category.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{category.description}</p>
                                <div className="flex justify-end gap-2">
                                    <Button size="icon" variant="ghost" onClick={() => {
                                        setCurrentCategory(category);
                                        setIsEditing(true);
                                    }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-red-500"
                                        onClick={() => {
                                            setCategoryToDelete(category);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {!loading && categories.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    لا توجد فئات حالياً.
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                        <AlertDialogDescription>
                            سيتم حذف الفئة "{categoryToDelete?.name}" نهائياً. لا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                            حذف
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Seed Data Confirmation Dialog */}
            <AlertDialog open={seedDialogOpen} onOpenChange={setSeedDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>استيراد البيانات الافتراضية</AlertDialogTitle>
                        <AlertDialogDescription>
                            سيتم إضافة {staticCategories.length} فئة إلى قاعدة البيانات. هل تريد المتابعة؟
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSeedData}>
                            استيراد
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
