"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { useSettings } from "@/lib/settings-context";
import type { Product } from "@/data/products";

interface ProductActionsProps {
    product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
    const { whatsapp, phone } = useSettings();

    const whatsappMessage = `مرحباً، أود الاستفسار عن المنتج: ${product.name}`;

    return (
        <div className="space-y-4 mb-8">
            {whatsapp && (
                <Button
                    asChild
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={!product.inStock}
                >
                    <a
                        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MessageCircle className="ml-2 h-5 w-5" />
                        <span>اطلب عبر الواتساب</span>
                    </a>
                </Button>
            )}

            {phone && (
                <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full"
                >
                    <a href={`tel:${phone}`}>
                        <Phone className="ml-2 h-5 w-5" />
                        <span>اتصل بنا</span>
                    </a>
                </Button>
            )}
        </div>
    );
}
