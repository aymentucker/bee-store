"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { ProductCard } from "@/components/products/ProductCard"
import { Product } from "@/data/products"

export function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { getFeaturedProducts } = await import("@/lib/db-utils")
                const data = await getFeaturedProducts(8)
                setFeaturedProducts(data)
            } catch (error) {
                console.error("Failed to load featured products", error)
            }
        }
        loadProducts()
    }, [])

    if (featuredProducts.length === 0) return null;

    return (
        <section className="py-16 bg-[var(--muted)]/30">
            <div className="container mx-auto px-4">
                <SectionTitle subtitle="أفضل منتجاتنا لمعدات النحل" centered>
                    المنتجات المميزة
                </SectionTitle>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
