import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/products/ProductGallery"
import { ProductSpecs } from "@/components/products/ProductSpecs"
import { RelatedProducts } from "@/components/products/RelatedProducts"
import { products, getProductBySlug } from "@/data/products"
import { getCategoryBySlug } from "@/data/categories"
import { MessageCircle, Phone } from "lucide-react"

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const product = getProductBySlug(slug)

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
    const product = getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    const category = getCategoryBySlug(product.categorySlug)

    // WhatsApp configuration
    const whatsappNumber = "966XXXXXXXXX"
    const whatsappMessage = `مرحباً، أود الاستفسار عن المنتج: ${product.name}`

    return (
        <div className="container mx-auto px-4 py-12">
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

                    <div className="space-y-4 mb-8">
                        <Button
                            asChild
                            size="lg"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            disabled={!product.inStock}
                        >
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="ml-2 h-5 w-5" />
                                <span>اطلب عبر الواتساب</span>
                            </a>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="w-full"
                        >
                            <a href="tel:+966XXXXXXXXX">
                                <Phone className="ml-2 h-5 w-5" />
                                <span>اتصل بنا</span>
                            </a>
                        </Button>
                    </div>

                    <ProductSpecs specs={product.specs} />
                </div>
            </div>

            <RelatedProducts currentProduct={product} />
        </div>
    )
}
