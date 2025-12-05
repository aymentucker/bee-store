import { collection, getDocs, query, where, limit, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/data/products";
import { Category } from "@/data/categories";

// Products
export async function getProducts(): Promise<Product[]> {
    try {
        const q = collection(db, "products");
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Product));
    } catch (error) {
        console.error("Error getting products:", error);
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
        const q = query(collection(db, "products"), where("slug", "==", slug), limit(1));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return undefined;
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as unknown as Product;
    } catch (error) {
        console.error("Error getting product by slug:", error);
        return undefined;
    }
}

export async function getFeaturedProducts(limitCount: number = 8): Promise<Product[]> {
    try {
        // Ideally filter by 'featured' tag or similar, but for now just limit
        const q = query(collection(db, "products"), limit(limitCount));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Product));
    } catch (error) {
        console.error("Error getting featured products:", error);
        return [];
    }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
    try {
        const q = query(collection(db, "products"), where("categorySlug", "==", categorySlug));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Product));
    } catch (error) {
        console.error("Error getting products by category:", error);
        return [];
    }
}

// Categories
export async function getCategories(): Promise<Category[]> {
    try {
        const q = collection(db, "categories");
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Category));
    } catch (error) {
        console.error("Error getting categories:", error);
        return [];
    }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
    try {
        const q = query(collection(db, "categories"), where("slug", "==", slug), limit(1));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return undefined;
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as unknown as Category;
    } catch (error) {
        console.error("Error getting category by slug:", error);
        return undefined;
    }
}
