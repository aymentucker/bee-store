"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { categories } from "@/data/categories"

interface ProductFiltersProps {
    onFilterChange: (filters: { category: string; inStock: boolean | null; search: string }) => void;
}

// TEXT CONTENT: Edit filter labels below
export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedStock, setSelectedStock] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState("")

    const handleFilterChange = (category: string, stock: string, search: string) => {
        onFilterChange({
            category: category === "all" ? "" : category,
            inStock: stock === "all" ? null : stock === "inStock",
            search
        })
    }

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat)
        handleFilterChange(cat, selectedStock, searchQuery)
    }

    const handleStockChange = (stock: string) => {
        setSelectedStock(stock)
        handleFilterChange(selectedCategory, stock, searchQuery)
    }

    const handleSearchChange = (search: string) => {
        setSearchQuery(search)
        handleFilterChange(selectedCategory, selectedStock, search)
    }

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pr-10"
                />
            </div>

            {/* Category Filter */}
            <div>
                <h3 className="font-semibold mb-3">الفئات</h3>
                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant={selectedCategory === "all" ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleCategoryChange("all")}
                    >
                        الكل
                    </Badge>
                    {categories.map((category) => (
                        <Badge
                            key={category.id}
                            variant={selectedCategory === category.slug ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleCategoryChange(category.slug)}
                        >
                            {category.name}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Stock Filter */}
            <div>
                <h3 className="font-semibold mb-3">التوفر</h3>
                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant={selectedStock === "all" ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleStockChange("all")}
                    >
                        الكل
                    </Badge>
                    <Badge
                        variant={selectedStock === "inStock" ? "success" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleStockChange("inStock")}
                    >
                        متوفر
                    </Badge>
                    <Badge
                        variant={selectedStock === "outOfStock" ? "destructive" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleStockChange("outOfStock")}
                    >
                        غير متوفر
                    </Badge>
                </div>
            </div>
        </div>
    )
}
