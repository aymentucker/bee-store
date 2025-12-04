import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/data/products"
import { ArrowLeft } from "lucide-react"

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="relative h-56 overflow-hidden bg-[var(--muted)]">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isNew && (
                    <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-500/80">
                        جديد
                    </Badge>
                )}
                <Badge
                    variant={product.inStock ? "success" : "destructive"}
                    className="absolute bottom-3 left-3"
                >
                    {product.inStock ? "متوفر" : "غير متوفر"}
                </Badge>
            </div>

            <CardContent className="p-5">
                <div className="text-sm text-[var(--muted-foreground)] mb-1">
                    {product.tags[0]}
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                </h3>
                <p className="text-[var(--muted-foreground)] text-sm mb-4 line-clamp-2">
                    {product.shortDescription}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <div>
                        <span className="text-2xl font-bold text-[var(--primary)]">
                            {product.price}
                        </span>
                        <span className="text-sm text-[var(--muted-foreground)] mr-1">
                            ريال
                        </span>
                    </div>
                    <Button asChild size="sm">
                        <Link href={`/products/${product.slug}`}>
                            <span>تفاصيل</span>
                            <ArrowLeft className="mr-2 h-4 w-4 rotate-180" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
