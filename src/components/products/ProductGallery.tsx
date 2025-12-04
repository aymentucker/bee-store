"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-[var(--muted)]">
                <Image
                    src={images[selectedImage]}
                    alt={`${productName} - صورة ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                    ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                                    : "border-[var(--border)] hover:border-[var(--primary)]/50"
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`${productName} - صورة مصغرة ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
