"use client"

import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Card, CardContent } from "@/components/ui/card"
import { Award, HeadphonesIcon, Package, Truck } from "lucide-react"

// TEXT CONTENT: Edit feature titles and descriptions below
const features = [
    {
        icon: Award,
        title: "جودة عالية للمعدات",
        description: "جميع منتجاتنا مصنوعة من أفضل المواد وبمعايير جودة صارمة"
    },
    {
        icon: Package,
        title: "تنظيم واضح للمنتجات",
        description: "تصنيف دقيق ومفصل يسهل عليك إيجاد ما تحتاجه بسرعة"
    },
    {
        icon: HeadphonesIcon,
        title: "دعم فني واستشارات",
        description: "فريقنا جاهز لمساعدتك في اختيار المعدات المناسبة لمنحلك"
    },
    {
        icon: Truck,
        title: "شحن وتوصيل سريع",
        description: "خدمة توصيل موثوقة لجميع المناطق داخل المملكة"
    }
]

export function WhyUs() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <SectionTitle subtitle="لماذا تختار كتالوجنا" centered>
                    مميزات المتجر
                </SectionTitle>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                                    <CardContent className="p-6 flex flex-col items-center">
                                        <div className="bg-[var(--primary)]/10 p-4 rounded-full mb-4">
                                            <Icon className="h-8 w-8 text-[var(--primary)]" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
