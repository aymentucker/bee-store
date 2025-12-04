"use client"

import { useState, useMemo } from "react"
import type { Metadata } from "next"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { ProductCard } from "@/components/products/ProductCard"
import { ProductFilters } from "@/components/products/ProductFilters"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"

// TEXT CONTENT: Edit page title and description
export default function ProductsPage() {
    const [filters, setFilters] = useState({
        category: "",
        inStock: null as boolean | null,
        search: ""
    })
    const [displayLimit, setDisplayLimit] = useState(12)

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Category filter
            if (filters.category && product.categorySlug !== filters.category) {
                return false
            }
            // Stock filter
            if (filters.inStock !== null && product.inStock !== filters.inStock) {
                return false
            }
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase()
                return (
                    product.name.toLowerCase().includes(searchLower) ||
                    product.description.toLowerCase().includes(searchLower) ||
                    product.tags.some(tag => tag.toLowerCase().includes(searchLower))
                )
            }
            return true
        })
    }, [filters])

    const displayedProducts = filteredProducts.slice(0, displayLimit)
    const hasMore = displayLimit < filteredProducts.length

    return (
        <div className="container mx-auto px-4 py-12">
            <SectionTitle subtitle="تصفح جميع منتجات معدات النحل">
                كل المنتجات
            </SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-20 bg-[var(--card)] p-6 rounded-lg border">
                        <h2 className="text-xl font-bold mb-6">تصفية النتائج</h2>
                        <ProductFilters onFilterChange={setFilters} />
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="lg:col-span-3">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-xl text-[var(--muted-foreground)]">
                                لا توجد منتجات تطابق معايير البحث
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 text-[var(--muted-foreground)]">
                                عرض {displayedProducts.length} من {filteredProducts.length} منتج
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {displayedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {hasMore && (
                                <div className="text-center mt-8">
                                    <Button
                                        onClick={() => setDisplayLimit(prev => prev + 12)}
                                        size="lg"
                                        variant="outline"
                                    >
                                        عرض المزيد
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
