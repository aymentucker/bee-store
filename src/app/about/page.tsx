import type { Metadata } from "next"
import Image from "next/image"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Target, Heart } from "lucide-react"

// TEXT CONTENT: Edit page metadata and content below
export const metadata: Metadata = {
    title: "عن المتجر - كتالوج معدات النحل",
    description: "تعرف على كتالوج معدات النحل - وجهتك الموثوقة لجميع مستلزمات ومعدات تربية النحل وإنتاج العسل",
}

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <SectionTitle centered>عن المتجر</SectionTitle>

            {/* Introduction */}
            <div className="max-w-4xl mx-auto mb-16">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1576083073960-b1e61b086be8?w=800&h=600&fit=crop"
                            alt="معدات تربية النحل"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">من نحن</h2>
                        <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                            كتالوج معدات النحل هو وجهتك الموثوقة لجميع مستلزمات ومعدات تربية النحل
                            وإنتاج العسل. نحن نوفر مجموعة شاملة من المنتجات عالية الجودة التي تلبي
                            احتياجات مربي النحل من المبتدئين إلى المحترفين.
                        </p>
                        <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                            نؤمن بأهمية النحل في الطبيعة والزراعة، ونسعى لتقديم أفضل المعدات التي
                            تساعد المربين على العناية بمناحلهم بكفاءة وفعالية، مع الحفاظ على صحة
                            النحل وسلامته.
                        </p>
                    </div>
                </div>
            </div>

            {/* Vision & Values */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <Card className="text-center">
                    <CardContent className="p-8">
                        <div className="bg-[var(--primary)]/10 p-4 rounded-full inline-block mb-4">
                            <Target className="h-10 w-10 text-[var(--primary)]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">رؤيتنا</h3>
                        <p className="text-[var(--muted-foreground)] leading-relaxed">
                            أن نكون المصدر الأول والأكثر موثوقية لمعدات تربية النحل في المنطقة،
                            ونساهم في تطوير صناعة النحل والعسل.
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center">
                    <CardContent className="p-8">
                        <div className="bg-[var(--primary)]/10 p-4 rounded-full inline-block mb-4">
                            <Award className="h-10 w-10 text-[var(--primary)]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">قيمنا</h3>
                        <p className="text-[var(--muted-foreground)] leading-relaxed">
                            الجودة، الأمانة، الشفافية، والالتزام بتقديم أفضل الخدمات والمنتجات
                            لعملائنا الكرام.
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center">
                    <CardContent className="p-8">
                        <div className="bg-[var(--primary)]/10 p-4 rounded-full inline-block mb-4">
                            <Heart className="h-10 w-10 text-[var(--primary)]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">التزامنا</h3>
                        <p className="text-[var(--muted-foreground)] leading-relaxed">
                            نلتزم بتوفير معدات عالية الجودة، دعم فني متميز، وأسعار تنافسية لجميع
                            مربي النحل.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Images */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800&h=600&fit=crop"
                        alt="نحل وعسل"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1560963775-49d9c84632c4?w=800&h=600&fit=crop"
                        alt="مربي النحل"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    )
}
