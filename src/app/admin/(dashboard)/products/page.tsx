"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ProductForm } from "@/components/admin/ProductForm";
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
import { products as staticProducts } from "@/data/products";
import Image from "next/image";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [seedDialogOpen, setSeedDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<any>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map(doc => ({
                docId: doc.id,
                ...doc.data()
            }));
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteImagesFromS3 = async (images: string[]) => {
        try {
            for (const imageUrl of images) {
                await fetch("/api/delete-image", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: imageUrl }),
                });
            }
        } catch (error) {
            console.error("Error deleting images:", error);
        }
    };

    const handleDelete = async () => {
        if (!productToDelete) return;

        try {
            // Delete images from S3
            if (productToDelete.images?.length > 0) {
                await deleteImagesFromS3(productToDelete.images);
            }

            // Delete from Firestore
            await deleteDoc(doc(db, "products", productToDelete.docId));
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

    const handleSeedData = async () => {
        setLoading(true);
        try {
            const batch = writeBatch(db);
            staticProducts.forEach((product) => {
                const docRef = doc(collection(db, "products"));
                batch.set(docRef, product);
            });

            await batch.commit();
            fetchProducts();
        } catch (error) {
            console.error("Error seeding data:", error);
        } finally {
            setLoading(false);
            setSeedDialogOpen(false);
        }
    };

    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>{currentProduct ? "تعديل منتج" : "إضافة منتج جديد"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ProductForm
                            initialData={currentProduct}
                            onSuccess={() => {
                                setIsEditing(false);
                                setCurrentProduct(null);
                                fetchProducts();
                            }}
                            onCancel={() => {
                                setIsEditing(false);
                                setCurrentProduct(null);
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
                <h2 className="text-2xl font-bold tracking-tight">المنتجات</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSeedDialogOpen(true)} disabled={loading}>
                        <Database className="mr-2 h-4 w-4" />
                        استيراد البيانات الافتراضية
                    </Button>
                    <Button onClick={() => setIsEditing(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        إضافة منتج
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <Card key={product.docId} className="overflow-hidden">
                            <div className="relative h-48 w-full">
                                {product.images?.[0] && (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold truncate">{product.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{product.price} ر.س</p>
                                <div className="flex justify-end gap-2">
                                    <Button size="icon" variant="ghost" onClick={() => {
                                        setCurrentProduct(product);
                                        setIsEditing(true);
                                    }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-red-500"
                                        onClick={() => {
                                            setProductToDelete(product);
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

            {!loading && products.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    لا توجد منتجات حالياً.
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                        <AlertDialogDescription>
                            سيتم حذف المنتج "{productToDelete?.name}" نهائياً. لا يمكن التراجع عن هذا الإجراء.
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
                            سيتم إضافة {staticProducts.length} منتج إلى قاعدة البيانات. هل تريد المتابعة؟
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
