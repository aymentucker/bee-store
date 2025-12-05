import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Badge } from "@/components/ui/badge"
import { ProductGallery } from "@/components/products/ProductGallery"
import { ProductSpecs } from "@/components/products/ProductSpecs"
import { RelatedProducts } from "@/components/products/RelatedProducts"
import { getProductBySlug, getCategoryBySlug } from "@/lib/db-utils"
import { ProductActions } from "@/components/products/ProductActions"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        return {
            title: "المنتج غير موجود",
        }
    }

    return {
        title: `${product.name} - كتالوج معدات النحل`,
        description: product.description,
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    const category = await getCategoryBySlug(product.categorySlug)

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.images[0],
        "description": product.description,
        "sku": product.slug,
        "brand": {
            "@type": "Brand",
            "name": "كتالوج معدات النحل"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://bee-web.vercel.app/products/${product.slug}`,
            "priceCurrency": "SAR",
            "price": product.price,
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": product.isNew ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition"
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Breadcrumbs
                items={[
                    { href: "/", label: "الرئيسية" },
                    { href: "/products", label: "المنتجات" },
                    { href: `/products/${product.slug}`, label: product.name },
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                {/* Gallery */}
                <ProductGallery images={product.images} productName={product.name} />

                {/* Product Info */}
                <div>
                    <div className="mb-4">
                        <span className="text-sm text-[var(--muted-foreground)]">
                            {category?.name}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {product.isNew && (
                            <Badge className="bg-green-500 hover:bg-green-500/80">جديد</Badge>
                        )}
                        <Badge variant={product.inStock ? "success" : "destructive"}>
                            {product.inStock ? "متوفر" : "غير متوفر"}
                        </Badge>
                        {product.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                    </div>

                    <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="mb-8">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-[var(--primary)]">
                                {product.price}
                            </span>
                            <span className="text-xl text-[var(--muted-foreground)]">ريال</span>
                        </div>
                    </div>

                    <ProductActions product={product} />

                    <ProductSpecs specs={product.specs} />
                </div>
            </div>

            <RelatedProducts currentProduct={product} />
        </div>
    )
}
