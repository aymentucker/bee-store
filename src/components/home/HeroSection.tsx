"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Phone } from "lucide-react"
import Image from "next/image"

// TEXT CONTENT: Edit headings, buttons, and descriptions below
export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--secondary)] via-[var(--background)] to-[var(--muted)] py-20 md:py-32">
            {/* Honeycomb Pattern Background */}
            <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="honeycomb" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
                            <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" fill="none" stroke="currentColor" strokeWidth="2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#honeycomb)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-right"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            كل ما تحتاجه لمناحلك{" "}
                            <span className="text-[var(--primary)]">في مكان واحد</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-8 leading-relaxed">
                            كتالوج متكامل لمعدات المناحل، الصناديق، شمع الأساس، وملابس ومعدات النحل
                            بجودة عالية وتصميم منظم وسهل التصفح.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                                <Link href="/products">
                                    <span>استعرض المنتجات</span>
                                    <ArrowLeft className="mr-2 h-5 w-5 rotate-180" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-shadow">
                                <Link href="/contact">
                                    <Phone className="ml-2 h-5 w-5" />
                                    <span>تواصل معنا</span>
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1587049352846-4a222e784169?w=1200&h=800&fit=crop"
                            alt="معدات تربية النحل"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
