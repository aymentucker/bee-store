import { SectionTitle } from "@/components/ui/SectionTitle"
import { ProductCard } from "@/components/products/ProductCard"
import { getProductsByCategory } from "@/lib/db-utils"
import type { Product } from "@/data/products"

interface RelatedProductsProps {
    currentProduct: Product;
    limit?: number;
}

export async function RelatedProducts({ currentProduct, limit = 4 }: RelatedProductsProps) {
    const products = await getProductsByCategory(currentProduct.categorySlug)
    const relatedProducts = products
        .filter(product => product.id !== currentProduct.id)
        .slice(0, limit)

    if (relatedProducts.length === 0) {
        return null
    }

    return (
        <section className="mt-16">
            <SectionTitle>منتجات ذات صلة</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
