import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { WhyUs } from "@/components/home/WhyUs"
import { CTASection } from "@/components/home/CTASection"
import type { Metadata } from "next"

// TEXT CONTENT: Edit page title and description here
export const metadata: Metadata = {
  title: "الصفحة الرئيسية - كتالوج معدات النحل",
  description: "اكتشف مجموعتنا الكاملة من معدات تربية النحل، صناديق الخلايا، شمع الأساس، ملابس النحال وأدوات التعبئة بجودة عالية.",
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyUs />
      <CTASection />
    </>
  )
}

