"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { categories } from "@/data/categories"
import { ArrowLeft } from "lucide-react"

// TEXT CONTENT: Section title can be edited below
export function FeaturedCategories() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <SectionTitle subtitle="استكشف مجموعتنا المتنوعة من المعدات" centered>
                    الفئات الرئيسية
                </SectionTitle>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Link href={`/products#${category.slug}`}>
                                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={category.imageUrl}
                                            alt={category.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                                        <p className="text-[var(--muted-foreground)] text-sm mb-4">
                                            {category.description}
                                        </p>
                                        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group-hover:text-[var(--primary)]">
                                            <span>استعرض المنتجات</span>
                                            <ArrowLeft className="mr-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
